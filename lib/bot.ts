// Bots standard library: durable host calls shared by every bots script.
//
// Evaluated into the shared global scope before each entry, so entries use
// `bot` directly with no imports. Each call parks the script (suspend) until
// the host answers; from the script side they are ordinary synchronous calls,
// never awaited (the engine cannot suspend from an async frame). Underneath
// the driver snapshots the parked frames, runs the `ctl` round trip, then
// resumes with the result. No hand-built packets here: args map 1:1 onto
// `BotCommand` (`travel` -> gotoTown, `cell` -> moveToCell, `kill` ->
// combat mission via `kill_mission`, `quest(id).accept()` ->
// `Game.world.acceptQuest`, `quest(id).turnIn()` ->
// `Game.world.tryQuestComplete`, `quest(id).completed()` -> bare boolean
// re-run guard, `hunt(name, map, qty?)` -> teleport +
// census + `moveToCell` + kill, `locate(name)` -> read-only census of the
// live room (no bridge traffic), `gather(id, map, qty?)` -> teleport (no
// cell move; the `getMapItem` packet carries no cell) + `getMapItem` polled
// against temp inventory, `inventory(idOrName)` -> detail object,
// `ensureItem(idOrName, qty?)` -> bare boolean, unbanking first,
// `buyItem(shopId, idOrName, qty?)` -> bare boolean, loading the shop first,
// `sellItem(idOrName, qty?)` -> bare boolean, clamped to held,
// `me()` -> player snapshot object,
// `rep(idOrName)` -> faction detail object,
// `questValue(slot)` -> bare slot number,
// `setQuestValue(slot, value)` -> bare boolean on the server echo,
// `drops()` -> pending drop array,
// `pickup(idOrName | "*")` -> bare boolean, `"*"` clears the floor).
declare function park(v: unknown): unknown;

type QuestHandlers = Record<string, () => unknown>;
type QuestOpts = { choice?: number; qty?: number; turnIn?: boolean };
type QuestReq = { id: number; name: string; need: number; have: number };
type QuestStatus = {
  completed: boolean;
  requirements: QuestReq[];
};

