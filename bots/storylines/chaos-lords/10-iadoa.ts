/// name: Chaos Lords 10 - Iadoa
/// desc: Iadoa chapter, quests 2239-2521. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Iadoa.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 2504 fills without turning in, like Skua's GetReward:false.
// 2519 skips the Dragonoid of Hours gear farm (no bot equip verb).
// 2520-2521 and 2388 need membership, like Skua's IsMember gate.

bot.quest(2239, {
  "13232": function () { bot.gather(1358, "thespan"); bot.gather(1359, "thespan"); bot.gather(1360, "thespan"); bot.gather(1361, "thespan"); bot.gather(1362, "thespan"); bot.gather(1363, "thespan"); }, // Tek's Notes
  "13233": function () { bot.gather(1358, "thespan"); bot.gather(1359, "thespan"); bot.gather(1360, "thespan"); bot.gather(1361, "thespan"); bot.gather(1362, "thespan"); bot.gather(1363, "thespan"); }, // Warlic's Notes
  "13234": function () { bot.gather(1358, "thespan"); bot.gather(1359, "thespan"); bot.gather(1360, "thespan"); bot.gather(1361, "thespan"); bot.gather(1362, "thespan"); bot.gather(1363, "thespan"); }, // Mince's Notes
  "13235": function () { bot.gather(1358, "thespan"); bot.gather(1359, "thespan"); bot.gather(1360, "thespan"); bot.gather(1361, "thespan"); bot.gather(1362, "thespan"); bot.gather(1363, "thespan"); }, // Orb's Notes
  "13230": function () { bot.gather(1358, "thespan"); bot.gather(1359, "thespan"); bot.gather(1360, "thespan"); bot.gather(1361, "thespan"); bot.gather(1362, "thespan"); bot.gather(1363, "thespan"); }, // Bulbug's Notes
  "13231": function () { bot.gather(1358, "thespan"); bot.gather(1359, "thespan"); bot.gather(1360, "thespan"); bot.gather(1361, "thespan"); bot.gather(1362, "thespan"); bot.gather(1363, "thespan"); }, // Lucretia's Notes
});

bot.quest(2240, {
  "13236": function () { bot.hunt("Sneak", "timelibrary"); }, // AQ Dimension Key
  "13237": function () { bot.hunt("Tog", "timelibrary"); }, // DF Dimension Key
  "13238": function () { bot.hunt("Shadowscythe", "timelibrary"); }, // MQ Dimension Key
});

bot.quest(2241, {
  "13240": function () { bot.hunt("Moglin Ghost", "timelibrary"); }, // Necromancy in AQ Knowledge
  "13241": function () { bot.gather(1365, "timelibrary", 3); }, // Ruby-red Eye Shard
  "13239": function () { bot.hunt("Undead Knight", "timelibrary", 6); }, // Tales of Planet-Peril Page
});

bot.quest(2242, {
  "13248": function () { bot.hunt("Tog", "timelibrary", 6); }, // "Draconic Prophecy" Page
  "13249": function () { bot.gather(1366, "timelibrary", 2); }, // Bony Claw
  "13242": function () { bot.hunt("Tog", "timelibrary", 8); }, // Elemental Orb Knowledge
});

bot.quest(2243, {
  "13250": function () { bot.hunt("Shadowscythe", "timelibrary", 7); }, // Shadowscythe Combat Strategy
  "13251": function () { bot.hunt("Training Globe", "timelibrary"); }, // Galactic Hypertron Engines: A Primer
  "13252": function () { bot.gather(1367, "timelibrary"); }, // Mysterious Mirror
});

bot.quest(2244, {
  "13256": function () { bot.gather(1368, "timelibrary"); }, // Chaos Eye
  "13253": function () { bot.hunt("Queen's Recruit", "timelibrary", 3); }, // The Future is Now
  "13254": function () { bot.hunt("Queen's Recruit", "timelibrary", 2); }, // Past Failures Brought Us Here
  "13255": function () { bot.hunt("Queen's Knight", "timelibrary", 2); }, // Princess Freed... but for what?
});

bot.quest(2253, {
  "13467": function () { bot.hunt("Ephemerite", "timevoid", 9); }, // Ephemeral Dust
});

bot.quest(2254, {
  "13468": function () { bot.gather(1438, "timevoid", 16); }, // Fallen Fairy Wings
  "13469": function () { bot.hunt("Time-Travel Fairy", "timevoid", 4); }, // Exaglass
  "13470": function () { bot.hunt("Time-Travel Fairy", "timevoid", 8); }, // Fairy Plasma
});

