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
// re-run guard, `quest(id).info()/active()/ready()/done()/wants()` -> the
// step reads (one `questinfo` each), `quest.register(ids, opts?)` -> the tick
// sweeps them (accept, hand in when the client offers: one `quest_sweep`),
// `hunt(name, map, qty?)` -> teleport +
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
// `notify(message)` -> bare boolean once queued (explicit notification).
// `wantDrops(ids)` / `unwantDrops(ids?)` / `wantedDrops()` -> the wanted
// drop-ID list (Skua's `AddDrop` whitelist, auto-claimed after every kill;
// quest requirements never need it).
declare function park(v: unknown): unknown;

type QuestHandlers = Record<string, () => unknown>;
type QuestOpts = {
  choice?: number;
  qty?: number;
  turnIn?: boolean;
  // Quiet rounds a handler may run without moving anything before the run
  // aborts. Default 5; raise it for a quest whose fill is genuinely slow
  // (bad drop RNG, a map item with a long cooldown).
  quiet?: number;
};
type QuestReq = { id: number; name: string; need: number; have: number };
type QuestInfo = {
  slot?: number;
  value?: number;
  active?: boolean;
  ready?: boolean;
  done?: boolean;
  once?: boolean;
  rewards?: number;
  turnin?: QuestReq[];
};

type QuestStatus = {
  completed: boolean;
  requirements: QuestReq[];
};

// Registered quests (`bot.quest.register`): Skua's `RegisterQuests` idea, in
// the shape this engine can afford. A registration makes the *tick* the one
// that turns quests in and takes them again, so a farm or a hunt chain does not
// have to know when a bag filled — it only has to keep doing its job.
//
// One pass (`quest_sweep`) reads the whole registered set in one projection
// round trip and sends at most one accept or turn-in per quest that needs it.
// It never waits and never throws: the next pass reads whether the send took,
// so a refused turn-in costs a pass instead of the run.
let questRegistry: number[] = [];
let registeredAt = 0;
let registeredEvery = 2000;
let registeredChoice = -1;
let registeredQty = 1;

// Wanted drop IDs (Skua's `AddDrop` idea, per-op rather than session-global):
// plain monster drops that are not quest requirements still auto-claim off
// the floor when a kill mission ends. The set rides every `kill`/`hunt`
// park as `want`, and the quest composite feeds each requirement id in, so
// a `bot.kill` inside a handler benefits too. Session-scoped like the
// registry: entries persist until removed.
let dropWant: number[] = [];

function registerList(ids: number | number[]): number[] {
  const list: number[] = typeof ids === "number" ? [ids] : ids || [];
  for (const id of list) {
    if (id > 0 && questRegistry.indexOf(id) < 0) questRegistry.push(id);
  }
  return list;
}

/// `bot.quest.register(ids, opts?)`: sweep these quests from now on.
/// `choice` is the reward to take (default -1 = none), `qty` is the turn-in
/// quantity (default 1, clamped by the client), and `interval` is the minimum
/// spacing between sweeps in ms (default 2000; 0 sweeps before every call).
function registerQuests(ids: number | number[], opts?: QuestRegisterOpts): number[] {
  registerList(ids);
  if (opts) {
    if (opts.choice !== undefined) registeredChoice = opts.choice;
    if (opts.qty !== undefined) registeredQty = opts.qty;
    if (opts.interval !== undefined && opts.interval >= 0) {
      registeredEvery = Math.floor(opts.interval);
    }
  }
  return questRegistry.slice();
}

/// `bot.quest.unregister(ids?)`: stop sweeping these (all when omitted).
function unregisterQuests(ids?: number | number[]): number[] {
  if (ids === undefined) {
    questRegistry = [];
    return [];
  }
  const list: number[] = typeof ids === "number" ? [ids] : ids || [];
  for (const id of list) {
    const at = questRegistry.indexOf(id);
    if (at >= 0) questRegistry.splice(at, 1);
  }
  return questRegistry.slice();
}

/// `bot.quest.registered()`: what is being swept.
function registeredList(): number[] {
  return questRegistry.slice();
}

/// `bot.quest.sweep()`: one pass now, resuming what it did per quest
/// (`{id, did}` with `did` one of `accept`/`turnin`/`filling`/`refused`/
/// `choice`/`wait`/`done`/`error`). Registered quests are swept for you, so a
/// script only calls this to sweep sooner than the interval.
function sweepQuests(): unknown {
  if (questRegistry.length === 0) return [];
  registeredAt = Date.now();
  return park({
    op: "quest_sweep",
    ids: questRegistry,
    choice: registeredChoice,
    qty: registeredQty,
  });
}

