/// name: Mysterious Dungeon rep
/// desc: Farms Mysterious Dungeon reputation to rank 10 via quest 5429 in cursedshop (Antique Chair), after one-time unlock 5428. Notifies on every rank-up.

// Ported from Skua `CoreFarms.MysteriousDungeonREP`. Quest 5428 "Cursed
// Artifact Shop" (map item 4803 in cursedshop) is one-time and no-ops when
// done; 5429 "Lamps, Paintings and Chairs, oh my!" wants Antique Chair
// Defeated x1, a temp drop (auto-loot, no floor drain). Single-quest
// declarative loop relies on the composite's own stall error.
const RANK = 10;

if (!bot.quest(5429).completed()) {
  bot.quest(5428, {
    "36921": function () { bot.gather(4803, "cursedshop", 1); }, // Enter the Cursed Artifact Shop
  });
}

const chairs = {
  "36922": function () { bot.hunt("Antique Chair", "cursedshop", 1); }, // Antique Chair Defeated
};
bot.quest(5429, chairs);

let fac = bot.rep("Mysterious Dungeon");
if (!fac.found) {
  throw new Error("no Mysterious Dungeon faction after a turn-in (quest 5429 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5429, chairs);
  fac = bot.rep("Mysterious Dungeon");
  if (fac.rank > last) {
    bot.notify("Mysterious Dungeon rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
