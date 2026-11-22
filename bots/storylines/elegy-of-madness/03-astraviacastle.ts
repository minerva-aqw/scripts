/// name: Elegy of Madness 03 - Astravia Castle
/// desc: Astravia Castle chapter, quests 8247-8256. Skips completed quests, so re-runs resume where they left off.

bot.travel("astraviacastle");

if (!bot.quest(8247).completed()) {
  bot.quest(8247).accept();
  bot.hunt("*", "astraviacastle", 9);
  bot.quest(8247).turnIn();
}

if (!bot.quest(8248).completed()) {
  bot.quest(8248).accept();
  bot.hunt("*", "astraviacastle", 6);
  bot.gather(8891, "astraviacastle", 6);
  bot.quest(8248).turnIn();
}

if (!bot.quest(8249).completed()) {
  bot.quest(8249).accept();
  bot.gather(8892, "astraviacastle", 6);
  bot.hunt("Creature 20", "astraviacastle", 4);
  bot.quest(8249).turnIn();
}

if (!bot.quest(8250).completed()) {
  bot.quest(8250).accept();
  bot.hunt("*", "astraviacastle", 9);
  bot.gather(8893, "astraviacastle");
  bot.quest(8250).turnIn();
}

if (!bot.quest(8251).completed()) {
  bot.quest(8251).accept();
  bot.hunt("*", "astraviacastle", 6);
  bot.gather(8894, "astraviacastle");
  bot.quest(8251).turnIn();
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
