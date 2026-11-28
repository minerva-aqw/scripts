# lib

Shared, flat prelude files evaluated into every script before its entry.

- `bot.ts` — the engine facade. This is the contract the new bots use: missions,
  plans, quest plans, typed inventory/shop/gather/pickup results, and the
  explicit quest handle.
- `monsters.ts` — `findMonsterCell(name, map, cell?)`: the cell holding a named
  monster in the room the caller already joined, cached per map. It throws with
  the cells seen when the monster is absent.
- `gates.ts` — `stopRun(message)`, the failure verb every bot ends with, plus
  `requireLevel(who, level)`, `requireRank(who, faction, rank)` and
  `openQuestSlot(who, slot, value)`. Each gate reads one typed record, names the
  shortfall and ends the run.

## Adding a helper

Add a file directly under `lib/` (nested files are not loaded). It becomes a
global for every script; there are no imports.

Create a helper only after at least three real bots need the same behavior.
Name it for its contract, not for one script. Keep `bot.*` as the single public
namespace; helpers are plain functions such as `questMissing(id)` or
`heldItemCount(id)`, not a second `minerva.*` namespace.

Do not add a session-global drop want or a second quest registry. Mission
`pickup` and `bot.questPlan` handlers own those scopes.
