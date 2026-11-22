/// name: Elegy of Madness 06 - Astravia Past
/// desc: Astravia Past chapter, quests 8592-8601. Skips completed quests, so re-runs resume where they left off.

bot.travel("astraviapast");

bot.quest(8592, {
  "69228": () => bot.gather(10017, "astraviapast"),
  "69229": () => bot.gather(10018, "astraviapast"),
});

bot.quest(8593, {
  "69230": () => bot.hunt("Astravian Soldier", "astraviapast", 8),
});

bot.quest(8594, {
  "69231": () => bot.gather(10019, "astraviapast", 7),
});

bot.quest(8595, {
  "69232": () => bot.hunt("Panicked Citizen", "astraviapast", 8),
});

bot.quest(8596, {
  "69233": () => bot.gather(10020, "astraviapast"),
  "69234": () => bot.hunt("Astravian Soldier", "astraviapast", 8),
});

bot.quest(8597, {
  "69235": () => bot.hunt("Regulus", "astraviapast"),
});

bot.quest(8598, {
  "69236": () => bot.hunt("Titania", "astraviapast"),
});

bot.quest(8599, {
  "69237": () => bot.hunt("Aurola", "astraviapast"),
});

bot.quest(8600, {
  "69238": () => bot.gather(10021, "astraviapast"),
});

bot.quest(8601, {
  "69239": () => bot.hunt("Forsaken Husk", "astraviapast", 4),
});
