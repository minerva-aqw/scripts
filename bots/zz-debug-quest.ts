/// name: zz debug quest completed
/// desc: Temporary diagnostic: reports completed() and slot 376 for quest 7769, then fails with the values. Delete after use.

bot.travel("eridani");
const done = bot.quest(7769).completed();
const slot = bot.questValue(376);
throw new Error("7769 completed=" + done + " slot376=" + slot);
