/// name: Chaos Lords 07 - Ledgermayne
/// desc: Ledgermayne chapter, quests 805-847. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Ledgermayne.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 846 stamps 847's progress slot first (Skua's UpdateQuest(847)).
// 847 cannot walk the zone mechanic (no bot walk verb); the hunt seats
// the cell and the rotation fights what is there.

bot.quest(805, {
  "5600": function () { bot.gather(139, "arcangrove"); }, // Arcangrove Info
});

bot.quest(806, {
  "5622": function () { bot.gather(142, "cloister"); }, // Found Ewa
});

bot.quest(807, {
  "5601": function () { bot.gather(140, "cloister"); }, // LifeRoot
});

bot.quest(808, {
  "5602": function () { bot.hunt("Acornent", "cloister", 10); }, // Acornent Shell
});

bot.quest(809, {
  "5603": function () { bot.hunt("Karasu", "cloister", 8); }, // Cloister Fruit Bundle
});

bot.quest(810, {
  "5572": function () { bot.sellItem(43280); bot.travel("embersea"); bot.buyItem(1100, 5572); }, // Mana Potion
  "5604": function () { bot.gather(141, "cloister", 3); }, // Revived Bough
});

bot.quest(811, {
  "5621": function () { bot.hunt("Wendigo", "cloister"); }, // Defeated Wendigo
});

bot.quest(813, {
  "5623": function () { bot.gather(143, "mudluk"); }, // Found Paddylump
});

bot.quest(814, {
  "5624": function () { bot.hunt("Swamp Lurker", "mudluk", 10); }, // Swamp Lurker Tooth
});

bot.quest(815, {
  "5625": function () { bot.hunt("Swamp Lurker", "mudluk", 5); }, // Slimy Skin
});

bot.quest(816, {
  "5626": function () { bot.hunt("Gorillaphant", "arcangrove", 12); }, // HUGE flea
});

bot.quest(817, {
  "5627": function () { bot.hunt("Swamp Frogdrake", "mudluk", 12); }, // Slain Frogdrake
});

bot.quest(818, {
  "5628": function () { bot.hunt("Tiger Leech", "mudluk"); }, // Rod of Defiance
});

bot.quest(825, {
  "5710": function () { bot.gather(144, "natatorium"); }, // Nisse Found
});

bot.quest(826, {
  "5711": function () { bot.gather(145, "natatorium", 12); }, // Chaorrupted Coral
});

bot.quest(827, {
  "5712": function () { bot.hunt("Anglerfish", "natatorium", 20); }, // Angler Filet
});

bot.quest(828, {
  "5713": function () { bot.hunt("Merdraconian", "natatorium", 12); }, // Rescued Merfolk
});

bot.quest(829, {
  "5717": function () { bot.hunt("Seed Spitter", "arcangrove", 5); }, // Brain Coral
  "5718": function () { bot.hunt("Acornent", "cloister", 4); }, // Staghorns
  "5719": function () { bot.hunt("Karasu", "cloister", 3); }, // Sea Fan
  "5720": function () { bot.hunt("Wendigo", "cloister"); }, // Sea Whip
  "5721": function () { bot.hunt("Swamp Frogdrake", "mudluk", 6); }, // Anemones
});

bot.quest(830, {
  "5722": function () { bot.hunt("Nessie", "natatorium"); }, // Defeated Nessie
});

bot.quest(831, {
  "5729": function () { bot.gather(146, "gilead"); }, // Umbra Found
});

bot.quest(832, {
  "5730": function () { bot.hunt("Earth Elemental", "gilead", 5); }, // Dregs Essence
  "5731": function () { bot.hunt("Seed Spitter", "arcangrove", 4); }, // Spitter Spirit
});

bot.quest(833, {
  "5732": function () { bot.hunt("Water Elemental", "gilead", 5); }, // Aqueous Essence
  "5733": function () { bot.hunt("Merdraconian", "natatorium", 6); }, // MerCore
});

bot.quest(834, {
  "5734": function () { bot.hunt("Wind Elemental", "gilead", 5); }, // Welkin Essence
  "5735": function () { bot.hunt("Karasu", "cloister", 5); }, // Karasu Soul
});

bot.quest(835, {
  "5736": function () { bot.hunt("Fire Elemental", "gilead", 5); }, // Pyre Essence
  "5737": function () { bot.hunt("Swamp Frogdrake", "mudluk", 5); }, // Fire Salamander
});

bot.quest(836, {
  "5738": function () { bot.hunt("Mana Elemental", "gilead"); }, // Defeated Mana Elemental
});

bot.quest(838, {
  "5780": function () { bot.gather(147, "mafic"); }, // Felsic Found
});

bot.quest(839, {
  "5781": function () { bot.hunt("Volcanic Maggot", "mafic", 8); }, // Volcanic Maggot Slain
});

bot.quest(840, {
  "5782": function () { bot.hunt("Scoria Serpent", "mafic", 5); }, // Captured Alpha Serpent
});

bot.quest(841, {
  "5783": function () { bot.hunt("Living Fire", "mafic", 10); }, // Extinguished Living Fire
});

bot.quest(842, {
  "5784": function () { bot.hunt("Mafic Dragon", "mafic"); }, // Mafic Dragon Defeated!
});

bot.quest(843, {
  "6122": function () { bot.hunt("Mana Imp", "elemental", 8); }, // Captured Mana Imps
});

bot.quest(844, {
  "6123": function () { bot.hunt("Mana Falcon", "elemental", 5); }, // Astral Feather
});

bot.quest(845, {
  "6128": function () { bot.hunt("Mafic Dragon", "mafic"); }, // Astral Orb of Mafic
  "6124": function () { bot.hunt("Wendigo", "cloister"); }, // Astral Orb of the Cloister
  "6125": function () { bot.hunt("Tiger Leech", "mudluk"); }, // Astral Orb of Mudluk
  "6126": function () { bot.hunt("Nessie", "natatorium"); }, // Astral Orb of Natatorium
  "6127": function () { bot.hunt("Mana Elemental", "gilead"); }, // Astral Orb of Gilead
});

bot.quest(846, {
  "6129": function () { bot.setQuestValue(32, 35); bot.hunt("Mana Golem", "elemental"); }, // Mana Golem Defeated
});

bot.quest(847, {
  "6239": function () { bot.hunt("Ledgermayne", "ledgermayne"); }, // Ledgermayne Defeated
});
