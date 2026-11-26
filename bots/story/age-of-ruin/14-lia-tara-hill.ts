/// name: Lia Tara Hill
/// desc: Complete the Lia Tara Hill chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "liatarahill";
const LAST = 9814;

if (!bot.quest(LAST).done()) {
  // 9805 At Ease
  bot.questPlan(9805, {
    "86878": [
      { farm: { item: 86878, monster: "Undead Garde", map: MAP, source: "temp" } },
    ],
  });

  // 9806 Greenguard Daisy
  bot.questPlan(9806, {
    "86879": [
      { farm: { item: 86879, monster: "Garde Wraith", map: MAP, source: "temp" } },
    ],
  });

  // 9807 True Nature
  bot.questPlan(9807, {
    "86880": [
      { farm: { item: 86880, monster: "Undead Garde", map: MAP, source: "temp" } },
    ],
    "86881": [
      { farm: { item: 86881, monster: "Garde Wraith", map: MAP, source: "temp" } },
    ],
  });

  // 9808 Deafly Pride
  bot.questPlan(9808, {
    "86882": [{ gather: { id: 13364, map: MAP } }],
    "86883": [{ gather: { id: 13365, map: MAP } }],
  });

  // 9809 King of Briars and Smoke
  bot.questPlan(9809, {
    "86884": [
      { farm: { item: 86884, monster: "King Duncan", map: MAP, source: "temp" } },
    ],
  });

  // 9810 Last Snowfall
  bot.questPlan(9810, {
    "86885": [
      { farm: { item: 86885, monster: "Undead Garde", map: MAP, source: "temp" } },
    ],
    "86886": [
      { farm: { item: 86886, monster: "Garde Wraith", map: MAP, source: "temp" } },
    ],
    "86887": [{ gather: { id: 13368, map: MAP } }],
  });

  // 9811 Spring Melt
  bot.questPlan(9811, {
    "86888": [
      { farm: { item: 86888, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
    "86889": [{ gather: { id: 13366, map: MAP } }],
  });

  // 9812 Connla
  bot.questPlan(9812, {
    "86890": [
      { farm: { item: 86890, monster: "Skye Cailleach", map: MAP, source: "temp" } },
    ],
  });

  // 9813 Dumha na nGiall
  bot.questPlan(9813, {
    "86891": [
      { farm: { item: 86891, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
    "86892": [
      { farm: { item: 86892, monster: "Skye Cailleach", map: MAP, source: "temp" } },
    ],
    "86893": [{ gather: { id: 13367, map: MAP } }],
  });

  // 9814 Changeling
  bot.questPlan(9814, {
    "86894": [
      { farm: { item: 86894, monster: "Warden Illaria", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Lia Tara Hill complete");
}
