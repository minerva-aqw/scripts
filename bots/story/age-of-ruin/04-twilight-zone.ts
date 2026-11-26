/// name: Twilight Zone
/// desc: Complete the Twilight Zone chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "twilightzone";
const LAST = 9268;

if (!bot.quest(LAST).done()) {
  // 9258 Marshmallows With Bite
  bot.questPlan(9258, {
    "78112": [
      { farm: { item: 78112, monster: "Whale Louse", map: MAP, source: "temp" } },
    ],
  });

  // 9259 Meaty Cold Spaghetti
  bot.questPlan(9259, {
    "78113": [
      { farm: { item: 78113, monster: "Polymelia Lamprey", map: MAP, source: "temp" } },
    ],
  });

  // 9260 Songs in the Seams
  bot.questPlan(9260, {
    "78114": [{ gather: { id: 11749, map: MAP } }],
    "78115": [{ gather: { id: 11750, map: MAP, qty: 4 } }],
  });

  // 9261 Parched Throats
  bot.questPlan(9261, {
    "78116": [{ farm: { item: 78116, monster: "Whale Louse", map: MAP, source: "temp" } }],
    "78117": [
      { farm: { item: 78117, monster: "Polymelia Lamprey", map: MAP, source: "temp" } },
    ],
  });

  // 9262 Morning Stretches
  bot.questPlan(9262, {
    "78118": [{ gather: { id: 11751, map: MAP } }],
    "78119": [{ gather: { id: 11752, map: MAP } }],
  });

  // 9263 Natural Empathy
  bot.questPlan(9263, {
    "78120": [
      { farm: { item: 78120, monster: "Decay Spirit", map: MAP, source: "temp" } },
    ],
  });

  // 9264 Comfort Blanket of Snow
  bot.questPlan(9264, {
    "78121": [
      { farm: { item: 78121, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
  });

  // 9265 Whale Watching
  bot.questPlan(9265, {
    "78122": [{ gather: { id: 11753, map: MAP } }],
    "78123": [{ gather: { id: 11754, map: MAP } }],
    "78124": [{ gather: { id: 11755, map: MAP } }],
  });

  // 9266 Exhausted Spirits
  bot.questPlan(9266, {
    "78125": [
      { farm: { item: 78125, monster: "Decay Spirit", map: MAP, source: "temp" } },
    ],
    "78126": [
      { farm: { item: 78126, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
  });

  // 9267 Singing to Whales
  bot.questPlan(9267, {
    "78127": [
      { farm: { item: 78127, monster: "Leviathan", map: MAP, source: "temp" } },
    ],
  });

  // 9268 The Sea's Commitment
  bot.questPlan(9268, {
    "78128": [{ gather: { id: 11756, map: MAP } }],
  });

  bot.notify("Twilight Zone complete");
}