/// `bot.wantDrops(ids)`: auto-claim these drop IDs off the floor after
/// every kill mission — Skua's `AddDrop` whitelist, per-op instead of
/// session-global. Quest requirements never need this (the quest path
/// already sweeps its own turn-ins); it is for plain monster drops farmed
/// with no live quest, like crafting reagents. Entries persist until
/// `unwantDrops`, so declare once at the top. Resumes the wanted list.
function wantDrops(ids: number | number[]): number[] {
  const list: number[] = typeof ids === "number" ? [ids] : ids || [];
  for (const id of list) {
    if (id > 0 && dropWant.indexOf(id) < 0) dropWant.push(id);
  }
  return dropWant.slice();
}

/// `bot.unwantDrops(ids?)`: stop auto-claiming these (all when omitted).
/// Resumes the wanted list.
function unwantDrops(ids?: number | number[]): number[] {
  if (ids === undefined) {
    dropWant = [];
    return [];
  }
  const list: number[] = typeof ids === "number" ? [ids] : ids || [];
  for (const id of list) {
    const at = dropWant.indexOf(id);
    if (at >= 0) dropWant.splice(at, 1);
  }
  return dropWant.slice();
}

/// `bot.wantedDrops()`: what is being auto-claimed.
function wantedDropsList(): number[] {
  return dropWant.slice();
}

/// The tick hook: a registered set is swept before the next parked call, no
/// more often than its interval. Sweeping from here (rather than from a timer)
/// is what makes registration work at all: the script is only running while a
/// call is parked, and a sweep needs a parked frame to answer it.
function step(v: unknown): unknown {
  if (questRegistry.length > 0 && Date.now() - registeredAt >= registeredEvery) {
    sweepQuests();
  }
  return park(v);
}

