/// name: Yokai Treasure
/// desc: Complete the Yokai Treasure chapter of the Dragons of Yokai saga.
///
/// Every requirement is a temp quest item. The chapter mixes map objects with
/// named sources; the boss is a single spawn in the last room.

const MAP = "yokaitreasure";
const NEEDLE = "Needle Mouth";
const QUICKSILVER = "Quicksilver";
const WARRIOR = "Imperial Warrior";
const ZHENG = "Admiral Zheng";

if (!bot.quest(9405).done()) {
  // 9396 All Hands Report
  bot.questPlan(9396, {
    "80274": [{ gather: { id: 12162, map: MAP } }],
    "80275": [{ gather: { id: 12163, map: MAP } }],
    "80276": [{ gather: { id: 12164, map: MAP } }],
  });

  // 9397 Starving Ghosts
  bot.questPlan(9397, {
    "80277": [{ farm: { item: 80277, monster: NEEDLE, map: MAP, source: "temp" } }],
  });

  // 9398 Sudden Striker
  bot.questPlan(9398, {
    "80278": [{ farm: { item: 80278, monster: QUICKSILVER, map: MAP, source: "temp" } }],
  });

  // 9399 Onmyoji Maiden
  bot.questPlan(9399, {
    "80280": [{ gather: { id: 12166, map: MAP } }],
    "80279": [{ gather: { id: 12165, map: MAP } }],
  });

  // 9400 Proper Parley
  bot.questPlan(9400, {
    "80281": [{ farm: { item: 80281, monster: WARRIOR, map: MAP, source: "temp" } }],
  });

  // 9401 Hunger Pains
  bot.questPlan(9401, {
    "80282": [{ farm: { item: 80282, monster: NEEDLE, map: MAP, source: "temp" } }],
  });

  // 9402 Terror-cotta Warriors
  bot.questPlan(9402, {
    "80283": [{ farm: { item: 80283, monster: WARRIOR, map: MAP, source: "temp" } }],
  });

  // 9403 Indoor Fireworks
  bot.questPlan(9403, {
    "80284": [{ gather: { id: 12167, map: MAP, qty: 4 } }],
  });

  // 9404 Sons of Biscuit Eaters
  bot.questPlan(9404, {
    "80285": [{ farm: { item: 80285, monster: NEEDLE, map: MAP, source: "temp" } }],
    "80286": [{ farm: { item: 80286, monster: WARRIOR, map: MAP, source: "temp" } }],
  });

  // 9405 Pearl of my Heart
  bot.questPlan(9405, {
    "80287": [{ farm: { item: 80287, monster: ZHENG, map: MAP, source: "temp" } }],
  });
}
