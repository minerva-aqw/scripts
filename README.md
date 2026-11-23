# minerva-scripts

Shared AQW automation scripts. Anyone can PR; minerva reviews before merge.

## Layout

Kind comes from the folder, never from metadata:

```
bots/      durable workflows (travel, cell, kill sequencing)
classes/   combat rotations (one file per class/build)
lib/       stdlib, evaluated before every entry — never run directly
```

`bots/` scripts run in the bots runtime (durable, parks on every call).
`classes/` scripts run in the combat runtime (tick loop). Every file under
`lib/` evaluates into the shared global scope before the entry, in sorted
order — entries use those globals directly.

Entries are classic scripts, not modules: no `import`, no `export`, no
top-level `await`. The engine only suspends from a plain synchronous call
stack, so durable calls stay sync and invisible.

## Headers

Every file under `bots/` and `classes/` starts with `///` metadata lines:

```ts
/// name: Eridani smoke test
/// desc: Travel to eridani, enter r3, kill 3 of anything.
```

`name` is required. `desc` is optional. No `version`, no `kind` — the content
hash in `index.json` is the version, the folder is the kind.

## Quests

Default is the declarative form — accept, then the first unmet
requirement's handler until every requirement reads held, then turn in:

```ts
bot.quest(8248, {
  "63016": () => bot.hunt("*", "astraviacastle", 6, "r3", "Left"),
  "63015": () => bot.gather(8891, "astraviacastle", 6),
});
```

Handler keys are requirement `ItemID`s (stable) or turn-in `sName`s
(case-insensitive). `bot.quest(id, handlers, { choice, qty })` passes the
turn-in options through; `{ turnIn: false }` fills without turning in.
Completed quests return `true` without touching anything, so re-runs are
safe. Missing or stalled requirements error with have/want counts.

Manual sequence for blocks that need full control — ordering past
turn-in order, interleaved bank/class/cutscene steps, per-turn-in
repeatable logic:

```ts
if (!bot.quest(8249).completed()) {
  bot.quest(8249).accept();
  bot.gather(8892, "astraviacastle", 6);
  bot.hunt("Creature 20", "astraviacastle", 4);
  bot.quest(8249).turnIn();
}
```

### Registered quests

When a quest should be handed in the moment its bags fill — not when the
script happens to look — register it. The engine sweeps the registered set
before every parked call (at most once per `interval`, default 2000 ms):
accept what is not in the tracker, turn in what the client offers, and never
wait or throw. A refused turn-in costs a sweep, not the run.

```ts
bot.quest.register([8300, 8301], { choice: 0, qty: 1, interval: 2000 });
bot.hunt("Slime", "yulgar", 20);   // the hand-ins happen from the tick
bot.quest.unregister();            // or unregister([8300])
```

`bot.quest.sweep()` runs one pass immediately and resumes `{ swept: [{ id,
did }] }`, with `did` one of `accept`, `turnin`, `filling`, `refused`
(the server's own words in `why`), `choice` (a reward must be named),
`wait` (cold definition), `done` or `error`. `bot.quest.registered()` lists
what is registered.

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
a `rotation(me, target)` in every `classes/` file, and a fresh `index.json`.
