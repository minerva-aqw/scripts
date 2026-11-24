/// name: Glacera rep
/// desc: Farms Glacera reputation to rank 10 in icewindwar/r5 via registered 5597-5600. Requires the Glacera storyline done (quest 5601). Notifies on every rank-up.

// Ported from Skua `CoreFarms.GlaceraREP`, which refuses to run until the
// Glacera story is done — same gate here, loud. All four quests share one
// cell, so they register once and the sweep turns in whatever filled (10x
// Frostspawn/World Ender medals + 5x megas per round, 30 kills). Every
// requirement is a temp drop (auto-loot, no floor drain). A stall guard
// fails loudly instead of spinning if the turn-ins ever stop landing.
const RANK = 10;
const QUESTS = [5597, 5598, 5599, 5600];

if (!bot.quest(5601).completed()) {
  throw new Error("Glacera farm locked (finish Story/Glacera first, quest 5601)");
}

let fac = bot.rep("Glacera");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  bot.quest.register(QUESTS, { choice: 0 });
  bot.hunt("*", "icewindwar", 30, "r5", "Left");
  bot.quest.unregister();
  fac = bot.rep("Glacera");
  if (!fac.found) {
    throw new Error("no Glacera faction after a round (quests 5597-5600 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS, { choice: 0 });
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "icewindwar", 30, "r5", "Left");
  fac = bot.rep("Glacera");
  if (fac.rank > last) {
    bot.notify("Glacera rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Glacera stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
