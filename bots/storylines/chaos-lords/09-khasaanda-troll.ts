/// name: Chaos Lords 09 - Khasaanda (Troll)
/// desc: Troll path, quests 1226-1468. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.KhasaandaTroll.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 1240 replays the crossroads cutscene cell before turning in.

bot.quest(1226, {
  "8938": function () { bot.hunt("Chinchilizard", "crossroads", 7); bot.gather(523, "bloodtusk"); }, // Scaly Skin Scrub
  "8916": function () { bot.gather(523, "bloodtusk"); }, // Water for Bathing
  "8917": function () { bot.hunt("Trollola Plant", "bloodtusk", 5); }, // Perfumed Trollola Flower
});

bot.quest(1227, {
  "8918": function () { bot.hunt("Lemurphant", "crossroads", 5); }, // Lemurphant Stones
  "8919": function () { bot.hunt("Koalion", "crossroads", 5); }, // Golden Down-Fur
});

bot.quest(1228, {
  "8920": function () { bot.hunt("Crystal-Rock", "bloodtusk", 3); bot.gather(525, "crossroads"); }, // Mountain Crystal
  "8921": function () { bot.hunt("Chinchilizard", "crossroads", 5); }, // Liz-Leather Thongs
  "8922": function () { bot.hunt("Lemurphant", "crossroads", 5); }, // Lemurphant Ivory
});

bot.quest(1229, {
  "8928": function () { bot.hunt("Koalion", "crossroads", 5); }, // Fur for Firestarting
  "8923": function () { bot.gather(521, "crossroads", 10); }, // Trollola Blossoms Gathered
  "8924": function () { bot.hunt("Lemurphant", "crossroads", 5); }, // Lemurphant Musk
  "8925": function () { bot.hunt("Trollola Plant", "bloodtusk", 4); }, // Trollola Plant Resin
});

bot.quest(1230, {});

bot.quest(1231, {
  "8936": function () { bot.gather(524, "crossroads", 10); }, // Jungle Leaves
  "8931": function () { bot.gather(522, "crossroads", 5); }, // Trollola Blossoms
  "8932": function () { bot.hunt("Crystal-Rock", "bloodtusk", 3); }, // Singing Crystals
  "8934": function () { bot.hunt("Koalion", "crossroads", 5); }, // Koalion Claw
  "8935": function () { bot.hunt("Lemurphant", "crossroads", 5); }, // Lemurphant Tusks
});

bot.travel("crossroads", "CutE", "Left");
bot.quest(1240, {});

bot.quest(1272, {});

bot.quest(1274, {
  "9140": function () { bot.gather(553, "ravinetemple"); }, // Resources Gone?!
});

bot.quest(1275, {
  "9141": function () { bot.gather(554, "ravinetemple", 5); }, // Chaorrupted Leaf
  "9142": function () { bot.gather(555, "ravinetemple", 10); }, // Chaorrupted Stone
  "9143": function () { bot.gather(556, "ravinetemple", 10); }, // Chaorrupted Carving
});

bot.quest(1276, {
  "9144": function () { bot.hunt("Temple Guardian", "ravinetemple", 10); }, // Monster Memory
});

bot.quest(1277, {
  "9146": function () { bot.hunt("Temple Guardian", "ravinetemple", 5); }, // Sharpened Bone Stake
  "9147": function () { bot.gather(557, "ravinetemple", 10); }, // Trap Laid
});

bot.quest(1278, {
  "9148": function () { bot.hunt("Temple Guardian", "ravinetemple", 6); }, // Weapons Manufacturing Material
});

bot.quest(1369, {
  "9808": function () { bot.gather(679, "alliance"); bot.gather(680, "alliance"); }, // Tibias Found
  "9783": function () { bot.gather(679, "alliance"); bot.gather(680, "alliance"); }, // Cynari Found
});

bot.quest(1370, {
  "9784": function () { bot.hunt("Good Soldier", "alliance", 6); }, // Good Soldier Vanquished
  "9785": function () { bot.hunt("Evil Soldier", "alliance", 6); }, // Evil Soldier Vanquished
});

bot.quest(1371, {
  "9786": function () { bot.gather(675, "alliance", 10); }, // Trap Primed to Spring
});