const bot = {
  // Already in `map` reads as done with no rejoin; a non-default `cell`
  // goes through the verified cell move instead of the join's blind args.
  travel(map: string, cell?: string, pad?: string): unknown {
    return park({ op: "travel", map, cell: cell ?? "Enter", pad: pad ?? "Spawn" });
  },
  cell(frame: string, pad?: string): unknown {
    return park({ op: "cell", frame, pad: pad ?? "Spawn" });
  },
  kill(name: string, count?: number): unknown {
    return park({ op: "kill", name, count: count ?? 1 });
  },
  // `quest(id)` / `quest(id, handlers, opts?)`.
  // Bare `quest(id)` only captures the id for the parking calls below, so
  // `const q = bot.quest(id); q.accept();` works. `choice` defaults to -1
  // (no reward choice, the SWF default — `QFrameMC.as:28`); `qty` defaults
  // to 1 and caps at 250. `completed()` is the re-run guard: read-only, no
  // packets beyond the definition fetch — resumes bare `true` when the
  // one-time quest already completed, `false` otherwise (including
  // unknown), so blocks read `if (!bot.quest(id).completed()) { ... }`.
  // With `handlers`, the quest runs itself: accept, then the first unmet
  // requirement's handler until every requirement reads held, then turn
  // in. Handler keys are turn-in `sName`s (case-insensitive) with the
  // requirement ItemID as fallback (`'63014'` wins on collision). A
  // handler that leaves its requirement unmoved fails loudly instead of
  // spinning; an unhandled requirement names what is missing. `opts`
  // carries `{ choice, qty }` through to the turn-in, and
  // `{ turnIn: false }` fills without turning in. Completed quests return
  // `true` without touching anything.
  quest(id: number, handlers?: QuestHandlers, opts?: QuestOpts): unknown {
    if (handlers == null) {
      return {
        accept(): unknown {
          return park({ op: "quest_accept", id });
        },
        turnIn(choice?: number, qty?: number): unknown {
          return park({ op: "quest_turnin", id, choice: choice ?? -1, qty: qty ?? 1 });
        },
        completed(): unknown {
          return park({ op: "quest_completed", id });
        },
      };
    }
    if (park({ op: "quest_completed", id }) === true) return true;
    park({ op: "quest_accept", id });
    const turnIn = opts && opts.turnIn === false ? false : true;
    const choice = opts && opts.choice !== undefined ? opts.choice : -1;
    const qty = opts && opts.qty !== undefined ? opts.qty : 1;
    for (let round = 0; round < 50; round++) {
      const st = park({ op: "quest_status", id }) as QuestStatus;
      if (st.completed === true) return true;
      const reqs = st.requirements || [];
      let next: QuestReq | undefined = undefined;
      for (const r of reqs) {
        if ((r.have === undefined ? -1 : r.have) < r.need) {
          next = r;
          break;
        }
      }
      if (next === undefined) break;
      const keys = Object.keys(handlers);
      const idKey = String(next.id);
      let key: string | undefined = undefined;
      for (const k of keys) {
        if (k.trim() === idKey) {
          key = k;
          break;
        }
      }
      if (key === undefined) {
        const want = (next.name || "").trim().toLowerCase();
        for (const k of keys) {
          if (k.trim().toLowerCase() === want) {
            key = k;
            break;
          }
        }
      }
      if (key === undefined) {
        throw new Error(
          "quest " + id + " has no handler for requirement '" +
          next.name + "' (" + next.id + " " + next.have + "/" + next.need + ")"
        );
      }
      const before = next.have === undefined ? -1 : next.have;
      handlers[key]();
      const after = park({ op: "quest_status", id }) as QuestStatus;
      const cur = (after.requirements || []).filter(function (r) { return r.id === next.id; })[0];
      if (cur !== undefined && cur.have <= before && cur.have < cur.need) {
        throw new Error(
          "quest " + id + " requirement '" + next.name +
          "' stalled: " + cur.have + "/" + cur.need
        );
      }
    }
    if (turnIn) return park({ op: "quest_turnin", id, choice, qty });
    return true;
  },
  // `hunt(name, map, qty?, cell?, pad?)`: teleport to `map` when elsewhere,
  // census the live room for the cell holding the most `name` matches, go
  // there, then kill. `map` is required; `qty` defaults to 1. `"*"` hunts
  // anything in the richest cell; with a quest in progress the count is a
  // floor — the hunt tops up until the requirements read held. A `cell`
  // pins the farm spot and skips the census (Skua's KillMonster shape).
  hunt(name: string, map: string, qty?: number, cell?: string, pad?: string): unknown {
    return park({ op: "hunt", name, map, qty: qty ?? 1, cell, pad });
  },
  // `locate(name)`: read-only census of the live room — the cell holding
  // the most `name` matches (same substring rule as `kill`/`hunt`). No
  // travel, no packets, no bridge traffic. Resumes
  // `{"found":true,"map","name","cell","count"}` (a miss resumes
  // `found:false` with the cells seen, so `if` branches work). Travel
  // first, then locate, then `cell()` + `kill()` — the manual half of what
  // `hunt` does composed.
  locate(name: string): unknown {
    return park({ op: "locate", name });
  },
  // `gather(id, map, qty?)`: teleport to `map` when elsewhere (no cell
  // move — the server accepts `getMapItem` map-wide), then `getMapItem [id]`
  // until temp inventory holds `qty`. `map` is required; `qty` defaults
  // to 1.
  gather(id: number, map: string, qty?: number): unknown {
    return park({ op: "gather", id, map, qty: qty ?? 1 });
  },
  // `inventory(idOrName)`: read-only query — where the item is and how many.
  // Resumes `{"found":true,"id","name","qty"}` (or `found:false`). Name
  // lookup is exact and case-sensitive, like the SWF's `getItemIDByName`.
  inventory(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? park({ op: "inventory", id: idOrName })
      : park({ op: "inventory", name: idOrName });
  },
  // `ensureItem(idOrName, qty?)`: turn-in precondition — `qty` of the item
  // in the backpack, withdrawing from the bank first when banked (turn-ins
  // read the backpack, never the bank). Resumes bare `true`/`false`, so it
  // fits `while` loops directly; use `inventory` for detail. `qty`
  // defaults to 1.
  ensureItem(idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? park({ op: "ensure_item", id: idOrName, qty: want })
      : park({ op: "ensure_item", name: idOrName, qty: want });
  },
  // `buyItem(shopId, idOrName, qty?)`: buy `qty` more of the item from the
  // shop — same call for merge shops (their records just carry `turnin`).
  // Loads the shop first unless already on it. Resumes bare `true`/`false`:
  // not stocked, a zero gate (locked, broke, capped, short on merge
  // materials), and a grant that never lands all read `false`. `qty`
  // defaults to 1 and must fit in one purchase.
  buyItem(shopId: number, idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? park({ op: "buy_item", shop_id: shopId, id: idOrName, qty: want })
      : park({ op: "buy_item", shop_id: shopId, name: idOrName, qty: want });
  },
  // `sellItem(idOrName, qty?)`: sell up to `qty` of the item (clamps to what
  // is held — selling the whole stack reads `true`). No shop needed; the
  // record's `CharItemID` rides along. Resumes bare `true`/`false`; `qty`
  // defaults to 1.
  sellItem(idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? park({ op: "sell_item", id: idOrName, qty: want })
      : park({ op: "sell_item", name: idOrName, qty: want });
  },
  // `me()`: read-only player snapshot — identity, wallet, vitals, location,
  // capacity. No travel, no polling, no packets. Resumes the detail object;
  // raw counts only, scripts subtract.
  me(): unknown {
    return park({ op: "me" });
  },
  // `rep(idOrName)`: read-only faction query — the record for a `FactionID`
  // or an exact `sName` (the SWF's own either/or lookup). Resumes
  // `{"found":true,"id","name","rep","rank","repToRank"}` (or `found:false`
  // with zeroed fields). A miss reads `rank: 0`, so check `found` once when
  // writing a rank loop — `while (bot.rep("Good").rank < 10)` spins forever
  // on a typo'd name.
  rep(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? park({ op: "rep", id: idOrName })
      : park({ op: "rep", name: idOrName });
  },
  // `questValue(slot)`: read-only quest progression slot — `slot` is
  // uncapped (`strQuests`, `strQuests2`, …). Resumes the bare number (`-1`
  // when unset, the SWF's own miss signal).
  questValue(slot: number): unknown {
    return park({ op: "quest_value", slot });
  },
  // `setQuestValue(slot, value)`: write a progression slot (map/cutscene
  // `qs` locks and quest/shop gates read these same local strings, so a
  // landed write unlocks immediately). `value` must be 0–35 — one base-36
  // digit per slot, anything more corrupts to `"0"`. Resumes bare
  // `true`/`false`: `false` when the server echo never lands.
  setQuestValue(slot: number, value: number): unknown {
    return park({ op: "set_quest_value", slot, value });
  },
  // `drops()`: read-only pending drop list — `[{id, name, qty}]`, empty when
  // nothing is pending. The loader builds the session-only list itself on
  // the first entered frame (the toggle replicated without persisting it —
  // the drops panel appears this session, your saved option is untouched).
  // Errors when the list is unavailable.
  drops(): unknown {
    return park({ op: "drops" });
  },
  // `pickup(idOrName)` / `pickup("*")`: claim one pending drop by id or by
  // exact pending-list name, or clear the whole floor. Id claims work in
  // every UI mode; names and `"*"` read the ensured list. One `getDrop` per
  // item plus a grant poll each. Resumes bare `true`/`false`: a miss, a
  // rejected claim, and a stalled pass all read `false` (claimed items stay
  // claimed — call again for the remainder); an empty floor reads `true`.
  pickup(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? park({ op: "pickup", id: idOrName })
      : park({ op: "pickup", name: idOrName });
  },
};
