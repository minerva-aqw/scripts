/// name: Dreadrock rep
/// desc: Farms Dreadrock reputation to rank 10: registers quests 4862/4863/4865/4868, loops dreadrock r3. Notifies on every rank-up.

// Ported from Skua `CoreFarms.DreadrockREP`. All four quests share one
// cell, so they are registered once and filled concurrently (40 + 13 +
// 100 + 1 = 154 kills per round worst case), with the tick sweep turning
// in whatever filled. Every requirement is a temp drop per quest-data.json
// (auto-loot, no floor drain — including Ghastly Dreadrock Blade x100).

const RANK = 10;
const QUESTS = [4863, 4862, 4865, 4868];

let fac = bot.rep("Dreadrock");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Dreadrock entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("*", "dreadrock", 154, "r3", "Bottom");
  bot.quest.unregister();
  fac = bot.rep("Dreadrock");
  if (!fac.found) {
    throw new Error("no Dreadrock faction after a round (quests 4862/4863/4865/4868 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "dreadrock", 154, "r3", "Bottom");
  fac = bot.rep("Dreadrock");
  if (fac.rank > last) {
    bot.notify("Dreadrock rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Dreadrock stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
