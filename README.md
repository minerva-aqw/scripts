# minerva-scripts

Shared AQW automation scripts. Anyone can PR; minerva reviews before merge.

Read `GUIDELINES.md` before writing or editing any script. It is the authoring
contract for `bots/`, `classes/`, and `lib/`; the other files describe the tree
and the API.

## Layout

Kind comes from the folder, never from metadata:

```
bots/      durable workflows (missions, plans, quest plans) — being rewritten
classes/   combat rotations (one file per class/build)
lib/       stdlib, evaluated before every entry — never run directly
```

`bots/` is intentionally empty while the bots are rewritten from zero against
the overhauled contract. See `bots/README.md` for the rules the first bots
must follow. The previous corpus was deleted after a short archive window.

`classes/` scripts run in the combat runtime (tick loop). Every file directly
under `lib/` evaluates into the shared global scope before the entry, in sorted
order — entries use those globals directly. Nested `lib/` files are not loaded.

Entries are classic scripts, not modules: no `import`, no `export`, no
top-level `await`. The engine only suspends from a plain synchronous call
stack, so durable calls stay sync and invisible.

## Headers

Every file under `bots/` and `classes/` starts with `///` metadata lines:

```ts
/// name: Eridani mission
/// desc: Travel to eridani, enter r3, kill 3 of anything.
```

`name` is required. `desc` is optional. No `version`, no `kind` — the content
hash in `index.json` is the version, the folder is the kind.

## Missions

New bots use object missions, one action per tick:

```ts
bot.kill({ monster: "*", count: 3, map: "eridani", cell: "r3" });
bot.clear({ monster: "Slime" });
bot.farm({ item: 2238, qty: 1, monster: "Kitsune", map: "kitsune", cell: "Boss" });
```

`kill` is exact-count in one cell, `clear` wipes the matching room, `farm`
repeats its source until the held-item floor is met. Blockers are priority
names that engage but never count. Plain drops go on the mission's own
`pickup` list; a farm scopes its own item id automatically.

## Quest plans

`bot.questPlan` is the declarative quest path:

```ts
bot.questPlan(8248, {
  "63016": [{ attack: { name: "*", count: 6 } }],
  "63015": [{ gather: { id: 8891, map: "astraviacastle", qty: 6 } }],
});
```

Handler keys are live requirement `ItemID`s (numeric). The plan
validates that every unsatisfied requirement has a handler before it accepts
or travels. `{ choice, qty, turnIn: false }` passes through to the turn-in.

For a multi-step flow that is not a quest, use `bot.plan([...])`.

The legacy `bot.hunt`/`bot.gather`/`bot.quest(id, handlers)` composites remain
in the engine during the rewrite, but no new bot may use them.

## index.json

Generated, never hand-edited:

```
bun tools/gen-index.ts
```

CI fails when the committed index drifts from the tree. On device the index
is a fast-listing cache; the files are the source of truth.

## check

Static checks (Bun, zero dependencies):

```
bun tools/check.ts
```

Enforces the headers, the classic-script shape (no `import`/`export`/
`await`/`async`), `bot.*` method names and arity against `lib/bot.ts`,
a `policy(s)` in every `classes/` file, and a fresh `index.json`.
