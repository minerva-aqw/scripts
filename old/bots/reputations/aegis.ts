/// name: Aegis rep
/// desc: Farms Aegis reputation to rank 10: registers quests 4900/4910/4914, loops Seraphic Assassin + Virtuous Warrior in skytower. Notifies on every rank-up.

// Ported from Skua `CoreFarms.AegisREP`. All three quests fill off the same
// two mobs, so they are registered once and filled concurrently: 16
// assassin drops (10 for 4914 + 6 for 4900) + 16 warrior drops (10 for
// 4910 + 6 for 4900) per round, with the tick sweep turning in whatever
// filled. Every requirement is a temp drop (auto-loot, no floor drain).

const RANK = 10;
const QUESTS = [4900, 4910, 4914];

let fac = bot.rep("Aegis");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Aegis entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("Seraphic Assassin", "skytower", 16);
  bot.hunt("Virtuous Warrior", "skytower", 16);
  bot.quest.unregister();
  fac = bot.rep("Aegis");
  if (!fac.found) {
    throw new Error("no Aegis faction after a round (quests 4900/4910/4914 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("Seraphic Assassin", "skytower", 16);
  bot.hunt("Virtuous Warrior", "skytower", 16);
  fac = bot.rep("Aegis");
  if (fac.rank > last) {
    bot.notify("Aegis rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Aegis stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
