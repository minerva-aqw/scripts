/// name: Chaos Lords 11 - Lionfang
/// desc: Lionfang chapter, quests 2612-2814. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Lionfang.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.

bot.quest(2612, {
  "15707": function () { bot.hunt("Restless Undead", "blackhorn", 5); }, // Undead Searched
});

bot.quest(2613, {
  "15708": function () { bot.gather(1615, "blackhorn", 10); }, // Tomb Shattered
});

bot.quest(2614, {
  "15709": function () { bot.hunt("Tomb Spider", "blackhorn", 6); }, // Spider Silk
});

bot.quest(2615, {
  "15712": function () { bot.gather(1616, "blackhorn"); }, // Glass Bottle
  "15710": function () { bot.hunt("Restless Undead", "blackhorn", 3); }, // Scrap Of Cloth
  "15711": function () { bot.hunt("Tomb Spider", "blackhorn", 3); }, // Gas Bladder
});

bot.quest(2616, {
  "15713": function () { bot.gather(1617, "blackhorn"); }, // Wall Destroyed
});

bot.quest(2617, {
  "15714": function () { bot.hunt("Bonefeeder Spider", "blackhorn"); }, // Bonefeeder Defeated
});

bot.quest(2618, {
  "15715": function () { bot.gather(1618, "blackhorn"); }, // Tomb Room Searched
});

bot.quest(2619, {
  "15716": function () { bot.hunt("Tomb Spider", "blackhorn", 4); }, // Spider Venom
});

bot.quest(2620, {
  "15717": function () { bot.hunt("Restless Undead", "blackhorn", 6); }, // Undead Fungus
});

bot.quest(2621, {
  "15718": function () { bot.gather(1619, "blackhorn"); }, // Darkblood Scroll
});

bot.quest(2622, {
  "15752": function () { bot.gather(1620, "onslaughttower"); bot.gather(1621, "onslaughttower"); bot.gather(1622, "onslaughttower"); bot.gather(1623, "onslaughttower"); }, // Library Searched
  "15753": function () { bot.gather(1620, "onslaughttower"); bot.gather(1621, "onslaughttower"); bot.gather(1622, "onslaughttower"); bot.gather(1623, "onslaughttower"); }, // Torture Room Searched
  "15754": function () { bot.gather(1620, "onslaughttower"); bot.gather(1621, "onslaughttower"); bot.gather(1622, "onslaughttower"); bot.gather(1623, "onslaughttower"); }, // Music Room Searched
  "15751": function () { bot.gather(1620, "onslaughttower"); bot.gather(1621, "onslaughttower"); bot.gather(1622, "onslaughttower"); bot.gather(1623, "onslaughttower"); }, // Mess-Hall Searched
});

bot.quest(2623, {
  "15755": function () { bot.hunt("Golden Caster", "onslaughttower", 8); }, // Soldiers Searched
});

bot.quest(2624, {
  "15756": function () { bot.hunt("Golden Caster", "onslaughttower", 4); }, // Amulet of Protection
});

bot.quest(2625, {
  "15757": function () { bot.gather(1624, "onslaughttower", 8); }, // Alchemical Reagent
});

bot.quest(2626, {
  "15758": function () { bot.gather(1625, "onslaughttower"); }, // Get Enchanted
});

bot.quest(2627, {
  "15759": function () { bot.gather(1626, "onslaughttower", 4); }, // Amulet Placed
});

bot.quest(2628, {
  "15760": function () { bot.hunt("Golden Caster", "onslaughttower", 6); }, // Knight Searched
});

bot.quest(2629, {
  "15761": function () { bot.gather(1627, "onslaughttower"); }, // Dungeon Key Found
});

bot.quest(2630, {
  "15762": function () { bot.hunt("Maximillian Lionfang", "onslaughttower"); }, // Lionfang Defeated
});

bot.quest(2666, {
  "15884": function () { bot.hunt("Chaonslaught Caster", "falguard", 8); }, // Soldiers Defeated
});

bot.quest(2667, {
  "15885": function () { bot.gather(1628, "falguard", 6); }, // Knowledge Secured
});

bot.quest(2668, {
  "15886": function () { bot.hunt("Chaonslaught Warrior", "falguard", 2); }, // Chaonslaught Shield
  "15887": function () { bot.hunt("Chaonslaught Cavalry", "falguard", 3); }, // Chaonslaught Sword
});

bot.quest(2669, {
  "15888": function () { bot.gather(1629, "falguard"); }, // Weapons Delivered
});

bot.quest(2670, {
  "15889": function () { bot.hunt("Chaonslaught Warrior", "falguard", 5); }, // Chaorupted Armor Scrap
});

bot.quest(2671, {
  "15890": function () { bot.gather(1630, "falguard"); }, // Scraps Delivered
});

bot.quest(2672, {
  "15891": function () { bot.gather(1631, "falguard"); }, // Inn Cleared
});

bot.quest(2673, {
  "15892": function () { bot.hunt("Chaonslaught Caster", "falguard", 10); }, // Spellswords Silenced
});

bot.quest(2674, {
  "15893": function () { bot.gather(1632, "falguard"); }, // Darkblood Runestone
});

bot.quest(2675, {
  "15894": function () { bot.hunt("Primarch", "falguard"); }, // Enemy Defeated
});

