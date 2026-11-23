/// name: Chaos Lords 08 - Tibicenas
/// desc: Tibicenas chapter, quests 930-1005. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Tibicenas.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.

bot.quest(930, {
  "6674": function () { bot.gather(251, "sandport"); }, // Sandsea Port Explored
});

bot.quest(931, {
  "6683": function () { bot.hunt("Sandshark", "sandport", 8); }, // Sandshark Tooth
});

bot.quest(932, {
  "6684": function () { bot.hunt("Tomb Robber", "sandport", 10); }, // Robbed Tomb Robber
});

bot.quest(933, {
  "6685": function () { bot.hunt("Tomb Robber", "sandport", 14); }, // Precious Sandsea Relic
});

bot.quest(934, {
  "29373": function () { bot.hunt("Sell-Sword Leader", "sandport", 1, "r6", "Left"); }, // Horc Sell-Swords Defeated
  "6686": function () { bot.hunt("Horc Sell-Sword", "sandport", 3, "r5", "Left"); }, // Horc Sell-Swords Defeated
});

// Skua's bare UpdateQuest(4614) stamp between the acts.
bot.setQuestValue(97, 15);

bot.quest(967, {
  "6923": function () { bot.hunt("Golden Scarab", "pyramid", 8); }, // Golden Scarab Shell
});

bot.quest(968, {
  "6924": function () { bot.hunt("Anubis Deathguard", "pyramid", 10); }, // Freed Anubis Spirit
});

bot.quest(969, {
  "6925": function () { bot.hunt("Mummy", "pyramid", 7); }, // Triple Ply Mummy Wrap
});

bot.quest(970, {
  "6926": function () { bot.hunt("Golden Scarab", "pyramid", 4); }, // Pharaoh Key Fragment
});

bot.quest(971, {
  "6927": function () { bot.gather(304, "pyramid"); }, // Sek Duat Confronted
});

bot.quest(972, {
  "6965": function () { bot.hunt("Kalestri Worshiper", "wanders", 8, "r2", "Right"); }, // Dark Medallion
});

bot.quest(973, {
  "6967": function () { bot.hunt("Kalestri Hound", "wanders", 10, "r3", "Right"); }, // Hound Defeated
});

bot.quest(974, {
  "6966": function () { bot.hunt("Kalestri Hound", "wanders", 10, "r3", "Right"); }, // Evil Essence
});

bot.quest(975, {
  "6968": function () { bot.hunt("Lotus Spider", "wanders", 6, "r5", "Right"); }, // Spider Defeated
});

bot.quest(976, {
  "6970": function () { bot.gather(306, "wanders"); }, // Chamber Discovered
});

bot.quest(977, {
  "6969": function () { bot.hunt("Lotus Spider", "wanders", 1, "r5", "Right"); }, // Dreamsand
});

bot.quest(978, {
  "6971": function () { bot.hunt("Sek-Duat", "wanders", 1, "Boss", "Left"); }, // Sek-Duat Defeated
});

bot.quest(995, {
  "7142": function () { bot.gather(361, "sandcastle"); }, // Sand Castle Explored
});

bot.quest(996, {
  "7143": function () { bot.hunt("War Hyena", "sandcastle", 10); }, // War Hyena Pelt
});

bot.quest(997, {
  "7144": function () { bot.hunt("War Mummy", "sandcastle"); }, // Zahart's Plans
});

bot.quest(998, {
  "7145": function () { bot.hunt("War Hyena", "sandcastle", 5); }, // Gate Gem
});

bot.quest(999, {
  "7146": function () { bot.hunt("Chaos Sphinx", "sandcastle"); }, // Sphinx Defeated
});

bot.quest(1000, {
  "7177": function () { bot.hunt("Lamia", "djinn", 10); }, // Lamia Snakeskin
});

bot.quest(1001, {
  "7178": function () { bot.hunt("Desert Vase", "sandsea", 5); }, // Freed Air Djinn
});

bot.quest(1002, {
  "7179": function () { bot.hunt("Bupers Camel", "sandsea", 7); }, // Hump of Clay
});

bot.quest(1003, {
  "7180": function () { bot.hunt("Harpy", "djinn", 10); }, // Harpy Feather
});

bot.quest(1004, {
  "7181": function () { bot.gather(370, "djinn", 5); }, // Portal Mist Placed
});

bot.quest(1005, {
  "7182": function () { bot.hunt("Tibicenas", "djinn"); }, // Defeated Tibicenas
});
