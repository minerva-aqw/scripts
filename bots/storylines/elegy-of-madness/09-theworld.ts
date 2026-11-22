/// name: Elegy of Madness 09 - The World
/// desc: The World chapter, quests 8723-8733. Skips completed quests, so re-runs resume where they left off.

bot.travel("theworld");

bot.quest(8723, {
  "70946": () => bot.gather(10289, "theworld"),
});

bot.quest(8724, {
  "70947": () => bot.hunt("Nothingness", "theworld", 12),
});

bot.quest(8725, {
  "70948": () => bot.hunt("Re", "theworld"),
});

bot.quest(8726, {
  "70949": () => bot.hunt("Fa", "theworld"),
});

bot.quest(8727, {
  "70950": () => bot.hunt("Ti", "theworld"),
});

bot.quest(8728, {
  "70951": () => bot.hunt("So", "theworld"),
});

bot.quest(8729, {
  "70952": () => bot.hunt("Nothingness", "theworld", 10),
});

bot.quest(8730, {
  "70953": () => bot.hunt("So", "theworld"),
});

bot.quest(8731, {
  "70954": () => bot.hunt("So", "theworld"),
});

bot.quest(8732, {
  "70955": () => bot.hunt("Darkon", "theworld"),
});

bot.quest(8733, {
  "70956": () => bot.hunt("Encore Darkon", "theworld"),
});