bot.quest(1372, {
  "9787": function () { bot.gather(676, "alliance"); }, // Documents Found!
});

bot.quest(1373, {
  "9788": function () { bot.hunt("Chaorrupted Evil Soldier", "alliance", 15); }, // Chaorrupted Alliance Soldier Slain
});

bot.quest(1374, {
  "9789": function () { bot.hunt("General Cynari", "alliance"); }, // Cynari Defeated!
  "9790": function () { bot.hunt("General Tibias", "alliance"); }, // Tibias Defeated!
});

bot.quest(1419, {
  "9948": function () { bot.hunt("Chaotic Vulture", "ancienttemple", 12); }, // Chaorruption Cleansed!
});

bot.quest(1420, {
  "9949": function () { bot.gather(706, "ancienttemple", 7); }, // Ancient Urn
  "9950": function () { bot.hunt("Chaotic Vulture", "ancienttemple", 7); }, // Stolen Urn
});

bot.quest(1421, {
  "9951": function () { bot.hunt("Chaos Troll Spirit", "ancienttemple", 12); }, // Spirit Cleansed
});

bot.quest(1422, {
  "9952": function () { bot.hunt("Serpentress", "ancienttemple", 5); }, // Vial of Venom
});

bot.quest(1423, {
  "9953": function () { bot.gather(707, "ancienttemple"); }, // Plant Poisoned
});

bot.quest(1451, {
  "10136": function () { bot.gather(717, "orecavern"); }, // Darkened Cavern Found!
});

bot.quest(1452, {
  "10137": function () { bot.hunt("Crashroom", "orecavern", 10); }, // Light Orb Recovered
  "10138": function () { bot.gather(719, "orecavern", 5); }, // Light Orb Found
});

bot.quest(1453, {
  "10139": function () { bot.gather(718, "orecavern", 5); }, // Light Orb Placed
});

bot.quest(1454, {
  "10141": function () { bot.hunt("Chaorrupted Evil Soldier", "orecavern", 14); }, // Soldier Incapacitated
});

bot.quest(1455, {
  "10142": function () { bot.hunt("Naga Baas", "orecavern"); }, // Naga Baas Defeated!
});

bot.quest(1464, {
  "10164": function () { bot.gather(734, "dreamnexus"); bot.gather(735, "dreamnexus"); bot.gather(736, "dreamnexus"); bot.gather(737, "dreamnexus"); }, // Island 1 Discovered!
  "10165": function () { bot.gather(734, "dreamnexus"); bot.gather(735, "dreamnexus"); bot.gather(736, "dreamnexus"); bot.gather(737, "dreamnexus"); }, // Island 2 Discovered!
  "10166": function () { bot.gather(734, "dreamnexus"); bot.gather(735, "dreamnexus"); bot.gather(736, "dreamnexus"); bot.gather(737, "dreamnexus"); }, // Island 3 Discovered!
  "10167": function () { bot.gather(734, "dreamnexus"); bot.gather(735, "dreamnexus"); bot.gather(736, "dreamnexus"); bot.gather(737, "dreamnexus"); }, // Central Island Discovered!
});

bot.quest(1465, {
  "10168": function () { bot.hunt("Dark Wyvern", "dreamnexus", 2); }, // Wyvern Scales
  "10169": function () { bot.hunt("Dark Wyvern", "dreamnexus", 2); }, // Wyvern Claws
  "10170": function () { bot.hunt("Aether Serpent", "dreamnexus", 2); }, // Serpent Fangs
  "10171": function () { bot.hunt("Aether Serpent", "dreamnexus", 2); }, // Serpent Hair
});

bot.quest(1466, {
  "10172": function () { bot.gather(739, "dreamnexus", 11); }, // Aether Flame
  "10215": function () { bot.gather(738, "dreamnexus", 10); }, // Aether Petals
});

bot.quest(1467, {
  "10173": function () { bot.hunt("Solar Phoenix", "dreamnexus", 10); }, // Phoenix Tear
  "10174": function () { bot.hunt("Solar Phoenix", "dreamnexus", 5); }, // Phoenix Blood
});

bot.quest(1468, {
  "10175": function () { bot.hunt("Khasaanda", "dreamnexus", 1, "r17a", "Up"); }, // Khasaanda Defeated!
});