function questStep(id: number, handlers?: QuestHandlers, opts?: QuestOpts): unknown {
    if (handlers == null) {
      return {
        accept(): unknown {
          return step({ op: "quest_accept", id });
        },
        turnIn(choice?: number, qty?: number): unknown {
          return step({ op: "quest_turnin", id, choice: choice ?? -1, qty: qty ?? 1 });
        },
        completed(): unknown {
          return step({ op: "quest_completed", id });
        },
        // The step read behind the guards below: the movie's whole record
        // for one quest. `active` = in the tracker, `ready` = the client's
        // own `canTurnInQuest`, `done` = the chain slot reached its value,
        // and `turnin` carries each requirement's `{id,name,need,have}`.
        info(): QuestInfo {
          return step({ op: "quest_info", id }) as QuestInfo;
        },
        // Step guards, so a block can be idempotent across ticks instead of
        // blocking inside one call:
        //   `if (!bot.quest(id).active()) { bot.quest(id).accept(); return; }`
        active(): boolean {
          return step({ op: "quest_info", id })["active"] === true;
        },
        ready(): boolean {
          return step({ op: "quest_info", id })["ready"] === true;
        },
        done(): boolean {
          return step({ op: "quest_info", id })["done"] === true;
        },
        // Requirements still short, as `{id,name,need,have}` — empty when
        // the gate can take the quest.
        wants(): QuestReq[] {
          const info = step({ op: "quest_info", id }) as QuestInfo;
          const reqs = info.turnin || [];
          return reqs.filter(function (r) {
            return (r.have === undefined ? -1 : r.have) < r.need;
          });
        },
      };
    }
    if (step({ op: "quest_completed", id }) === true) return true;
    step({ op: "quest_accept", id });
    const turnIn = opts && opts.turnIn === false ? false : true;
    const choice = opts && opts.choice !== undefined ? opts.choice : -1;
    const qty = opts && opts.qty !== undefined ? opts.qty : 1;
    // Quiet rounds: handler runs that move nothing at all. One quiet round
    // is normal (drop RNG, or a "*" hunt feeding a sibling requirement
    // while its own top-up scope covers only what its kills granted), so
    // the run only fails after several in a row — still fast for a truly
    // stuck quest, patient for real farming. `opts.quiet` moves that limit
    // (default 5); it is clamped to at least one so a pass cannot loop
    // forever on a handler that never moves.
    const quietLimit =
      opts && opts.quiet !== undefined && opts.quiet >= 1
        ? Math.floor(opts.quiet)
        : 5;
    let quiet = 0;
    for (let round = 0; round < 9999; round++) {
      const st = step({ op: "quest_status", id }) as QuestStatus;
      if (st.completed === true) return true;
      const reqs = st.requirements || [];
      // Feed every requirement id into the wanted set: a `bot.kill` inside
      // a handler then auto-claims it too, not just `bot.hunt`.
      for (const r of reqs) {
        if (r.id > 0 && dropWant.indexOf(r.id) < 0) dropWant.push(r.id);
      }
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
      const held: Record<number, number> = {};
      for (const r of reqs) held[r.id] = r.have === undefined ? -1 : r.have;
      handlers[key]();
      const after = step({ op: "quest_status", id }) as QuestStatus;
      // Any forward movement counts: one hunt can feed several
      // requirements while the targeted one waits its turn.
      let moved = false;
      for (const r of after.requirements || []) {
        const have = r.have === undefined ? -1 : r.have;
        if (have > (held[r.id] === undefined ? -1 : held[r.id])) {
          moved = true;
          break;
        }
      }
      const cur = (after.requirements || []).filter(function (r) { return r.id === next.id; })[0];
      if (!moved && (cur === undefined || cur.have < cur.need)) {
        quiet += 1;
        if (quiet >= quietLimit) {
          throw new Error(
            "quest " + id + " requirement '" + next.name +
            "' (" + next.id + ") stalled: " +
            (cur === undefined ? "?" : cur.have) + "/" + next.need +
            " (no progress in " + quietLimit + " rounds)"
          );
        }
      } else {
        quiet = 0;
      }
    }
    // Re-read before turning in: creeping progress can exhaust the rounds
    // with requirements still open, and an unreadable definition reads as
    // no requirements at all. Both must fail naming the shortfall, never
    // fire a turn-in the native gate will refuse.
    const final = step({ op: "quest_status", id }) as QuestStatus;
    if (final.completed === true) return true;
    const reqs = final.requirements || [];
    if (reqs.length === 0 && final.accepted !== true) {
      throw new Error(
        "quest " + id + " has no readable requirements and is not accepted"
      );
    }
    const unmet = reqs.filter(function (r) {
      return (r.have === undefined ? -1 : r.have) < r.need;
    });
    if (unmet.length > 0) {
      throw new Error(
        "quest " + id + " requirements unmet after filling: " +
        unmet.map(function (r) { return r.name + " " + r.have + "/" + r.need; }).join(", ")
      );
    }
  if (turnIn) return step({ op: "quest_turnin", id, choice, qty });
  return true;
}

// `bot.quest` is callable (the composite or a bare handle) and carries the
// registry helpers, so both `bot.quest(8300)` and `bot.quest.register(8300)`
// work off the same object.
const questCallable = Object.assign(questStep, {
  register: registerQuests,
  unregister: unregisterQuests,
  registered: registeredList,
  sweep: sweepQuests,
});

