/// name: Chaos Lords 05 - Wolfwing
/// desc: Wolfwing chapter, quests 494-598. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Wolfwing.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 514 follows 515 so the axe lands on the floor first, like Skua.
// 597 takes the good path; an already-finished evil end (598) skips it.
// The setQuestValue calls are Skua's UpdateQuest stamps.

bot.quest(494, {
  "2811": function () { bot.gather(97, "darkoviagrave"); }, // Mausoleum Homage
});

bot.quest(495, {
  "2812": function () { bot.hunt("Skeletal Fire Mage", "darkoviagrave", 8); }, // Scorched Metacarpal
});

bot.quest(496, {
  "2813": function () { bot.hunt("Rattlebones", "darkoviagrave", 10); }, // Rattlebone Mandible
});

bot.quest(497, {
  "2814": function () { bot.hunt("Albino Bat", "darkoviagrave", 6); }, // Caged Albino Bat
});

bot.quest(498, {
  "2815": function () { bot.hunt("Blightfang", "darkoviagrave"); }, // Blightfang's Skull
});

bot.quest(308, {
  "1557": function () { bot.hunt("Wolf", "greenguardeast", 6); }, // Wolf Pelts
});

bot.quest(309, {
  "1558": function () { bot.hunt("Slime", "greenguardwest", 6); }, // Jars of Ooze
});

bot.quest(310, {
  "1559": function () { bot.hunt("Frogzard", "greenguardwest", 6); }, // Zard's Teeth
});

bot.quest(311, {
  "1561": function () { bot.hunt("Spider", "greenguardeast", 6); }, // Spider Fangs
});

bot.quest(515, {
  "2885": function () { bot.hunt("Spider", "greenguardeast"); }, // Spider Documentation
  "2886": function () { bot.hunt("Wolf", "greenguardeast"); }, // Wolf Documentation
  "2887": function () { bot.hunt("Slime", "greenguardwest"); }, // Slime Documentation
  "2888": function () { bot.hunt("Frogzard", "greenguardwest"); }, // Frogzard Documentation
  "2889": function () { bot.hunt("Big Bad Boar", "greenguardwest", 1, "West12", "Up"); }, // Wereboar Documentation
});

bot.pickup("Red's Big Wolf Slaying Axe");

bot.quest(514, {
  "2926": function () { bot.hunt("Big Bad Boar", "greenguardwest", 1, "West12", "Up"); }, // Red's Big Wolf Slaying Axe
});

bot.quest(516, {
  "2890": function () { bot.hunt("Dire Wolf", "darkoviaforest", 8); }, // Dire Pelt
});

bot.quest(517, {
  "2891": function () { bot.hunt("Blood Maggot", "darkoviaforest", 3); }, // Vial of Blood
  "2892": function () { bot.hunt("Blood Maggot", "darkoviaforest", 2); }, // Vial of Sweat
  "2893": function () { bot.hunt("Blood Maggot", "darkoviaforest"); }, // Vial of Tears
});

bot.quest(518, {
  "2894": function () { bot.hunt("Lich of the Stone", "darkoviaforest"); }, // Necrompendium
});

bot.quest(519, {
  "2930": function () { bot.hunt("Blood Maggot", "safiria", 8); }, // Maggot's Dentures
});

bot.quest(520, {
  "2931": function () { bot.hunt("Albino Bat", "safiria", 6); }, // Bat Soothed
});

bot.quest(521, {
  "2932": function () { bot.hunt("Chaos Lycan", "safiria", 4); }, // Lycan Ears
});

bot.quest(522, {
  "2933": function () { bot.hunt("Twisted Paw", "safiria"); }, // Twisted Paw's Head
});

bot.quest(534, {
  "3746": function () { bot.hunt("Dire Wolf", "lycan", 6); }, // Hunks of Meat
});

bot.quest(535, {
  "3748": function () { bot.hunt("Lycan Knight", "lycan", 2); }, // Lycan Knight Defeated
  "3747": function () { bot.hunt("Lycan", "lycan", 5); }, // Lycan Defeated
});

bot.quest(536, {
  "3749": function () { bot.hunt("Chaos Vampire Knight", "lycan", 10); }, // Chaos Vampire Defeated
});

bot.quest(537, {
  "3750": function () { bot.hunt("Sanguine", "lycan"); }, // Sanguine Mask
});

bot.quest(552, {});

bot.quest(564, {
  "4786": function () { bot.hunt("Edvard", "lycanwar", 1, "Boss", "Left"); bot.gather(107, "chaoscave"); }, // Chaos Gate Investigation
});

bot.quest(565, {
  "4785": function () { bot.hunt("Werepyre", "chaoscave"); }, // Chaos Gate Key
});

bot.quest(566, {
  "4787": function () { bot.hunt("Werepyre", "chaoscave", 1, "r3", "Left"); }, // Secret Words
});

if (!bot.quest(567).completed()) {
  bot.setQuestValue(26, 22);
  bot.quest(567).accept();
  bot.hunt("DracoWerePyre", "chaoscave", 1, "r5", "Left");
  bot.quest(567).turnIn();
}

if (!bot.quest(598).completed()) {
  bot.align("good");
  bot.setQuestValue(26, 23);
  bot.quest(597, {});
}
