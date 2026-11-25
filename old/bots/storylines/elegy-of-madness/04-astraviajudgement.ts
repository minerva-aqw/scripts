/// name: Elegy of Madness 04 - Astravia Judgement
/// desc: Astravia Judgement chapter, quests 8386-8395. Skips completed quests, so re-runs resume where they left off.

bot.travel("astraviajudge");

bot.quest(8386, {
  "65357": () => bot.gather(9275, "astraviajudge", 6),
});

bot.quest(8387, {
  "65358": () => bot.hunt("Hand", "astraviajudge", 8),
});

bot.quest(8388, {
  "65359": () => bot.hunt("Trumpeter", "astraviajudge", 8),
});

bot.quest(8389, {
  "65360": () => bot.hunt("Juror", "astraviajudge", 9, "r4", "Left"),
});

bot.quest(8390, {
  "65361": () => bot.hunt("Trumpeter", "astraviajudge", 9),
  "65362": () => bot.gather(9276, "astraviajudge"),
});

bot.quest(8391, {
  "65364": () => bot.hunt("Hand", "astraviajudge", 8),
  "65363": () => bot.gather(9277, "astraviajudge", 8),
});

bot.quest(8392, {
  "65365": () => bot.hunt("Trumpeter", "astraviajudge", 9),
});

bot.quest(8393, {
  "65366": () => bot.hunt("Juror", "astraviajudge", 9, "r4", "Left"),
});

bot.quest(8394, {
  "65368": () => bot.gather(9278, "astraviajudge"),
  "65367": () => bot.hunt("Shades", "astraviajudge"),
});

bot.quest(8395, {
  "65369": () => bot.hunt("La", "astraviajudge"),
});
