/// name: Ebil Mega Mall
/// desc: Ebil Mega Mall storyline, quests 10500-10508. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Seasonal/BlackFriday/EbilMegaMallStory.
// Handler keys are requirement ItemIDs (stable); map-item ID and
// monster names come from the same source, quantities from quest-data.
// 10506 farms r6 per Skua's pinned KillMonster.

bot.quest(10500, {
  "97044": function () { bot.hunt("Vending Machine", "ebilmegamall"); }, // Canned Toy
});

bot.quest(10501, {
  "97045": function () { bot.hunt("Mogugu", "ebilmegamall"); }, // Rare Mogugu
});

bot.quest(10502, {
  "97046": function () { bot.hunt("Deal Hunter", "ebilmegamall"); }, // Mega Sale Haul
});

bot.quest(10503, {
  "97047": function () { bot.gather(15186, "ebilmegamall", 6); }, // Manley Goblets
});

bot.quest(10504, {
  "97048": function () { bot.hunt("Mogugu", "ebilmegamall"); }, // Common Mogugu
  "97049": function () { bot.hunt("Deal Hunter", "ebilmegamall"); }, // Deal Scam
});

bot.quest(10505, {
  "97050": function () { bot.hunt("Scalper", "ebilmegamall"); }, // Scalpers Fired
});

bot.quest(10506, {
  "97051": function () { bot.hunt("*", "ebilmegamall", 1, "r6", "Left"); }, // Super Rare Mogugu
});

bot.quest(10507, {
  "97052": function () { bot.hunt("Customer Support", "ebilmegamall"); }, // Customer Support Tag
});

bot.quest(10508, {
  "97053": function () { bot.hunt("Mogugudra", "ebilmegamall"); }, // Mogugudra Defeated
});
