/// name: Vampire rep
/// desc: Farms Vampire reputation to rank 10 via quest 522 Twisted Paw in /safiria. Requires the Wolfwing storyline done and quest 522 unlocked.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Ported from Skua `Farm/REP/VampireREP.cs` + `CoreFarms.VampireREP`:
// quest 522 "Twisted Paw" wants 1 Twisted Paw's Head (2933) off the
// Twisted Paw monster in /safiria, and each turn-in pays Vampire rep.
// `bot.quest` accepts, fills via the handler, and turns in by itself;
// the outer loop runs that cycle until the faction reads rank 10.
// Handler keyed by ItemID: old definitions can report empty requirement
// names, and IDs win on collision anyway.
//
// No pickup drain here: the quest also rewards an Old Moon each turn-in
// and Skua explicitly leaves it on the floor (`RemoveDrop`), so the
// floor sweep stays off and junk never touches the backpack.
const RANK = 10;

// Fresh accounts have no Vampire entry yet: run one cycle first — a real
// turn-in registers the faction. Still missing after that means the
// name is wrong, and we fail instead of farming blind.
const heads = {
  "2933": function () { bot.hunt("Twisted Paw", "safiria", 1); }, // Twisted Paw's Head
};
bot.quest(522, heads);

let fac = bot.rep("Vampire");
if (!fac.found) {
  throw new Error("no Vampire faction after a turn-in (check bot.rep spelling)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(522, heads);
  fac = bot.rep("Vampire");
  if (fac.rank > last) {
    bot.notify("Vampire rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
