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
