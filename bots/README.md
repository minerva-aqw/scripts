# bots

Read `../GUIDELINES.md` before adding or changing anything here.

Bot tree for the overhauled scripting contract. Bots are grouped by domain:
`rep/` for reputation loops and `story/` for story chapters.

The previous corpus is gone. New bots are written against the current `bot.*`
surface, indexed, and checked.

## Rules for new bots

- Classic scripts only: no `import`, `export`, `await`, or `async`.
- Call `bot.*` with the overhaul shapes:
  - `bot.kill({ monster, count, map?, cell?, blockers?, pickup? })`
  - `bot.clear({ monster?, blockers? })`
  - `bot.attack({ monster?, id?, blockers? })`
  - `bot.farm({ item | itemName, qty?, monster, map?, cell?, blockers? })`
  - `bot.plan([...])` for multi-step workflows
  - `bot.questPlan(id, handlers, opts?)` for quest chains
- Use typed results for anything the script reads back:
  `bot.itemState`, `bot.ensureItemState`, `bot.shopState`,
  `bot.buyItemState`, `bot.sellItemState`, `bot.gatherState`,
  `bot.pickupNow`.
- Plain drops belong on the mission's `pickup` list. Quest requirements are
  scoped to the handler round by `questPlan`; do not add a global want list.
- Keep `hunt`, `kill`, and `farm` distinct. New code uses `kill`/`clear`/
  `farm`; `bot.hunt` is legacy and must not appear here.
- Do not copy the old corpus. If a helper is needed by three bots, put it in
  `../lib/`.

`../lib/bot.ts` is the engine facade. Bot-specific helpers are extracted only
after real bots need them; no speculative helper layers.
