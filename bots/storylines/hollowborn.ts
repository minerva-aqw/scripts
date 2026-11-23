/// name: Hollowborn
/// desc: Hollowborn storyline, quests 8289-9986. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/Hollowborn/CoreHollowbornStory.DoAll.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// Skua's EquipClass calls have no bot equivalent and are skipped.
// 9788 stamps 8564's slot first (Skua's UpdateQuest(8564)).

// Trygve
bot.quest(8289, {
  "63913": function () { bot.hunt("Vindicator Recruit", "trygve", 10); }, // Armor Chunk
});

bot.quest(8290, {
  "63914": function () { bot.hunt("Blood Eagle", "trygve", 9); }, // Blood Eagle Feather
  "63915": function () { bot.gather(9036, "trygve"); }, // Talk to Waelc
});

bot.quest(8291, {
  "63916": function () { bot.hunt("Vindicator Recruit", "trygve", 9); }, // Armor Chunk
  "63917": function () { bot.gather(9037, "trygve"); }, // Talk to Genevieve
});

bot.quest(8292, {
  "63918": function () { bot.hunt("Rune Boar", "trygve", 8); }, // Patch of Boar Hide
  "63919": function () { bot.gather(9038, "trygve"); }, // Talk to Solbiort
});

bot.quest(8293, {
  "63920": function () { bot.gather(9039, "trygve", 3); }, // Statue Examined
  "63921": function () { bot.hunt("Vindicator Recruit", "trygve", 9); }, // Soldiers Pacified
});

bot.quest(8294, {
  "63922": function () { bot.gather(9040, "trygve", 8); }, // Fire Snuffed
});

bot.quest(8295, {
  "63924": function () { bot.hunt("Blood Eagle", "trygve", 9); }, // Eagle Talon
  "63923": function () { bot.hunt("Rune Boar", "trygve", 9); }, // Boar Bone
});

bot.quest(8296, {
  "63925": function () { bot.hunt("Vindicator Recruit", "trygve", 14); }, // Vindicator Defeated
});

bot.quest(8297, {
  "63926": function () { bot.hunt("Blood Eagle", "trygve", 7); }, // Creature Bones
  "63927": function () { bot.hunt("Vindicator Recruit", "trygve", 7); }, // Vindicator Defeated
});

bot.quest(8298, {
  "63928": function () { bot.hunt("Gramiel", "trygve"); }, // Gramiel Defeated
});

// NeoFortress
bot.quest(9281, {
  "78520": function () { bot.gather(11806, "neofortress", 9); }, // Light Extinguished
});

bot.quest(9282, {
  "78521": function () { bot.hunt("Vindicator Recruit", "neofortress", 8); }, // Recruit Dissuaded
});

bot.quest(9283, {
  "78522": function () { bot.hunt("Vindicator Hound", "neofortress", 8); }, // Hounds Defeated
});

bot.quest(9284, {
  "78523": function () { bot.hunt("Vindicator Beast", "neofortress", 8); }, // Vindicator Beast Defeated
});

bot.quest(9285, {
  "78524": function () { bot.hunt("Vindicator Soldier", "neofortress", 5); }, // Cell Key
});

bot.quest(9286, {
  "78525": function () { bot.gather(11807, "neofortress", 5); }, // Prisoner Freed
});

bot.quest(9287, {
  "78526": function () { bot.hunt("Vindicator General", "neofortress"); }, // Vindicator General Defeated
});

bot.quest(9288, {
  "78527": function () { bot.hunt("Vindicator Recruit", "neofortress", 16); }, // Enemies Cleared
});

bot.quest(9289, {
  "78528": function () { bot.hunt("Vindicator General", "neofortress"); }, // Gramiel's Key
});

bot.quest(9290, {
  "78529": function () { bot.gather(11808, "neofortress"); }, // Gramiel's Journal Acquired
});

// ShadowslayerD
bot.quest(9487, {
  "67655": function () { bot.hunt("Sentient Hollow", "hbchallenge", 9); }, // Hollow Essence
});

bot.quest(9488, {
  "67656": function () { bot.hunt("Hollowborn Vampire", "hbchallenge"); }, // Shattered Fang
});

bot.quest(9489, {
  "67657": function () { bot.hunt("Hollowborn Lycan", "hbchallenge"); }, // Chipped Claw
});

// Shadowrealm
bot.quest(9783, {
  "86651": function () { bot.hunt("Undead Guard", "bonecastle"); }, // Piece of Armor
});

bot.quest(9784, {
  "86652": function () { bot.hunt("Sanguine", "lycan"); }, // Armor Fragment
});

bot.quest(9785, {
  "86653": function () { bot.hunt("Rapaxi", "umbral"); }, // Sturdy Armor Piece
});