const bot = {
  // Already in `map` reads as done with no rejoin; a non-default `cell`
  // goes through the verified cell move instead of the join's blind args.
  travel(map: string, cell?: string, pad?: string): unknown {
    return step({ op: "travel", map, cell: cell ?? "Enter", pad: pad ?? "Spawn" });
  },
  cell(frame: string, pad?: string): unknown {
    return step({ op: "cell", frame, pad: pad ?? "Spawn" });
  },
  // `kill(name, count?, blockers?)`: one mission to `Done`, counting `name`
  // deaths only. `blockers` (a name or names, highest first) preempt
  // engagement while alive without counting — the staff before the boss.
  // Wanted drop IDs (`bot.wantDrops`, plus quest requirements while a
  // composite runs) auto-claim off the floor when the mission ends.
  kill(name: string, count?: number, blockers?: string | string[]): unknown {
    return step({ op: "kill", name, count: count ?? 1, blockers: blockers ?? [], want: dropWant.slice() });
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
  // carries `{ choice, qty }` through to the turn-in,
  // `{ turnIn: false }` fills without turning in, and `{ quiet: n }` moves the
  // stall limit (handler rounds that move nothing, default 5). Completed quests
  // return `true` without touching anything.
  //
  // The same handle also exposes the step reads, for blocks that would rather
  // keep control across ticks than block inside one call:
  // `q.info()` (the whole projection record), `q.active()`, `q.ready()`
  // (the client's own `canTurnInQuest`), `q.done()`, and `q.wants()`
  // (requirements still short). Each is one `questinfo` round trip, so a
  // guard costs a frame, not a tree walk:
  //   const q = bot.quest(8247);
  //   if (!q.active()) { q.accept(); return; }
  //   if (q.wants().length > 0) { /* hunt the first one */ return; }
  //   if (q.ready()) q.turnIn();
  quest: questCallable as any,
  // `hunt(name, map, qty?, cell?, pad?, blockers?)`: teleport to `map` when elsewhere,
  // census the live room for the cell holding the most `name` matches, go
  // there, then kill. `map` is required; `qty` defaults to 1. `"*"` hunts
  // anything in the richest cell. With a quest in progress the hunt fills
  // its own requirements instead of counting monsters: the scope (the
  // composite's current requirement plus name/granted matches) is checked
  // before the first kill — zero kills when already held — then one kill
  // per round with a sweep each until the scope reads held (`qty` is
  // unused on this path). Without a watched quest the count is the
  // contract. A `cell` pins the farm spot and skips the census (Skua's
  // KillMonster shape). `blockers` (a name or names, highest first) are
  // priority engagement overrides: while one is alive in-cell the mission
  // fights it instead of `name`, without counting its deaths — the staff
  // before the boss. Order is priority; empty reads as none.
  hunt(name: string, map: string, qty?: number, cell?: string, pad?: string, blockers?: string | string[]): unknown {
    return step({ op: "hunt", name, map, qty: qty ?? 1, cell, pad, blockers: blockers ?? [], want: dropWant.slice() });
  },
  // `locate(name)`: read-only census of the live room — the cell holding
  // the most `name` matches (same substring rule as `kill`/`hunt`). No
  // travel, no packets, no bridge traffic. Resumes
  // `{"found":true,"map","name","cell","count"}` (a miss resumes
  // `found:false` with the cells seen, so `if` branches work). Travel
  // first, then locate, then `cell()` + `kill()` — the manual half of what
  // `hunt` does composed.
  locate(name: string): unknown {
    return step({ op: "locate", name });
  },
  // `gather(id, map, qty?)`: teleport to `map` when elsewhere (no cell
  // move — the server accepts `getMapItem` map-wide), then `getMapItem [id]`
  // until temp inventory holds `qty`. `map` is required; `qty` defaults
  // to 1.
  gather(id: number, map: string, qty?: number): unknown {
    return step({ op: "gather", id, map, qty: qty ?? 1 });
  },
  // `inventory(idOrName)`: read-only query — where the item is and how many.
  // Resumes `{"found":true,"id","name","qty"}` (or `found:false`). Name
  // lookup is exact and case-sensitive, like the SWF's `getItemIDByName`.
  inventory(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? step({ op: "inventory", id: idOrName })
      : step({ op: "inventory", name: idOrName });
  },
  // `ensureItem(idOrName, qty?)`: turn-in precondition — `qty` of the item
  // in the backpack, withdrawing from the bank first when banked (turn-ins
  // read the backpack, never the bank). Resumes bare `true`/`false`, so it
  // fits `while` loops directly; use `inventory` for detail. `qty`
  // defaults to 1.
  ensureItem(idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? step({ op: "ensure_item", id: idOrName, qty: want })
      : step({ op: "ensure_item", name: idOrName, qty: want });
  },
  // `buyItem(shopId, idOrName, qty?)`: buy `qty` more of the item from the
  // shop — same call for merge shops (their records just carry `turnin`).
  // Travel to the shop's map first: the server kicks the session when a
  // shop is loaded cross-map, so a buy without a preceding travel to that
  // map reads as a disconnect, not a refusal. Loads the shop first unless
  // already on it. Resumes bare `true`/`false`:
  // not stocked, a zero gate (locked, broke, capped, short on merge
  // materials), and a grant that never lands all read `false`. `qty`
  // defaults to 1 and must fit in one purchase.
  buyItem(shopId: number, idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? step({ op: "buy_item", shop_id: shopId, id: idOrName, qty: want })
      : step({ op: "buy_item", shop_id: shopId, name: idOrName, qty: want });
  },
  // `sellItem(idOrName, qty?)`: sell up to `qty` of the item (clamps to what
  // is held — selling the whole stack reads `true`). No shop needed; the
  // record's `CharItemID` rides along. Resumes bare `true`/`false`; `qty`
  // defaults to 1.
  sellItem(idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? step({ op: "sell_item", id: idOrName, qty: want })
      : step({ op: "sell_item", name: idOrName, qty: want });
  },
  // `me()`: read-only player snapshot — identity, wallet, vitals, location,
  // capacity. No travel, no polling, no packets. Resumes the detail object;
  // raw counts only, scripts subtract.
  me(): unknown {
    return step({ op: "me" });
  },
  // `rep(idOrName)`: read-only faction query — the record for a `FactionID`
  // or an exact `sName` (the SWF's own either/or lookup). Resumes
  // `{"found":true,"id","name","rep","rank","repToRank"}` (or `found:false`
  // with zeroed fields). A miss reads `rank: 0`, so check `found` once when
  // writing a rank loop — `while (bot.rep("Good").rank < 10)` spins forever
  // on a typo'd name.
  rep(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? step({ op: "rep", id: idOrName })
      : step({ op: "rep", name: idOrName });
  },
  // `questValue(slot)`: read-only quest progression slot — `slot` is
  // uncapped (`strQuests`, `strQuests2`, …). Resumes the bare number (`-1`
  // when unset, the SWF's own miss signal).
  questValue(slot: number): unknown {
    return step({ op: "quest_value", slot });
  },
  // `setQuestValue(slot, value)`: write a progression slot (map/cutscene
  // `qs` locks and quest/shop gates read these same local strings, so a
  // landed write unlocks immediately). `value` must be 0–35 — one base-36
  // digit per slot, anything more corrupts to `"0"`. Resumes bare
  // `true`/`false`: `false` when the server echo never lands.
  setQuestValue(slot: number, value: number): unknown {
    return step({ op: "set_quest_value", slot, value });
  },
  // `align(side)`: switch alignment — `"good"`, `"evil"` or `"chaos"`
  // (Skua's `ChangeAlignment`, same `updateQuest` packet, slot 41).
  // Fire-and-forget past the paced send: no readable echo exists, so a
  // gated quest's accept is the real check. Resumes bare `true`.
  align(side: string): unknown {
    return step({ op: "align", side });
  },
  // `drops()`: read-only pending drop list — `[{id, name, qty}]`, empty when
  // nothing is pending. The loader builds the session-only list itself on
  // the first entered frame (the toggle replicated without persisting it —
  // the drops panel appears this session, your saved option is untouched).
  // Errors when the list is unavailable.
  drops(): unknown {
    return step({ op: "drops" });
  },
  // `pickup(idOrName)` / `pickup("*")`: claim one pending drop by id or by
  // pending-list name (matched case-insensitively), or clear the whole
  // floor. Id claims work in every UI mode; names and `"*"` read the
  // ensured list. One `getDrop` per item plus a grant poll each. Resumes
  // bare `true`/`false`: a miss, a rejected claim, and a stalled pass all
  // read `false` (claimed items stay claimed — call again for the
  // remainder); an empty floor reads `true`. Quests and wanted drops
  // (`bot.wantDrops`) already auto-claim, so scripts rarely call this.
  pickup(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? step({ op: "pickup", id: idOrName })
      : step({ op: "pickup", name: idOrName });
  },
  // `wantDrops(ids)` / `unwantDrops(ids?)` / `wantedDrops()`: Skua's
  // `AddDrop` whitelist — drop IDs the engine auto-claims off the floor
  // after every kill mission. Quest requirements never need this (the quest
  // path sweeps its own turn-ins); it is for plain monster drops farmed
  // with no live quest. Entries persist until removed. Each resumes the
  // wanted list.
  wantDrops(ids: number | number[]): unknown {
    return wantDrops(ids);
  },
  unwantDrops(ids?: number | number[]): unknown {
    return unwantDrops(ids);
  },
  wantedDrops(): unknown {
    return wantedDropsList();
  },
  // `notify(message)`: explicit bot notification — posts a high-visibility
  // Android notification (default sound) and logs the line. No game touch,
  // no waiting: resumes bare `true` once queued. Use for "got class ..."
  // moments inside a farm loop.
  notify(message: string): unknown {
    return step({ op: "notify", message });
  },
};
