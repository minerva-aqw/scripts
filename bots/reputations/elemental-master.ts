/// name: Elemental Master rep
/// desc: Farms Elemental Master reputation to rank 10 in gilead: Dragonrune Hall unlock 3052, member daily 3299 first when available, then registered 3050 + 3298. Notifies on every rank-up.

// Ported from Skua `CoreFarms.ElementalMasterREP`. Quest 3052 "Welcome to
// Dragonrune Hall" (map items 1921-1924 in dragonrune) is one-time and
// no-ops when done. Member daily 3299 wants 6 drops off each base
// elemental; the main pair 3050 (5 cores) + 3298 (5x4 drops) shares gilead,
// so it registers once and the sweep turns in whatever filled. Every
// requirement is a temp drop (auto-loot, no floor drain). A stall guard
// fails loudly instead of spinning if the turn-ins ever stop landing.
const RANK = 10;

if (!bot.quest(3052).completed()) {
  bot.quest(3052, {
    "18873": function () { bot.gather(1921, "dragonrune", 1); }, // Neveya
    "18874": function () { bot.gather(1922, "dragonrune", 1); }, // Warlic
    "18875": function () { bot.gather(1923, "dragonrune", 1); }, // Maedoc
    "18876": function () { bot.gather(1924, "dragonrune", 1); }, // Mueran
  });
}

if (bot.me().upgraded === true && !bot.quest(3299).completed()) {
  bot.quest(3299, {
    "22249": function () { bot.hunt("Fire Elemental", "gilead", 6); }, // Flame
    "22250": function () { bot.hunt("Water Elemental", "gilead", 6); }, // Water Drop
    "22251": function () { bot.hunt("Wind Elemental", "gilead", 6); }, // Breeze
    "22252": function () { bot.hunt("Earth Elemental", "gilead", 6); }, // Stone
  });
}

function round() {
  bot.hunt("Water Elemental", "gilead", 6); // Water Core + Water Drop
  bot.hunt("Fire Elemental", "gilead", 6); // Fire Core + Flame
  bot.hunt("Wind Elemental", "gilead", 6); // Air Core + Breeze
  bot.hunt("Earth Elemental", "gilead", 6); // Earth Core + Stone
  bot.hunt("Mana Elemental", "gilead", 1); // Mana Core
}

let fac = bot.rep("Elemental Master");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no entry yet: one round registers it via the
  // sweep turn-ins. Still missing after that means the quests never
  // filled — fail instead of farming blind.
  bot.quest.register([3050, 3298], { choice: 0 });
  round();
  bot.quest.unregister();
  fac = bot.rep("Elemental Master");
  if (!fac.found) {
    throw new Error("no Elemental Master faction after a round (quests 3050/3298 filling?)");
  }
  last = fac.rank;
}

bot.quest.register([3050, 3298], { choice: 0 });
let dry = 0;
while (fac.rank < RANK) {
  round();
  fac = bot.rep("Elemental Master");
  if (fac.rank > last) {
    bot.notify("Elemental Master rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Elemental Master stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
