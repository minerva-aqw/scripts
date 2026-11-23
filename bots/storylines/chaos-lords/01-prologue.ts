/// name: Chaos Lords 01 - Prologue
/// desc: Prologue, quests 183-6219. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Prologue.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 195 mirrors Skua's cutscene run (castleundead King2, shadowfall,
// quest-value 43=1); the hero-alignment packet has no bot equivalent.

bot.quest(183, {
  "869": function () { bot.hunt("Skeletal Fire Mage", "battleundera", 4); }, // Defeated Fire Mage
});

bot.quest(176, {
  "828": function () { bot.hunt("Skeletal Soldier", "swordhavenundead", 5); }, // Slain Skeletal Soldier
});

bot.quest(177, {
  "829": function () { bot.hunt("Skeletal Ice Mage", "swordhavenundead", 4); }, // Frozen Bonehead
});

bot.quest(178, {
  "830": function () { bot.hunt("Undead Giant", "swordhavenundead"); }, // Undead Giant's Sword
});

bot.quest(179, {
  "831": function () { bot.gather(38, "castleundead", 5); }, // Knights Talked to
});

bot.quest(180, {
  "832": function () { bot.hunt("Skeletal Viking", "castleundead", 6); }, // Skeleton Skulls
});

bot.travel("castleundead", "King2", "Center");
bot.travel("shadowfall");
bot.setQuestValue(43, 1);
bot.quest(195, {});

bot.quest(196, {
  "900": function () { bot.hunt("Chaorrupted Armor", "chaoscrypt"); }, // Sepulchures Remains
});

bot.quest(6216, {
  "42993": function () { bot.gather(39, "prison", 5); bot.buyItem(1559, 42993); }, // Unlife Insurance Bond
});

bot.quest(6217, {
  "42994": function () { bot.gather(5662, "chaoscrypt"); }, // Speak to Sir Kuss
});

bot.quest(6218, {
  "901": function () { bot.hunt("Chaorrupted Knight", "chaoscrypt", 10); }, // Knight Defeated
});

bot.quest(6219, {
  "42996": function () { bot.hunt("Chaorrupted Bear", "forestchaos"); }, // Chaorrupted Bear Defeated
  "42995": function () { bot.hunt("Chaorrupted Wolf", "forestchaos", 7); }, // Chaorrupted Wolf Defeated
});
