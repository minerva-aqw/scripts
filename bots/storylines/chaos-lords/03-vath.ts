/// name: Chaos Lords 03 - Vath
/// desc: Vath chapter, quests 319-363. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Vath.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 323/343 farm their drops under the preceding quest like Skua does.
// 354 replays the vath cutscene cell and stamps its progress slot
// (Skua's UpdateQuest(354)), then fills via 353 when Thermite is short.

bot.quest(319, {
  "1592": function () { bot.gather(56, "tavern", 7); }, // Sister's Blessing
});

bot.quest(320, {
  "1593": function () { bot.hunt("Pine Grizzly", "pines", 5); }, // Bear Skin
});

bot.quest(321, {
  "1594": function () { bot.hunt("Red Shell Turtle", "pines", 5); }, // Red Turtle Shell
});

bot.quest(322, {
  "1595": function () { bot.hunt("Twistedtooth", "pines"); }, // Chaorrupted Skin
});

bot.quest(324, {
  "1597": function () { bot.hunt("Red Shell Turtle", "pines", 6); }, // Red Shell Spittoon
});

bot.quest(325, {
  "15952": function () { bot.hunt("Pine Grizzly", "pines", 6); }, // Bear Teeth
});

bot.quest(326, {
  "1599": function () { bot.hunt("LeatherWing", "pines", 8); }, // Leatherwing Feathers
});

bot.quest(327, {
  "1600": function () { bot.hunt("Pine Troll", "pines"); bot.pickup(1596); }, // Pine Air Freshener
});

if (!bot.quest(323).completed()) {
  // Snowbeard's Gold is a temp drop (bTemp 1): ensureItem/inventory only
  // read the backpack, so they can never see it. The quest runner reads
  // temp counts itself — one declarative call hunts until held, then
  // turns in. Skua picks the gold up during 327's hunt, so claim there too.
  bot.pickup(1596);
  bot.quest(323, {
    "1596": function () { bot.hunt("Pine Troll", "pines", 10); bot.pickup(1596); }, // Snowbeard's Gold
  });
}

bot.quest(344, {
  "1646": function () { bot.gather(60, "dwarfhold"); }, // Memory Stone
});

bot.quest(331, {
  "1627": function () { bot.hunt("Ore Balboa", "mountainpath", 3); }, // Water Stones
});

bot.quest(332, {
  "1628": function () { bot.hunt("Vultragon", "mountainpath", 6); }, // Vultragon Beak
});

bot.quest(333, {
  "1629": function () { bot.hunt("Chaos Drow", "dwarfhold", 8); }, // Food Pouch
});

bot.quest(334, {
  "1630": function () { bot.hunt("Glow Worm", "dwarfhold", 3); }, // Vials of Glow Ichor
});

bot.quest(335, {
  "1631": function () { bot.hunt("Albino Bat", "dwarfhold", 8); }, // Piles of Bat Guano
});

bot.quest(336, {
  "1632": function () { bot.hunt("Chaotic Draconian", "dwarfhold", 8); }, // Draconian Weapon
});

bot.quest(337, {
  "1633": function () { bot.gather(59, "dwarfhold", 7); }, // Limestones
});

bot.quest(338, {
  "1634": function () { bot.hunt("Chaos Drow", "dwarfhold", 5); }, // Gold Deposits
});

bot.quest(339, {
  "1635": function () { bot.hunt("Chaotic Draconian", "dwarfhold", 6); }, // Chaos Gemeralds
});

bot.quest(340, {
  "1636": function () { bot.hunt("Albino Bat", "dwarfhold"); }, // Block of Talc
});

bot.quest(343, {
  "1641": function () { bot.hunt("Albino Bat", "dwarfhold"); }, // Upper City Key
});

bot.quest(341, {
  "1637": function () { bot.hunt("Amadeus", "dwarfhold"); }, // Key Mold
});

bot.quest(346, {
  "1648": function () { bot.gather(61, "uppercity"); }, // Vath's Plans
});

bot.quest(347, {
  "1649": function () { bot.hunt("Drow Assassin", "uppercity", 6); }, // Assassin Hoods
});

bot.quest(348, {
  "1650": function () { bot.hunt("Chaotic Draconian", "uppercity", 3); }, // Draconian Claws
});

bot.quest(349, {
  "1651": function () { bot.hunt("Chaos Egg", "uppercity", 12); }, // Cracked Egg
});

bot.quest(350, {
  "1652": function () { bot.hunt("Terradactyl", "uppercity"); }, // Terradactyl Wings
});

bot.quest(351, {
  "1654": function () { bot.hunt("Rhino Beetle", "uppercity", 3); }, // Beetle Glands
});

bot.quest(352, {
  "1655": function () { bot.hunt("Cave Lizard", "uppercity"); }, // Lizard Gizzard
});

bot.quest(353, {
  "1695": function () { bot.hunt("Balboa", "dwarfprison", 4); }, // Balboa Core
  "1697": function () { bot.hunt("Chaos Drow", "dwarfprison"); }, // Magnesium Flare
  "1696": function () { bot.hunt("Albino Bat", "dwarfprison", 3); }, // Rusted Claw
});

if (!bot.quest(354).completed()) {
  bot.quest(354).accept();
  bot.travel("vath", "CutCap", "Left");
  bot.setQuestValue(22, 31);
  bot.quest(353, {
    "1695": function () { bot.hunt("Balboa", "dwarfprison", 4); }, // Balboa Core
    "1697": function () { bot.hunt("Chaos Drow", "dwarfprison"); }, // Magnesium Flare
    "1696": function () { bot.hunt("Albino Bat", "dwarfprison", 3); }, // Rusted Claw
  });
  bot.travel("dwarfprison", "Enter", "Right");
  bot.quest(354).turnIn();
}

bot.quest(355, {
  "1699": function () { bot.hunt("Warden Elfis", "dwarfprison"); }, // Elfis' Keyring
});

bot.quest(356, {
  "1700": function () { bot.hunt("Albino Bat", "dwarfprison", 3); }, // Nitrate Elements
  "1701": function () { bot.hunt("Chaos Drow", "dwarfprison", 3); }, // Drow Shoelaces
  "1702": function () { bot.hunt("Balboa", "dwarfprison", 2); }, // Flint Stone
});

bot.quest(357, {});

bot.quest(362, {
  "1753": function () { bot.gather(62, "roc"); }, // Rock Roc Defeated
});

bot.quest(363, {
  "1758": function () { bot.gather(63, "stalagbite"); }, // Defeated Vath
});