bot.quest(2255, {
  "13472": function () { bot.gather(1439, "timevoid", 12); }, // Pre-Solar Scales
  "13467": function () { bot.hunt("Ephemerite", "timevoid", 4); }, // Ephemeral Dust
  "13470": function () { bot.hunt("Time-Travel Fairy", "timevoid", 4); }, // Fairy Plasma
});

bot.quest(2256, {
  "13480": function () { bot.hunt("Time-Travel Fairy", "timevoid", 6); }, // Powdered Fairy Wings
  "13474": function () { bot.hunt("Void Phoenix", "timevoid", 6); }, // Dried Phoenix Tears
});

bot.quest(2257, {
  "13475": function () { bot.gather(1440, "timevoid"); bot.gather(1441, "timevoid"); bot.gather(1442, "timevoid"); bot.gather(1443, "timevoid"); }, // North Glass Turned
  "13476": function () { bot.gather(1440, "timevoid"); bot.gather(1441, "timevoid"); bot.gather(1442, "timevoid"); bot.gather(1443, "timevoid"); }, // South Glass Turned
  "13477": function () { bot.gather(1440, "timevoid"); bot.gather(1441, "timevoid"); bot.gather(1442, "timevoid"); bot.gather(1443, "timevoid"); }, // East Glass Turned
  "13478": function () { bot.gather(1440, "timevoid"); bot.gather(1441, "timevoid"); bot.gather(1442, "timevoid"); bot.gather(1443, "timevoid"); }, // West Glass Turned
});

bot.quest(2258, {
  "13479": function () { bot.hunt("Unending Avatar", "timevoid"); }, // Avatar Slain
});

bot.quest(2376, {
  "13689": function () { bot.gather(1467, "aqlesson"); }, // Orb Located
});

bot.quest(2377, {
  "13690": function () { bot.hunt("Ninja", "aqlesson", 9); }, // Obstacle Obliterated
});

bot.quest(2378, {
  "13692": function () { bot.gather(1469, "aqlesson"); bot.gather(1468, "aqlesson", 8); }, // Tome of Hope Read
  "13691": function () { bot.gather(1468, "aqlesson", 8); bot.gather(1469, "aqlesson"); }, // Elemental Orb Located
});

bot.quest(2379, {
  "13696": function () { bot.hunt("Eternite Ore", "aqlesson", 3); }, // TimeSpark Acquired
  "13693": function () { bot.gather(1470, "aqlesson", 3); }, // Shadows Acquired
  "13694": function () { bot.gather(1471, "aqlesson", 3); }, // Light of Hope Acquired
  "13695": function () { bot.hunt("Water Elemental", "aqlesson", 3); }, // Tears of Joy Acquired
});

bot.quest(2380, {
  "13697": function () { bot.hunt("Ice Elemental", "aqlesson", 3); }, // Frigid Liquid Acquired
  "13698": function () { bot.hunt("Fire Elemental", "aqlesson", 3); }, // Heart of Lava Acquired
  "13699": function () { bot.gather(1473, "aqlesson", 3); bot.gather(1472, "aqlesson", 3); }, // Adamantite Acquired
  "13700": function () { bot.gather(1472, "aqlesson", 3); bot.gather(1473, "aqlesson", 3); }, // Balanced Breeze Acquired
});

bot.quest(2381, {
  "13701": function () { bot.hunt("Void Dragon", "aqlesson", 3); }, // Void Dragon Slain
});

bot.quest(2382, {
  "13703": function () { bot.hunt("Firezard", "aqlesson", 6); }, // Fire Orb Shard Regained
});

bot.quest(2383, {
  "13704": function () { bot.hunt("Ice Elemental", "aqlesson"); }, // Ice Scythe Acquired!
});

bot.quest(2384, {
  "13705": function () { bot.gather(1474, "thespan"); }, // Tek Forged the Ice Claymore!
});

bot.quest(2385, {
  "13706": function () { bot.hunt("Akriloth", "aqlesson"); }, // Akriloth Slain!
});

bot.quest(2386, {
  "13707": function () { bot.hunt("Carnax", "aqlesson"); }, // Carnax Slain!
});

bot.quest(2470, {
  "14660": function () { bot.gather(1549, "dflesson", 8); }, // Elemental Orb
});

bot.quest(2471, {
  "14661": function () { bot.hunt("Fire Elemental", "dflesson", 8); }, // Slain Flame Elemental
  "14662": function () { bot.hunt("Fire Elemental", "dflesson", 4); }, // Chaos Gemerald
});

