/// name: Dwarfhold rep
/// desc: Farms Dwarfhold reputation to rank 10: unlocks 319 in tavern, then repeats 320 + 321 in pines/Enter. Notifies on every rank-up.

// Ported from Skua `CoreFarms.DwarfholdREP`. Quest 319 "Seven Sisters"
// (map item 56 x7 in tavern) unlocks the farm pair; it no-ops when already
// completed, so re-runs resume. Then 320 "Warm and Furry" (Bear Skin x5
// off Pine Grizzly) and 321 "Shell Shock" (Red Turtle Shell x5 off Red
// Shell Turtle) are registered together and filled in the same cell —
// the tick sweep turns in whatever filled. All requirements are temp
// drops (auto-loot, no floor drain). A stall guard fails loudly instead
// of spinning if the turn-ins ever stop landing.

const RANK = 10;

if (!bot.quest(320).completed()) {
  bot.quest(319, {
    "1592": function () { bot.gather(56, "tavern", 7); }, // Sister's Blessing
  });
}

let fac = bot.rep("Dwarfhold");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Dwarfhold entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled (locked, wrong cell) — fail instead of farming blind.
  bot.quest.register([320, 321]);
  bot.hunt("Pine Grizzly", "pines", 5, "Enter", "Right");
  bot.hunt("Red Shell Turtle", "pines", 5, "Enter", "Right");
  bot.quest.unregister();
  fac = bot.rep("Dwarfhold");
  if (!fac.found) {
    throw new Error("no Dwarfhold faction after a round (quests 320/321 filling?)");
  }
  last = fac.rank;
}

bot.quest.register([320, 321]);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("Pine Grizzly", "pines", 5, "Enter", "Right");
  bot.hunt("Red Shell Turtle", "pines", 5, "Enter", "Right");
  fac = bot.rep("Dwarfhold");
  if (fac.rank > last) {
    bot.notify("Dwarfhold rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Dwarfhold stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
