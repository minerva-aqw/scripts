/// name: Xan's Lair Story
/// desc: Xan saga finale: volcano 1242-1261, xantown 1733-1740, xancave 2151-2157. Finished quests return true without touching anything, so re-runs resume where they stopped.

// Ported from Skua Story/XansLair.cs (DoAll). Handler keys are requirement
// ItemIDs; map-item ids, monsters and quantities come from that file and
// refs/quest-data.json. All three chapters share chain slot 53 (values
// 1..35), so a later block no-ops until the earlier ones are done — and the
// xancave quests only unlock after the volcano + xantown halves.
//
// Lava Goblin drops carry the xancave gems, Crossing Over's Fire Salts/Fire
// Wire and Defend the Library's 15 clears, so those hunts are counted by the
// requirement, not by kills.

// --- Volcano (levels 1-20)

bot.quest(1242, {
  "8970": function () { bot.hunt("Lava Golem", "volcano"); }, // Charred Clue
});

bot.quest(1243, {
  "8972": function () { bot.hunt("Fire Imp", "volcano"); }, // Broiled Clue
  "8971": function () { bot.gather(526, "volcano", 3); }, // Eternal Ember
});

bot.quest(1244, {
  "8973": function () { bot.hunt("Fire Imp", "volcano"); }, // Cauterized Clue
});

bot.quest(1245, {
  "8975": function () { bot.hunt("Lava Golem", "volcano"); }, // Blazing Clue
  "8974": function () { bot.gather(527, "volcano", 8); }, // Blazing Campfire
});

bot.quest(1246, {
  "8976": function () { bot.hunt("Fire Imp", "volcano"); }, // Combustible Clue
});

bot.quest(1247, {
  "8977": function () { bot.hunt("Fire Imp", "volcano"); }, // Flaming Clue
});

bot.quest(1248, {
  "8978": function () { bot.gather(528, "volcano", 12); }, // Wisps of Smoke
});

bot.quest(1249, {
  "8979": function () { bot.hunt("Flamethrower Dwakel", "volcano"); }, // Toasted Clue
});

bot.quest(1250, {
  "8981": function () { bot.hunt("Fire Imp", "volcano"); }, // Torched Clue
  "8980": function () { bot.gather(529, "volcano", 8); }, // Lava Shard
});

bot.quest(1251, {
  "8982": function () { bot.hunt("Flamethrower Dwakel", "volcano"); }, // Incincerated Clue
});

bot.quest(1252, {
  "8984": function () { bot.hunt("Fire Imp", "volcano"); }, // Melted Clue
  "8983": function () { bot.gather(530, "volcano", 10); }, // Basalt Rock
});

bot.quest(1253, {
  "8985": function () { bot.hunt("Flame Elemental", "volcano"); }, // Ash-Covered Clue
});

bot.quest(1254, {
  "8986": function () { bot.gather(531, "volcano", 12); }, // Kindling Log
});

bot.quest(1255, {
  "8987": function () { bot.hunt("Fire Imp", "volcano"); }, // Roasted Clue
});

bot.quest(1256, {
  "8988": function () { bot.hunt("Fire Imp", "volcano"); }, // Scorched Clue
});

bot.quest(1257, {
  "8989": function () { bot.gather(532, "volcano", 10); }, // Flaming Torches
});

bot.quest(1258, {
  "8990": function () { bot.hunt("Flamethrower Dwakel", "volcano"); }, // Seared Clue
});

bot.quest(1259, {
  "8991": function () { bot.hunt("Fire Imp", "volcano"); }, // Singed Clue
});

bot.quest(1260, {
  "8993": function () { bot.hunt("Fire Imp", "volcano"); }, // Smoking Clue
  "8992": function () { bot.gather(533, "volcano", 6); }, // Living Eternal Ember
});

bot.quest(1261, {
  "8994": function () { bot.hunt("Magman", "volcano"); }, // Magman Defeated
});

// --- Xantown (Andesi, then Scoria's Xan)

bot.quest(1733, {
  "11321": function () { bot.gather(922, "xantown"); }, // The Mill is Sealed
});

bot.quest(1734, {
  "11322": function () { bot.hunt("Fire Imp", "xantown"); }, // The Mill Key
});

bot.quest(1735, {
  "11323": function () { bot.hunt("Fire Imp", "xantown"); }, // Fire Monster Cleared
});

bot.quest(1736, {
  "11324": function () { bot.hunt("Fire Imp", "xantown"); }, // The Only Bucket In Town
});

bot.quest(1737, {
  "11325": function () { bot.gather(923, "xantown", 4); }, // Blazing Inferno Doused
});

bot.quest(1738, {
  "11326": function () { bot.gather(924, "xantown"); }, // Andesi's Pendant
});

bot.quest(1739, {
  "11327": function () { bot.gather(925, "xantown"); }, // Deliver Pendant to Scoria
});

bot.quest(1740, {
  "11328": function () { bot.hunt("Xan", "xantown"); }, // Got Some Xanswers
});

// --- Xancave (Warlic's sealed library)

bot.quest(2151, {
  "12568": function () { bot.gather(1220, "xancave"); }, // Library Door Located!
});

bot.quest(2152, {
  "12569": function () { bot.hunt("Lava Goblin", "xancave"); }, // Shurpu Fire Gem
});

bot.quest(2153, {
  "12570": function () { bot.gather(1221, "xancave"); }, // Library Door Unlocked
});

bot.quest(2154, {
  "12571": function () { bot.hunt("Lava Goblin", "xancave"); }, // Monster Cleared
});

bot.quest(2155, {
  "12572": function () { bot.hunt("Lava Goblin", "xancave"); }, // Fire Salts
  "12573": function () { bot.hunt("Lava Goblin", "xancave"); }, // Fire Wire
  "12574": function () { bot.gather(1223, "xancave", 8); }, // Board
});

bot.quest(2156, {
  "12575": function () { bot.hunt("Shurpu Ring Guardian", "xancave"); }, // Ring of Shurpu
});

bot.quest(2157, {
  "12576": function () { bot.gather(1222, "xancave"); }, // Here's Xan
});
