/// name: Faerie Court rep
/// desc: SEASONAL farm for Faerie Court reputation to rank 10: registered 6775 + 6779, Lucky Harms in rainbow below rank 8, Dark Sylphdrake in faegrove after. Fails while the event maps are away. Notifies on every rank-up.

// Ported from Skua `CoreFarms.FaerieCourtREP` (marked seasonal there too).
// Skua refuses to run when /rainbow will not load; here the hunts fail
// loudly naming the cell instead. Both requirements are temp drops
// (auto-loot, no floor drain). A stall guard fails loudly instead of
// spinning if the turn-ins ever stop landing.
const RANK = 10;
const QUESTS = [6775, 6779];

let fac = bot.rep("Faerie Court");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  bot.quest.register(QUESTS, { choice: 0 });
  bot.hunt("Lucky Harms", "rainbow", 3);
  bot.quest.unregister();
  fac = bot.rep("Faerie Court");
  if (!fac.found) {
    throw new Error("no Faerie Court faction after a round (seasonal maps open? quests 6775/6779 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS, { choice: 0 });
let dry = 0;
while (fac.rank < RANK) {
  if (fac.rank < 8) {
    bot.hunt("Lucky Harms", "rainbow", 3); // Four Leaf Clover
  } else {
    bot.hunt("Dark Sylphdrake", "faegrove", 1); // Silver Sylph Feather
  }
  fac = bot.rep("Faerie Court");
  if (fac.rank > last) {
    bot.notify("Faerie Court rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Faerie Court stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
