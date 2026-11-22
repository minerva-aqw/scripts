/// name: Elegy of Madness 03 - Astravia Castle
/// desc: Astravia Castle chapter, quests 8247-8256. Skips completed quests, so re-runs resume where they left off.

bot.travel("astraviacastle");

if (!bot.quest(8247).completed()) {
  bot.quest(8247, {
    "63014": () => bot.hunt("*", "astraviacastle", 9, "r3", "Left"),
  });
}

if (!bot.quest(8248).completed()) {
  bot.quest(8248, {
    "63016": () => bot.hunt("*", "astraviacastle", 6, "r3", "Left"),
    "63015": () => bot.gather(8891, "astraviacastle", 6),
  });
}

if (!bot.quest(8249).completed()) {
  bot.quest(8249).accept();
  bot.gather(8892, "astraviacastle", 6);
  bot.hunt("Creature 20", "astraviacastle", 4);
  bot.quest(8249).turnIn();
}

if (!bot.quest(8250).completed()) {
  bot.quest(8250, {
    "63020": () => bot.hunt("*", "astraviacastle", 9, "r3", "Left"),
    "63019": () => bot.gather(8893, "astraviacastle"),
  });
}

if (!bot.quest(8251).completed()) {
  bot.quest(8251, {
    "63021": () => bot.hunt("*", "astraviacastle", 6, "r3", "Left"),
    "63022": () => bot.gather(8894, "astraviacastle"),
  });
}

if (!bot.quest(8252).completed()) {
  bot.quest(8252).accept();
  bot.hunt("Creature 20", "astraviacastle");
  bot.quest(8252).turnIn();
}

if (!bot.quest(8253).completed()) {
  bot.quest(8253).accept();
  bot.hunt("Astravian Royal Guard", "astraviacastle", 8);
  bot.quest(8253).turnIn();
}

if (!bot.quest(8254).completed()) {
  bot.quest(8254).accept();
  bot.gather(8895, "astraviacastle", 3);
  bot.hunt("Storage Spider", "astraviacastle", 8);
  bot.quest(8254).turnIn();
}

if (!bot.quest(8255).completed()) {
  bot.quest(8255).accept();
  bot.gather(8896, "astraviacastle");
  bot.quest(8255).turnIn();
}

if (!bot.quest(8256).completed()) {
  bot.quest(8256).accept();
  bot.hunt("The Sun", "astraviacastle");
  bot.quest(8256).turnIn();
}
