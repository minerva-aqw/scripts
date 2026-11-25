/// name: Elegy of Madness 05 - Eridani Past
/// desc: Eridani Past chapter, quests 8521-8530. Skips completed quests, so re-runs resume where they left off.

bot.travel("eridanipast");

bot.quest(8521, {
  "68187": () => bot.gather(9681, "eridanipast"),
});

bot.quest(8522, {
  "68188": () => bot.hunt("Bandit", "eridanipast", 7),
  "68189": () => bot.hunt("Dog", "eridanipast", 7),
});

bot.quest(8523, {
  "68190": () => bot.gather(9676, "eridanipast", 8),
});

bot.quest(8524, {
  "68191": () => bot.hunt("Bandit", "eridanipast", 8),
});

bot.quest(8525, {
  "68192": () => bot.hunt("Bat", "eridanipast", 8),
  "68193": () => bot.gather(9677, "eridanipast"),
});

bot.quest(8526, {
  "68194": () => bot.gather(9678, "eridanipast"),
  "68195": () => bot.gather(9679, "eridanipast"),
});

bot.quest(8527, {
  "68196": () => bot.hunt("Bat", "eridanipast", 8),
  "68197": () => bot.hunt("Dog", "eridanipast", 8),
});

bot.quest(8528, {
  "68198": () => bot.hunt("Bandit", "eridanipast", 8),
});

bot.quest(8529, {
  "68199": () => bot.hunt("Suki", "eridanipast"),
});

bot.quest(8530, {
  "68200": () => bot.gather(9680, "eridanipast"),
  "68201": () => bot.hunt("Bandit", "eridanipast", 7),
});
