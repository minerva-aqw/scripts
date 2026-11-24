/// name: Monster Hunter rep
/// desc: Farms Monster Hunter reputation to rank 10 in pilgrimage/r5 via registered 5849 + 5850. Notifies on every rank-up.

// Ported from Skua `CoreFarms.MonsterHunterREP`. Skua pre-kills SpiderWing
// x4 + Urstrix x4 to "unlock" 5850, but that just pre-fills 5849's own
// requirements, so the registered loop covers it: both quests share
// pilgrimage r5 and the sweep turns in whatever filled. Every requirement
// is a temp drop (auto-loot, no floor drain). A stall guard fails loudly
// instead of spinning if the turn-ins ever stop landing.
const RANK = 10;
const QUESTS = [5849, 5850];

let fac = bot.rep("Monster Hunter");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  bot.quest.register(QUESTS);
  bot.hunt("SpiderWing", "pilgrimage", 4, "r5", "Left");
  bot.hunt("Urstrix", "pilgrimage", 4, "r5", "Left");
  bot.hunt("Ravenous Parasite", "pilgrimage", 7, "r5", "Left");
  bot.quest.unregister();
  fac = bot.rep("Monster Hunter");
  if (!fac.found) {
    throw new Error("no Monster Hunter faction after a round (quests 5849/5850 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("SpiderWing", "pilgrimage", 4, "r5", "Left"); // Spiderwing Captured
  bot.hunt("Urstrix", "pilgrimage", 4, "r5", "Left"); // Urstrix Captured
  bot.hunt("Ravenous Parasite", "pilgrimage", 7, "r5", "Left"); // Ravenous Parasites Slain
  fac = bot.rep("Monster Hunter");
  if (fac.rank > last) {
    bot.notify("Monster Hunter rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Monster Hunter stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
