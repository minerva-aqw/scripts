/// name: Arcangrove rep
/// desc: Farms Arcangrove reputation to rank 10: registers quests 794-801, loops Gorillaphant (LeftBack) + Seed Spitter (RightBack). Notifies on every rank-up.

// Ported from Skua `CoreFarms.ArcangroveREP`. All eight quests share the
// same two cells, so they are registered once and filled concurrently:
// 10x "*" in LeftBack (Gorillaphant) + 10x "*" in RightBack (Seed
// Spitter) per round, with the tick sweep turning in whatever filled.
// Every requirement is a temp drop (auto-loot, no floor drain). Quests
// 794-801 are level 0 in arcangrove; if they ever lock, no turn-in lands
// and the stall guard below fails naming the round count instead of
// spinning forever.

const RANK = 10;
const QUESTS = [794, 795, 796, 797, 798, 799, 800, 801];

let fac = bot.rep("Arcangrove");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Arcangrove entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled (locked, wrong cells) — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("*", "arcangrove", 10, "LeftBack", "Left");
  bot.quest.unregister();
  fac = bot.rep("Arcangrove");
  if (!fac.found) {
    throw new Error("no Arcangrove faction after a round (quests 794-801 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "arcangrove", 10, "LeftBack", "Left");
  bot.hunt("*", "arcangrove", 10, "RightBack", "Left");
  fac = bot.rep("Arcangrove");
  if (fac.rank > last) {
    bot.notify("Arcangrove rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Arcangrove stalled at rank " + fac.rank + " (30 rounds, 600 kills, no rank-up)");
    }
  }
}
bot.quest.unregister();
