# Script guidelines

Read this before writing or editing anything in `bots/`, `classes/`, or `lib/`.
It is the authoring contract: `README.md` describes the tree, `lib/bot.ts` is the
API, and this file says how to use them.

## Read in this order

1. This file.
2. `README.md` — layout, headers, entry shapes.
3. `lib/bot.ts` — the API you may call; its signatures are the arity check.
4. A nearby script in the same folder — shape only, never a contract.

Re-read this file on every task. Do not work from memory of an older bot.

## First-party API only

- Use `bot.*`. It is the engine facade: every call maps to a typed host op and
  parks the script until the server answers.
- Do not hand-roll packets, polling around a call that already waits, or a
  second namespace over `bot`.
- Use the typed reads for anything the script decides on: `itemState`,
  `ensureItemState`, `shopState`, `buyItemState`, `sellItemState`,
  `gatherState`, `pickupNow`, `me`, `rep`, `questValue`, `locate`.
- `lib/` files load before the entry as plain globals. There are no imports, so
  an entry calls the API directly.
- If the API lacks what the bot needs, fix the engine (`native/`) or ask. Do not
  fake engine behavior inside a script.

## Prefer the simpler shape

Take the first option that works, in this order:

1. One declarative call: `bot.kill`, `bot.farm`, `bot.clear`, `bot.attack`,
   `bot.questPlan`.
2. `bot.plan([...])` for a short ordered flow.
3. Plain `if` / `while` around typed reads, for decisions the declarative form
   cannot express.
4. A helper. Only when three real bots need the same behavior.

Do not reproduce engine behavior in the script: no travel-then-scan loop around
`farm`, no pickup drain loop around a mission, no retry counter around a call
that already waits and fails with a typed reason. The scheduler applies one
action per tick, pauses on death and cutscene, and cancels location steps on a
map change; a script that loops over those events fights the engine.

Keep the bot flat: named constants, small functions that read top-down, one
top-level body. Nesting past two levels usually means the step belongs in a
plan.

## Script shape

- Classic scripts only: no `import`, `export`, `await`, `async`. A durable
  `bot.*` call is an ordinary synchronous call from the script's side.
- Leading `///` lines are the headers: `name` required, `desc` optional,
  nothing else.
- Files live under `bots/<domain>/` or `classes/<class>/`; the folder is the
  kind. `classes/` files define `function policy(s)`.
- `index.json` is generated; never edit it by hand.

## Resolve data before writing code

Resolve ids, names, cells, requirements, and shops from data, not from memory:

- `refs/quest-data.json` for quest ids, requirements, rewards, and gates.
- `auspex` for items, maps, shop stock, and live dumps when the cache misses.

Use the exact `ItemID` / `sName` spelling the data gives. A guessed name or id
is a bug even when it happens to match. Confirm a name with `bot.itemState`
when the bot reads it back.

## Quests

- `bot.questPlan(id, handlers, opts?)` is the default: accept, fill the first
  unmet requirement with its handler, then turn in. The plan validates every
  unsatisfied requirement before it travels.
- Handler keys are live requirement `ItemID`s (numeric), one key per
  requirement the bot must fill. The parser rejects anything that is not an
  item id, so a turn-in name will not work.
- Omit `qty` inside a handler; the plan targets the requirement's own need.
  Keep `qty` only for a step with no live requirement behind it. A `farm` still
  names `item` and a source (`monster`, plus `id` when the spawn must be pinned):
  the step parser validates the handler before the plan binds the requirement,
  so it cannot fill those in.
- Use `source: "temp"` when the item lands in the temp inventory (Skua's
  `tempItem`); the default counts the backpack.
- Pass `{ choice: n }` for any quest with rewards — first reward is index 0.
  Without it the turn-in fails with `needs a reward choice`. Check `Rewards`
  in `refs/quest-data.json` for the id.
- `bot.quest.register(ids, opts?)` is only for a tick-swept set with no plan
  around it. A plan owns its own quest; do not register the same id.
- `bot.quest(id, handlers)`, `bot.hunt`, and `bot.gather` are legacy migration
  shapes. No new bot uses them.

## Drops

- Plain monster drops go on the mission's own `pickup` ids. Declare them once;
  the mission settles them after the fight.
- Quest drops belong to the handler that fills the requirement. Do not build a
  global want list or a second drop scope.
- Do not hand-roll a drain or pickup loop around a hunt or a plan.

## Re-runs and failure

- Check `bot.itemState` before an expensive farm so a stopped bot resumes
  instead of farming from zero. `ensureItemState` is for a turn-in
  precondition, not for gating a plan (the plan already skips met
  requirements).
- Fail loudly with facts: map, cell, monster, and have/want counts.
- Bound every loop that waits on the world. A read that can stay false must
  have a limit and a thrown reason.
- No silent fallback that changes what the bot does. If the fallback is real,
  name it in the script and in the bot's `desc`.

## Comments

- Comment only non-obvious game or engine constraints. No per-call narration,
  no changelog, no artifact notes.
- A comment answers why. The code answers what.

## Shared helpers

- `lib/` is the only shared place. Files are flat, loaded sorted, and become
  globals. Nested files are not loaded.
- Extract after three real bots need the same behavior, never before.
- Name the helper for its contract, keep args generic, and keep single-bot
  logic out of it.
- Helpers are plain functions; `bot.*` stays the only public namespace. Do not
  add a second quest registry or drop-want set.

## Before you commit

1. `bun tools/check.ts`
2. `bun tools/gen-index.ts`
3. Read the diff: no debug leftovers, no guessed ids, no unused helper.
4. Commit in this repo first, then bump the pin in the parent repo.