bot.quest(2472, {
  "14664": function () { bot.hunt("Lava Slime", "dflesson", 5); }, // Slain Slime
  "14665": function () { bot.hunt("Fire Elemental", "dflesson"); }, // Blue Clue
  "14663": function () { bot.hunt("Fire Elemental", "dflesson", 6); }, // Slain Elemental
});

bot.quest(2473, {
  "14666": function () { bot.hunt("Tog", "dflesson", 4); }, // Life AND the Universe
  "14667": function () { bot.hunt("Agitated Orb", "dflesson", 5); }, // Everything
  "14668": function () { bot.hunt("Agitated Orb", "dflesson", 3); }, // Hoopy Frood's Towel
});

bot.quest(2474, {
  "14669": function () { bot.hunt("Vultragon", "dflesson"); }, // Chaorrupted Dragon Egg
});

bot.quest(2475, {
  "14670": function () { bot.hunt("Chaos Sp-Eye", "dflesson", 5); }, // Blinded Sp-Eyes
});

bot.quest(2476, {
  "14671": function () { bot.hunt("Chaorrupted Evil Soldier", "dflesson", 8); }, // Smashed Skeletons
});

bot.quest(2477, {
  "14672": function () { bot.hunt("Lava Golem", "dflesson", 6); }, // Golem Crushed
  "14673": function () { bot.hunt("Fire Elemental", "dflesson", 3); }, // Elemental Eliminated
});

bot.quest(2478, {
  "14674": function () { bot.hunt("Chaotic Horcboar", "dflesson"); }, // Hero Protein
  "14675": function () { bot.hunt("Chaotic Chicken", "dflesson", 8); }, // Spell Rune
});

bot.quest(2479, {
  "14676": function () { bot.hunt("Fluffy the Dracolich", "dflesson"); }, // Fluffy Finished
});

bot.quest(2504, {
  "15015": function () { bot.gather(1580, "mqlesson"); }, // Rocket on your Back
}, { turnIn: false });

bot.quest(2505, {
  "15016": function () { bot.hunt("Asteroid", "mqlesson", 3); }, // Iadoa's Mind Fragments
});

bot.quest(2506, {
  "15017": function () { bot.gather(1581, "mqlesson", 5); }, // Beacon in Place
});

bot.quest(2507, {
  "15018": function () { bot.hunt("MystRaven Student", "mqlesson", 8); }, // Shadowscythe Emblem
});

bot.quest(2508, {
  "15019": function () { bot.hunt("Training Globe", "mqlesson", 10); }, // Training Globe Defeated
});

bot.quest(2509, {
  "15020": function () { bot.hunt("MystRaven Student", "mqlesson"); }, // Worsh's Motto
});

bot.quest(2510, {
  "15021": function () { bot.hunt("Chaos Shadowscythe", "mqlesson", 3); }, // Lecture Pages
});

bot.quest(2511, {
  "15022": function () { bot.hunt("Chaos Shadowscythe", "mqlesson"); }, // Truth Glasses
  "15023": function () { bot.hunt("Chaos Shadowscythe", "mqlesson", 13); }, // Darkness Destroyed
});

bot.quest(2512, {
  "15024": function () { bot.hunt("Dragonoid", "mqlesson"); }, // Dragonoid Defeated
});

bot.quest(2513, {
  "15165": function () { bot.hunt("Chaotic Merdrac", "deepchaos", 5); }, // Spy Slain
});

bot.quest(2515, {
  "15166": function () { bot.hunt("Chaos Angler", "deepchaos", 7); }, // Sanity Lure
});

bot.quest(2516, {
  "15169": function () { bot.gather(1582, "deepchaos", 3); }, // Nightmare Pipe
});

bot.quest(2517, {
  "15167": function () { bot.hunt("Kathool", "deepchaos"); }, // Kathool Defeated
});

bot.quest(2518, {
  "15168": function () { bot.hunt("Astral Ephemerite", "timespace", 6); }, // Star Death
});

bot.quest(2519, {
  "15170": function () { bot.hunt("Chaos Lord Iadoa", "timespace"); }, // Iadoa Defeated
});

const member = bot.me().upgraded === true;

if (member) {
  bot.quest(2520, {
    "15171": function () { bot.hunt("Ultra Kathool", "ultravoid"); }, // Ultra Kathool Defeated
  });

  bot.quest(2521, {
    "15172": function () { bot.hunt("Ultra Iadoa", "ultravoid"); }, // Ultra Iadoa Defeated
  });

  bot.quest(2388, {
    "13715": function () { bot.hunt("Ultra-Carnax", "ultracarnax"); }, // Ultra Carnax Slain!
  });
}
