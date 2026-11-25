/// name: Elegy of Madness 02 - Astravia
/// desc: Astravia chapter, quests 7993-8000. Skips completed quests, so re-runs resume where they left off.

bot.travel("astravia");

if (!bot.quest(7993).completed()) {
  bot.quest(7993).accept();
  bot.hunt("Monstrous Dove", "astravia", 8);
  bot.quest(7993).turnIn();
}

if (!bot.quest(7994).completed()) {
  bot.quest(7994).accept();
  bot.hunt("Drago's Spy", "astravia", 8);
  bot.quest(7994).turnIn();
}

if (!bot.quest(7995).completed()) {
  bot.quest(7995).accept();
  bot.gather(8264, "astravia");
  bot.gather(8265, "astravia");
  bot.gather(8266, "astravia");
  bot.hunt("Astravian Mercenary", "astravia", 6);
  bot.quest(7995).turnIn();
}

if (!bot.quest(7996).completed()) {
  bot.quest(7996).accept();
  bot.hunt("Creature 27", "astravia", 8);
  bot.quest(7996).turnIn();
}

if (!bot.quest(7997).completed()) {
  bot.quest(7997).accept();
  bot.hunt("Creature 28", "astravia", 8);
  bot.quest(7997).turnIn();
}

if (!bot.quest(7998).completed()) {
  bot.quest(7998).accept();
  bot.hunt("Ti", "astravia");
  bot.quest(7998).turnIn();
}

if (!bot.quest(7999).completed()) {
  bot.quest(7999).accept();
  bot.hunt("Creature 27", "astravia", 8);
  bot.quest(7999).turnIn();
}

if (!bot.quest(8000).completed()) {
  bot.quest(8000).accept();
  bot.hunt("The Moon", "astravia");
  bot.quest(8000).turnIn();
}
