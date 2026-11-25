/// name: Chaos Lords 06 - Kimberly
/// desc: Kimberly chapter, quests 648-710. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Kimberly.
// Handler keys are requirement ItemIDs (stable); monster names and
// quantities come from the same source, quantities from quest-data.

bot.quest(648, {
  "4989": function () { bot.hunt("Grateful Undead", "stairway", 4); }, // Grateful Undead Shirt
  "4990": function () { bot.hunt("Rock Lobster", "stairway", 4); }, // Rock Lobster Tail
});

bot.quest(649, {
  "4991": function () { bot.hunt("Rock Lobster", "stairway", 5); }, // Mossy Stone
});

bot.quest(650, {
  "4992": function () { bot.hunt("Grateful Undead", "stairway"); }, // Box of Brightburn Matches
});

bot.quest(651, {
  "4993": function () { bot.hunt("Elwood Bruise", "stairway"); }, // Defeated Elwood
  "4994": function () { bot.hunt("Jake Bruise", "stairway"); }, // Defeated Jake
});

bot.quest(658, {
  "5042": function () { bot.hunt("Stinger", "beehive", 8); }, // Tattered Sting Sweater
});

bot.quest(659, {
  "5043": function () { bot.hunt("Killer Queen Bee", "beehive"); }, // Jar of Royal Honey
});

bot.quest(660, {
  "24447": function () { bot.hunt("*", "beehive", 1, "r6", "Right"); }, // No Shoes!
});

bot.travel("beehive");
bot.quest(661, {});

bot.quest(675, {
  "5121": function () { bot.hunt("Mozard", "orchestra", 10, "R7", "Down"); }, // Fire Flea
});

bot.quest(676, {
  "5122": function () { bot.hunt("Pachelbel's Cannon ", "orchestra", 1, "R4", "Down"); }, // Cannon Powder
});

bot.quest(677, {
  "5123": function () { bot.hunt("Mozard", "orchestra", 5); }, // Lucky Mozard Claw
});

bot.quest(678, {
  "5124": function () { bot.hunt("Faust", "orchestra"); }, // Faustian Contract
});

bot.quest(4827, {
  "33568": function () { bot.hunt("Rock Lobster", "stairway", 5); }, // Lobster Rocked
  "33569": function () { bot.hunt("Grateful Undead", "stairway", 5); }, // Ungrateful Undead
});

bot.quest(707, {});

bot.quest(709, {
  "60664": function () { bot.hunt("Pony Gary Yellow", "palooza"); }, // Pony Gary Yellow Defeated
});

bot.quest(710, {
  "35168": function () { bot.hunt("Kimberly", "palooza"); }, // Kimberly Defeated
});
