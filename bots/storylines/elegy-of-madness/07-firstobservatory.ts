/// name: Elegy of Madness 07 - First Observatory
/// desc: First Observatory chapter, quests 8630-8641. Skips completed quests, so re-runs resume where they left off.

bot.travel("firstobservatory");

bot.quest(8630, {
  "69738": () => bot.gather(10083, "firstobservatory"),
});

bot.quest(8631, {
  "69739": () => bot.hunt("Astra Scorpio", "firstobservatory", 8),
});

bot.quest(8632, {
  "69740": () => bot.hunt("Astra Leo", "firstobservatory", 8),
});

bot.quest(8633, {
  "69741": () => bot.gather(10084, "firstobservatory"),
  "69742": () => bot.hunt("Ancient Turret", "firstobservatory", 8),
});

bot.quest(8634, {
  "69743": () => bot.gather(10085, "firstobservatory"),
});

bot.quest(8635, {
  "69744": () => bot.hunt("Ancient Creature", "firstobservatory", 8),
});

bot.quest(8636, {
  "69745": () => bot.gather(10086, "firstobservatory"),
  "69746": () => bot.gather(10087, "firstobservatory"),
});

bot.quest(8637, {
  "69755": () => bot.hunt("Ancient Turret", "firstobservatory", 5),
  "69747": () => bot.hunt("Ancient Creature", "firstobservatory", 5),
});

bot.quest(8638, {
  "69748": () => bot.gather(10088, "firstobservatory"),
  "69749": () => bot.gather(10089, "firstobservatory"),
});

bot.quest(8639, {
  "69756": () => bot.gather(10090, "firstobservatory"),
});

bot.quest(8640, {
  "69750": () => bot.hunt("Empress’ Finger", "firstobservatory"),
});

bot.quest(8641, {
  "69752": () => bot.hunt("Ancient Turret", "firstobservatory", 12),
  "69753": () => bot.hunt("Empress’ Finger", "firstobservatory"),
  "69751": () => bot.hunt("Ancient Creature", "firstobservatory", 6),
});
