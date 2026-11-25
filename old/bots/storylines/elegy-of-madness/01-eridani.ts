/// name: Elegy of Madness 01 - Eridani
/// desc: Eridani chapter, quests 7769-7779. Skips completed quests, so re-runs resume where they left off.

bot.travel("eridani");

if (!bot.quest(7769).completed()) {
  bot.quest(7769).accept();
  bot.gather(7783, "eridani");
  bot.hunt("Maggot-Like Creature", "eridani", 2);
  bot.quest(7769).turnIn();
}

if (!bot.quest(7770).completed()) {
  bot.quest(7770).accept();
  bot.hunt("Maggot-Like Creature", "eridani", 5);
  bot.quest(7770).turnIn();
}

if (!bot.quest(7771).completed()) {
  bot.quest(7771).accept();
  bot.hunt("Rat-Like Creature", "eridani", 5);
  bot.quest(7771).turnIn();
}

if (!bot.quest(7772).completed()) {
  bot.quest(7772).accept();
  bot.hunt("Bat-Like Creature", "eridani", 5);
  bot.quest(7772).turnIn();
}

if (!bot.quest(7773).completed()) {
  bot.quest(7773).accept();
  bot.hunt("Wolf-Like Creature", "eridani", 8);
  bot.quest(7773).turnIn();
}

if (!bot.quest(7774).completed()) {
  bot.quest(7774).accept();
  bot.hunt("Rat-Like Creature", "eridani");
  bot.hunt("Bat-Like Creature", "eridani");
  bot.hunt("Maggot-Like Creature", "eridani", 2);
  bot.gather(7784, "eridani");
  bot.quest(7774).turnIn();
}

if (!bot.quest(7775).completed()) {
  bot.quest(7775).accept();
  bot.gather(7785, "eridani");
  bot.hunt("Wolf-Like Creature", "eridani", 2);
  bot.quest(7775).turnIn();
}

if (!bot.quest(7776).completed()) {
  bot.quest(7776).accept();
  bot.hunt("Creature 15", "eridani");
  bot.hunt("Creature 16", "eridani");
  bot.hunt("Creature 34", "eridani", 7);
  bot.quest(7776).turnIn();
}

if (!bot.quest(7777).completed()) {
  bot.quest(7777).accept();
  bot.hunt("Creature 30", "eridani");
  bot.hunt("Creature 31", "eridani");
  bot.quest(7777).turnIn();
}

if (!bot.quest(7778).completed()) {
  bot.quest(7778).accept();
  bot.gather(7786, "eridani");
  bot.hunt("Door", "eridani");
  bot.quest(7778).turnIn();
}

if (!bot.quest(7779).completed()) {
  bot.quest(7779).accept();
  bot.hunt("Creature 6", "eridani");
  bot.quest(7779).turnIn();
}
