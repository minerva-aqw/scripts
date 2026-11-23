/// name: Chaos Lords 02 - Escherion
/// desc: Escherion chapter, quests 245-272. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Escherion.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// Boss (272) pins Boss/Left in escherion, mirroring Skua KillEscherion.

bot.quest(245, {
  "1105": function () { bot.hunt("Chaos Sp-Eye", "mobius", 5); }, // Eyeball Wings
});

bot.quest(246, {
  "1119": function () { bot.gather(42, "mobius", 5); }, // Mobius Survivor
});

bot.quest(247, {
  "1106": function () { bot.hunt("Fire Imp", "mobius", 5); }, // Imp Tooth
});

bot.quest(260, {
  "1124": function () { bot.gather(44, "mobius"); }, // Tower Info
});

bot.quest(248, {
  "1107": function () { bot.hunt("Cyclops Raider", "mobius", 5); }, // Cyclops Contact Lenses
});

bot.quest(249, {
  "1108": function () { bot.hunt("Slugfit", "mobius"); }, // Slugfit Scalp
});

bot.quest(250, {
  "1109": function () { bot.hunt("Chainsaw Sneevil", "faerie", 6); }, // Sneevil Chainsaw
});

bot.quest(251, {
  "1110": function () { bot.gather(43, "faerie", 7); }, // Dew Drop
});

bot.quest(252, {
  "1111": function () { bot.hunt("Chainsaw Sneevil", "faerie"); }, // Healing Jar
});

bot.quest(255, {
  "1114": function () { bot.hunt("Cyclops Warlord", "faerie"); }, // Warlord's Beard
});

bot.quest(256, {
  "1115": function () { bot.hunt("Aracara", "faerie"); }, // Runed Relic
});

bot.quest(257, {
  "1116": function () { bot.hunt("Gargoyle", "cornelis", 8); }, // Gargoyle Chips
});

bot.quest(261, {
  "1125": function () { bot.gather(45, "cornelis"); }, // Teleport Info
});

bot.quest(258, {
  "1117": function () { bot.hunt("Gargoyle", "cornelis", 10); }, // Blue Gems
});

bot.quest(262, {
  "1126": function () { bot.gather(46, "cornelis"); }, // Golem Sketch
});

bot.quest(259, {
  "1118": function () { bot.hunt("Stone Golem", "cornelis"); }, // Golem Arm
});

bot.quest(263, {
  "1129": function () { bot.gather(47, "cornelis"); }, // History Book
});

bot.quest(266, {
  "1142": function () { bot.gather(48, "mobius"); }, // Puzzle Complete
});

bot.quest(267, {
  "1143": function () { bot.gather(49, "mobius"); }, // Teleporter Info
});

bot.quest(264, {
  "1140": function () { bot.hunt("Cyclops Raider", "mobius", 8); }, // Cloth Scraps
});

bot.quest(265, {
  "1141": function () { bot.hunt("Chainsaw Sneevil", "faerie", 4); }, // Cardboard Box
});

bot.quest(268, {
  "1144": function () { bot.hunt("Cyclops Raider", "relativity"); }, // Cyclops Door Key
});

bot.quest(269, {
  "1145": function () { bot.hunt("Fire Imp", "relativity", 6); }, // Imp Door Key
});

bot.quest(270, {
  "1146": function () { bot.hunt("Head Gargoyle", "relativity"); }, // Gargoyle Door Key
});

bot.quest(271, {
  "1147": function () { bot.gather(50, "hydra"); bot.gather(51, "hydra"); bot.gather(52, "hydra"); }, // Rune Shard Alepha
  "1158": function () { bot.gather(50, "hydra"); bot.gather(51, "hydra"); bot.gather(52, "hydra"); }, // Rune Shard Betalin
  "1159": function () { bot.gather(50, "hydra"); bot.gather(51, "hydra"); bot.gather(52, "hydra"); }, // Rune Shard Gamilo
});

bot.quest(272, {
  "1178": function () { bot.hunt("Escherion", "escherion", 1, "Boss", "Left"); }, // Defeated Escherion
});
