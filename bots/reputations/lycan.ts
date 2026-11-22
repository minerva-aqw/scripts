/// name: Lycan rep
/// desc: Farms Lycan reputation to rank 10 via quest 537 Sanguine in /lycan. Requires the Wolfwing storyline done and quest 537 completed at least once.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Ported from Skua `Farm/REP/LycanREP.cs` + `CoreFarms.LycanREP`: quest
// 537 "Sanguine" wants 1 Sanguine Mask (3750) off the Sanguine monster in
// /lycan, and each turn-in pays Lycan rep. `bot.quest` accepts, fills via
// the handler, and turns in by itself; the outer loop runs that cycle
// until the faction reads rank 10. Handler keyed by ItemID: these old
// definitions can report empty requirement names, and IDs win on
// collision anyway.
const RANK = 10;

// Fresh accounts have no Lycan entry yet: run one cycle first — a real
// turn-in registers the faction. Still missing after that means the
// name is wrong, and we fail instead of farming blind.
const masks = {
  "3750": function () { bot.hunt("Sanguine", "lycan", 1); }, // Sanguine Mask
};
bot.quest(537, masks);

let fac = bot.rep("Lycan");
if (!fac.found) {
  throw new Error("no Lycan faction after a turn-in (check bot.rep spelling)");
}

while (fac.rank < RANK) {
  bot.quest(537, masks);
  fac = bot.rep("Lycan");
}
