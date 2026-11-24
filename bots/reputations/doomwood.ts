/// name: DoomWood rep
/// desc: Farms DoomWood reputation to rank 10: registers quests 1151/1152/1153, loops shadowfallwar Garden1. Notifies on every rank-up.

// Ported from Skua `CoreFarms.DoomWoodREP`. All three quests share one
// cell, so they are registered once and filled concurrently (15 Un-Dead
// Tag + 1 To Do List of Doom + 1 Skeleton Key = 17 kills per round), with
// the tick sweep turning in whatever filled. Every requirement is a temp
// drop (auto-loot, no floor drain).

const RANK = 10;
const QUESTS = [1151, 1152, 1153];

let fac = bot.rep("DoomWood");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no DoomWood entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("*", "shadowfallwar", 17, "Garden1", "Left");
  bot.quest.unregister();
  fac = bot.rep("DoomWood");
  if (!fac.found) {
    throw new Error("no DoomWood faction after a round (quests 1151/1152/1153 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "shadowfallwar", 17, "Garden1", "Left");
  fac = bot.rep("DoomWood");
  if (fac.rank > last) {
    bot.notify("DoomWood rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("DoomWood stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
