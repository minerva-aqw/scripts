/// name: Chaos Lords 15 - Extra
/// desc: Dreadhaven extra, quests 3812-3824. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Extra.
// Handler keys are requirement ItemIDs (stable); monster names come
// from the same source, quantities from quest-data.

bot.quest(3812, {});
bot.quest(3813, {});
bot.quest(3814, {});

bot.quest(3815, {
  "55768": function () { bot.hunt("Sir Knight", "falcontower", 3); }, // Enemy Defeated
});

bot.quest(3816, {
  "55768": function () { bot.hunt("Sir Knight", "falcontower", 3); }, // Enemy Defeated
});

bot.quest(3817, {
  "55768": function () { bot.hunt("Sir Knight", "falcontower", 3); }, // Enemy Defeated
});

bot.quest(3818, {
  "55768": function () { bot.hunt("Sir Knight", "falcontower", 3); }, // Enemy Defeated
});

bot.quest(3819, {
  "55768": function () { bot.hunt("Sir Knight", "falcontower", 2); }, // Enemy Defeated
});

bot.quest(3820, {
  "55768": function () { bot.hunt("Sir Knight", "falcontower", 5); }, // Enemy Defeated
});

bot.quest(3821, {
  "26100": function () { bot.hunt("DragonLord", "falcontower"); }, // Dragonlord Defeated
});

bot.quest(3822, {
  "26101": function () { bot.hunt("Dragon Drakath", "falcontower"); }, // Dragon Drakath Defeated
});

bot.quest(3823, {
  "26102": function () { bot.hunt("Sepulchure", "falcontower"); }, // Sepulchure Defeated
});

bot.quest(3824, {
  "26103": function () { bot.hunt("Alteon", "falcontower"); }, // Alteon Defeated
});