bot.quest(9786, {
  "86654": function () { bot.hunt("Bone Terror", "battleundera"); }, // Sleek Armor Piece
});

bot.quest(9787, {
  "86655": function () { bot.hunt("Infernal Warrior", "shadowrise", 1, "r15", "Left"); }, // Marred Armor Piece
});

if (!bot.quest(9788).completed()) {
  bot.setQuestValue(450, 9);
  bot.quest(9788, {
    "86656": function () { bot.hunt("Nuckelavee", "dagerecruit"); }, // Rusted Armor Piece
  });
}

bot.quest(9790, {
  "86657": function () { bot.hunt("Underfiend", "darkally", 5); }, // Dented Armor Pieces
});

bot.quest(9791, {
  "86658": function () { bot.hunt("Avatar of Anubyx", "yasaris"); }, // Sandy Armor Piece
});

bot.quest(9792, {
  "86659": function () { bot.hunt("Gorgorath", "wrath"); }, // Final Armor Piece
});

bot.quest(9793, {
  "86660": function () { bot.gather(13314, "greed"); }, // Find the Hollowborn Treasure
});

// NeoTower
bot.quest(9855, {
  "87910": function () { bot.hunt("Dawn Vindicator Soldier", "neotower", 8); }, // Soldier's Notes
});

bot.quest(9856, {
  "87911": function () { bot.hunt("Vindicator Beast", "neotower", 16); }, // Beast Wings
});

bot.quest(9857, {
  "87912": function () { bot.hunt("Vindicator Draconian", "neotower", 10); }, // Draconian Scale
});

bot.quest(9858, {
  "87913": function () { bot.gather(13581, "neotower"); }, // Talk to Zlar
  "87914": function () { bot.hunt("Vindicator Draconian", "neotower"); }, // Tower Key
});

bot.quest(9859, {
  "87915": function () { bot.hunt("Vindicator Assassin", "neotower"); }, // Assassin's Key
});

bot.quest(9860, {
  "87916": function () { bot.hunt("Vindicator BeastTamer", "neotower"); }, // Beast Tamer Cloak
});

bot.quest(9861, {
  "87917": function () { bot.hunt("Vindicator Beast", "neotower", 8); }, // Beast Captured
});

bot.quest(9862, {
  "87918": function () { bot.hunt("Dawn Vindicator Soldier", "neotower", 10); }, // Vindication Emblem
});

bot.quest(9863, {
  "87920": function () { bot.hunt("Dawn Vindicator Soldier", "neotower", 8); }, // Soldier's Grace
  "87919": function () { bot.hunt("Vindicator Beast", "neotower", 8); }, // Beast's Grace
});

bot.quest(9864, {
  "87921": function () { bot.hunt("Vindicator Priest", "neotower"); }, // Vindicator Priest Defeated
});

// DawnSanctum
bot.quest(9977, {
  "89719": function () { bot.hunt("Vindicator Soldier", "dawnsanctum"); }, // Soldier's Key
});

bot.quest(9978, {
  "89720": function () { bot.hunt("Hollowborn Soldier", "dawnsanctum", 6); }, // Hollowborn Soldier Pinned
});

bot.quest(9979, {
  "89721": function () { bot.hunt("Vindicator Recruit", "dawnsanctum", 5); }, // Recruit's Brand
  "89722": function () { bot.gather(13853, "dawnsanctum"); }, // Talk to Genevieve
});

bot.quest(9980, {
  "89723": function () { bot.hunt("Vindicator Hound", "dawnsanctum", 12); }, // Hound's Collar
});

bot.quest(9981, {
  "89724": function () { bot.hunt("Hollowborn Hound", "dawnsanctum", 6); }, // Hollowborn Collar
  "89725": function () { bot.gather(13854, "dawnsanctum"); }, // Read Gramiel's Letter
});

bot.quest(9982, {
  "89726": function () { bot.hunt("Vindicator Draconian", "dawnsanctum", 12); }, // Draconian Fang
});

bot.quest(9983, {
  "89727": function () { bot.hunt("Hollowborn Draconian", "dawnsanctum", 6); }, // Glowing Fang
});

bot.quest(9984, {
  "89728": function () { bot.hunt("Vindicator Draconian", "dawnsanctum", 6); }, // Vindicator Talon
  "89729": function () { bot.hunt("Hollowborn Draconian", "dawnsanctum", 6); }, // Hollowborn Talon
});

bot.quest(9985, {
  "89730": function () { bot.hunt("Grandmaster Gramiel", "dawnsanctum"); }, // Grandmaster's Broken Blade
});

bot.quest(9986, {
  "89731": function () { bot.hunt("Celestial Gramiel", "dawnsanctum"); }, // Celestial Gramiel Defeated
});
