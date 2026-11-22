/// name: Elegy of Madness 08 - Genesis Garden
/// desc: Genesis Garden chapter, quests 8678-8687. Skips completed quests, so re-runs resume where they left off.

bot.travel("genesisgarden");

bot.quest(8678, {
  "70394": () => bot.gather(10196, "genesisgarden", 6),
});

bot.quest(8679, {
  "70395": () => bot.hunt("Drago's Soldier", "genesisgarden", 7),
});

bot.quest(8680, {
  "70396": () => bot.gather(10197, "genesisgarden"),
  "70397": () => bot.gather(10198, "genesisgarden"),
  "70398": () => bot.gather(10199, "genesisgarden"),
});

bot.quest(8681, {
  "70399": () => bot.hunt("Drago's Soldier", "genesisgarden", 7),
});

bot.quest(8682, {
  "70400": () => bot.gather(10200, "genesisgarden"),
  "70401": () => bot.gather(10201, "genesisgarden"),
});

bot.quest(8683, {
  "70402": () => bot.gather(10202, "genesisgarden", 5),
});

bot.quest(8684, {
  "70404": () => bot.hunt("Ancient Creature", "genesisgarden", 8),
  "70403": () => bot.hunt("Plant Beast", "genesisgarden", 8),
});

bot.quest(8685, {
  "70405": () => bot.hunt("Ancient Turret", "genesisgarden", 8),
  "70406": () => bot.gather(10203, "genesisgarden"),
});

bot.quest(8686, {
  "70407": () => bot.hunt("Undead Humanoid", "genesisgarden", 7),
});

bot.quest(8687, {
  "70408": () => bot.hunt("Ancient Mecha", "genesisgarden"),
});
