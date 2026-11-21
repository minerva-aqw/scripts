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
// `Game.world.tryQuestComplete`, `hunt(name, map, qty?)` -> teleport +
// census + `moveToCell` + kill, `gather(id, map, qty?)` -> teleport (no
// cell move; the `getMapItem` packet carries no cell) + `getMapItem` polled
// against temp inventory, `inventory(idOrName)` -> detail object,
// `ensureItem(idOrName, qty?)` -> bare boolean, unbanking first).
declare function park(v: unknown): unknown;

const bot = {
  travel(map: string, cell?: string, pad?: string): unknown {
    return park({ op: "travel", map, cell: cell ?? "Enter", pad: pad ?? "Spawn" });
  },
  cell(frame: string, pad?: string): unknown {
    return park({ op: "cell", frame, pad: pad ?? "Spawn" });
  },
  kill(name: string, count?: number): unknown {
    return park({ op: "kill", name, count: count ?? 1 });
  },
  // `quest(407).accept()` / `quest(407).turnIn(choice?, qty?)`.
  // `quest(id)` itself never parks: it only captures the id for the two
  // parking calls below, so `const q = bot.quest(id); q.accept();` works.
  // `choice` defaults to -1 (no reward choice, the SWF default —
  // `QFrameMC.as:28`); `qty` defaults to 1 and caps at 250.
  quest(id: number) {
    return {
      accept(): unknown {
        return park({ op: "quest_accept", id });
      },
      turnIn(choice?: number, qty?: number): unknown {
        return park({ op: "quest_turnin", id, choice: choice ?? -1, qty: qty ?? 1 });
      },
    };
  },
  // `hunt(name, map, qty?)`: teleport to `map` when elsewhere, census the
  // live room for the cell holding the most `name` matches, go there, then
  // kill. `map` is required; `qty` defaults to 1.
  hunt(name: string, map: string, qty?: number): unknown {
    return park({ op: "hunt", name, map, qty: qty ?? 1 });
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
};
