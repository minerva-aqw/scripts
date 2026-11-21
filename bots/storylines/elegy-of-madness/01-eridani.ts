/// name: Elegy of Madness 01 - Eridani
/// desc: Eridani chapter, quests 7769-7779. Flat accept, farm, turn in.

bot.travel("eridani");

bot.quest(7769).accept();
bot.gather(7783, "eridani");
bot.hunt("Maggot-Like Creature", "eridani", 2);
bot.quest(7769).turnIn();

bot.quest(7770).accept();
bot.hunt("Maggot-Like Creature", "eridani", 5);
bot.quest(7770).turnIn();

bot.quest(7771).accept();
bot.hunt("Rat-Like Creature", "eridani", 5);
bot.quest(7771).turnIn();

bot.quest(7772).accept();
bot.hunt("Bat-Like Creature", "eridani", 5);
bot.quest(7772).turnIn();

bot.quest(7773).accept();
bot.hunt("Wolf-Like Creature", "eridani", 8);
bot.quest(7773).turnIn();

bot.quest(7774).accept();
bot.hunt("Rat-Like Creature", "eridani");
bot.hunt("Bat-Like Creature", "eridani");
bot.hunt("Maggot-Like Creature", "eridani", 2);
bot.gather(7784, "eridani");
bot.quest(7774).turnIn();

bot.quest(7775).accept();
bot.gather(7785, "eridani");
bot.hunt("Wolf-Like Creature", "eridani", 2);
bot.quest(7775).turnIn();

bot.quest(7776).accept();
bot.hunt("Creature 15", "eridani");
bot.hunt("Creature 16", "eridani");
bot.hunt("Creature 34", "eridani", 7);
bot.quest(7776).turnIn();

bot.quest(7777).accept();
bot.hunt("Creature 30", "eridani");
bot.hunt("Creature 31", "eridani");
bot.quest(7777).turnIn();

bot.quest(7778).accept();
bot.gather(7786, "eridani");
bot.hunt("Door", "eridani");
bot.quest(7778).turnIn();

bot.quest(7779).accept();
bot.hunt("Creature 6", "eridani");
bot.quest(7779).turnIn();
