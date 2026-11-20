// Bots standard library: durable host calls shared by every bots script.
//
// Evaluated into the shared global scope before each entry, so entries use
// `bot` directly with no imports. Each call parks the script (suspend) until
// the host answers; from the script side they are ordinary synchronous calls,
// never awaited (the engine cannot suspend from an async frame). Underneath
// the driver snapshots the parked frames, runs the `ctl` round trip, then
// resumes with the result. No hand-built packets here: args map 1:1 onto
// `BotCommand` (`travel` -> gotoTown, `cell` -> moveToCell, `kill` ->
// combat mission via `kill_mission`).
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
};