bot.quest(2720, {
  "16439": function () { bot.hunt("Rotting Darkblood", "deathpits", 3); }, // Rotting Defeated
});

bot.quest(2721, {
  "16440": function () { bot.gather(1691, "deathpits", 5); }, // Glowing Mushroom
});

bot.quest(2722, {
  "16441": function () { bot.hunt("Rotting Darkblood", "deathpits", 10); }, // Rotten Rib Bones
});

bot.quest(2723, {
  "16442": function () { bot.hunt("Rotting Darkblood", "deathpits"); }, // Intact Skull
});

bot.quest(2724, {
  "16443": function () { bot.hunt("Ghastly Darkblood", "deathpits", 4); }, // Ghastly Defeated
});

bot.quest(2725, {
  "16444": function () { bot.hunt("Ghastly Darkblood", "deathpits"); }, // Old Map Found
});

bot.quest(2726, {
  "16445": function () { bot.gather(1692, "deathpits", 6); }, // Runes In Place
});

bot.quest(2727, {
  "16447": function () { bot.hunt("Rotting Darkblood", "deathpits", 3); }, // Rotting Defeated
});

bot.quest(2728, {
  "16446": function () { bot.hunt("Ghastly Darkblood", "deathpits", 3); }, // Ghastly Defeated
});

bot.quest(2729, {
  "16448": function () { bot.hunt("Sundered Darkblood", "deathpits", 5); }, // Sundered Defeated
});

bot.quest(2730, {
  "16449": function () { bot.gather(1693, "deathpits", 9); }, // Rotstone Ore
});

bot.quest(2731, {
  "16450": function () { bot.hunt("Sundered Darkblood", "deathpits"); }, // Primarch Mace
  "16451": function () { bot.hunt("Rotting Darkblood", "deathpits"); }, // Primarch Trident
  "16452": function () { bot.hunt("Ghastly Darkblood", "deathpits"); }, // Primarch Spear
});

bot.quest(2732, {
  "16453": function () { bot.gather(1694, "deathpits", 12); }, // Bones Burned
});

bot.quest(2740, {
  "16454": function () { bot.hunt("Wrathful Vestis", "deathpits"); }, // Vestis Defeated
  "16455": function () { bot.gather(1695, "deathpits"); }, // Tears Of The Mother
});

bot.quest(2792, {
  "16713": function () { bot.gather(1724, "venomvaults"); }, // Vaults Explored
});

bot.quest(2793, {
  "16714": function () { bot.hunt("Chaonslaught Warrior", "venomvaults", 3); }, // Warriors defeated
});

bot.quest(2794, {
  "16715": function () { bot.gather(1725, "venomvaults"); }, // Journal Found
});

bot.quest(2796, {
  "16716": function () { bot.gather(1726, "venomvaults"); }, // Recipe Found
});

bot.quest(2797, {
  "16717": function () { bot.hunt("Chaonslaught Caster", "venomvaults", 4); }, // Mages Defeated
});

bot.quest(2798, {
  "16718": function () { bot.gather(1727, "venomvaults", 5); }, // Venom Rose
});

bot.quest(2799, {
  "16719": function () { bot.hunt("Chaonslaught Caster", "venomvaults", 3); }, // Spell Pouch
});

bot.quest(2800, {
  "16720": function () { bot.hunt("Chaonslaught Warrior", "venomvaults"); }, // Potion Vial
});

bot.quest(2801, {
  "16721": function () { bot.hunt("Chaonslaught Caster", "venomvaults"); }, // Heating Element
});

bot.quest(2802, {
  "16722": function () { bot.gather(1728, "venomvaults", 3); }, // AntiVenom Placed
});

bot.quest(2803, {
  "16723": function () { bot.hunt("Chaonslaught Caster", "venomvaults"); }, // Courtyard Key
});

bot.quest(2804, {
  "16724": function () { bot.hunt("Manticore", "venomvaults"); }, // Manticore Defeated
});

bot.quest(2805, {
  "16782": function () { bot.gather(1729, "stormtemple", 4); }, // Lightning Sample
});

bot.quest(2806, {
  "16783": function () { bot.hunt("*", "stormtemple", 1, "r1", "Left"); }, // Lightning Boots
});

bot.quest(2807, {
  "16784": function () { bot.hunt("Chaonslaught Caster", "stormtemple", 6); }, // Guards Defeated
});

bot.quest(2808, {
  "16785": function () { bot.hunt("Chaonslaught Caster", "stormtemple"); }, // Lightning Key
});

bot.quest(2809, {
  "16786": function () { bot.gather(1730, "stormtemple", 3); }, // Cloud Matter
});

bot.quest(2810, {
  "16787": function () { bot.hunt("Chaonslaught Caster", "stormtemple", 4); }, // Storm Bottle
});

bot.quest(2811, {
  "16788": function () { bot.gather(1731, "stormtemple"); }, // Bursted Barrier
});

bot.quest(2812, {
  "16789": function () { bot.hunt("Chaonslaught Cavalry", "stormtemple", 5); }, // Chaos Lance
});

bot.quest(2813, {
  "16790": function () { bot.gather(1732, "stormtemple"); }, // Bursted Barrier
});

bot.quest(2814, {
  "16791": function () { bot.hunt("Chaos Lord Lionfang", "stormtemple"); }, // Lionfang Defeated
});
