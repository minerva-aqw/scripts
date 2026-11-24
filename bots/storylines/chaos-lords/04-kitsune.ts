/// name: Chaos Lords 04 - Kitsune
/// desc: Kitsune chapter, quests 380-488. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Kitsune.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.

bot.quest(380, {
  "44425": function () { bot.gather(64, "yokaiboat"); }, // Board the Ship
  "44426": function () { bot.hunt("Kappa Ninja", "yokaiboat", 7); }, // Kappa Ninja Slain
});

bot.quest(381, {
  "1993": function () { bot.hunt("*", "yokaiboat", 1, "r4", "Spawn"); }, // Sail Permit
});

bot.quest(382, {
  "2008": function () { bot.hunt("Ryoku", "dragonkoi"); }, // Finalist Medal
});

bot.quest(402, {
  "2222": function () { bot.hunt("Ninja Nopperabo", "hachiko", 5); }, // Ninja Questioned
  "2223": function () { bot.hunt("Samurai Nopperabo", "hachiko", 5); }, // Samurai Questioned
});

bot.quest(403, {
  "2224": function () { bot.hunt("Samurai Nopperabo", "hachiko", 1, "Ox", "Center"); }, // Note from DT
});

bot.quest(405, {
  "2225": function () { bot.hunt("Samurai Nopperabo", "hachiko", 1, "Tiger", "Center"); }, // Rat-Ox-Tiger Piece
  "2226": function () { bot.hunt("Ninja Nopperabo", "hachiko", 1, "Snake", "Center"); }, // Rabbit-Dragon-Snake piece
  "2227": function () { bot.hunt("Samurai Nopperabo", "hachiko", 1, "Horse", "Center"); }, // Horse-Sheep-Monkey piece
  "2228": function () { bot.hunt("Ninja Nopperabo", "hachiko", 1, "Pig", "Center"); }, // Rooster-Dog-Pig Piece
});

bot.quest(406, {
  "2237": function () { bot.hunt("Dai Tengu", "hachiko"); }, // Soldiers Rescued
});

bot.quest(466, {
  "2657": function () { bot.gather(90, "bamboo"); }, // Jinmenju Clue
});

bot.quest(467, {
  "2658": function () { bot.hunt("Tanuki", "bamboo", 5); }, // Jinmenju Fruit Core
  "2659": function () { bot.hunt("Tanuki", "bamboo"); }, // Charred Paper Talisman
});

bot.quest(468, {
  "2660": function () { bot.hunt("SoulTaker", "bamboo"); }, // Jinmenju Fruit Bundle
});

bot.quest(469, {
  "2661": function () { bot.gather(91, "junkyard"); }, // Tsukumo-Gami Tribute
});

bot.quest(470, {
  "2662": function () { bot.hunt("Tsukumo-Gami", "junkyard", 5); }, // Wild Kara-Kasa
  "2663": function () { bot.hunt("Tsukumo-Gami", "junkyard", 4); }, // Wild Bura-Bura
  "2665": function () { bot.hunt("Tsukumo-Gami", "junkyard", 3); }, // Wild Biwa-Bokuboku
  "2666": function () { bot.hunt("Tsukumo-Gami", "junkyard", 2); }, // Wild Koto-Furunushi
  "2667": function () { bot.hunt("Tsukumo-Gami", "junkyard", 1); }, // Wild Bakezouri
});

bot.quest(471, {
  "2668": function () { bot.hunt("Onibaba", "junkyard"); }, // Fresh Liver
});

bot.quest(473, {
  "2689": function () { bot.hunt("Funa-yurei", "yokairiver"); }, // Nori Recipe
  "2691": function () { bot.hunt("Funa-yurei", "yokairiver"); }, // Cucumber Recipe
  "2692": function () { bot.hunt("Funa-yurei", "yokairiver"); }, // Sumeshi Recipe
});

bot.quest(474, {
  "2696": function () { bot.hunt("Kappa Ninja", "yokairiver", 6, "r4", "Left"); bot.gather(92, "yokairiver"); }, // Kappa Maki Roll
});

bot.quest(476, {
  "2697": function () { bot.hunt("Nure Onna", "yokairiver"); }, // Nure Snake Skin
});

bot.quest(477, {
  "2699": function () { bot.hunt("Skello Kitty", "yokaigrave", 10); }, // Skello Kitty Tail
});

bot.quest(478, {
  "2700": function () { bot.hunt("Ninja Nopperabo", "yokaigrave", 4); }, // Ninja Face Mask
  "2701": function () { bot.hunt("Samurai Nopperabo", "yokaigrave", 4); }, // Samurai Face Mask
});

bot.quest(479, {
  "2702": function () { bot.hunt("Neko Mata", "yokaigrave"); }, // Neko Mata Defeated
});

bot.quest(481, {
  "2716": function () { bot.hunt("O-dokuro", "odokuro"); }, // Defeated O-Dokuro
});

bot.quest(484, {
  "2723": function () { bot.hunt("O-Dokuro's Head", "yokaiwar"); }, // O-dokuro's Head Defeated
});

bot.quest(488, {
  "2770": function () { bot.hunt("kitsune", "kitsune"); }, // Defeated Kitsune
});
