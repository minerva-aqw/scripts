/// name: Deep Water
/// desc: Complete the Deep Water chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "trenchobserve";
const LAST = 9338;

if (!bot.quest(LAST).done()) {
  // 9329 Unsung Heroes
  bot.questPlan(9329, {
    "79028": [
      { farm: { item: 79028, monster: "Venerated Wraith", map: MAP, source: "temp" } },
    ],
    "79029": [{ gather: { id: 11975, map: MAP } }],
  });

  // 9330 Watertight Guarantee
  bot.questPlan(9330, {
    "79030": [
      { farm: { item: 79030, monster: "Seabase Turret", map: MAP, source: "temp" } },
    ],
    "79031": [{ gather: { id: 11976, map: MAP } }],
  });

  // 9331 Core Electrolytes
  bot.questPlan(9331, {
    "79032": [{ gather: { id: 11977, map: MAP, qty: 4 } }],
  });

  // 9332 Guardian Spirits
  bot.questPlan(9332, {
    "79033": [
      { farm: { item: 79033, monster: "Venerated Wraith", map: MAP, source: "temp" } },
    ],
  });

  // 9333 Enemy in Need
  bot.questPlan(9333, {
    "79034": [
      { farm: { item: 79034, monster: "Seabase Turret", map: MAP, source: "temp" } },
    ],
    "79035": [{ gather: { id: 11978, map: MAP, qty: 4 } }],
  });

  // 9334 Here Lies Shadow
  bot.questPlan(9334, {
    "79036": [{ gather: { id: 11979, map: MAP } }],
    "79037": [{ gather: { id: 11980, map: MAP, qty: 2 } }],
    "79038": [{ gather: { id: 11981, map: MAP } }],
  });

  // 9335 Nature's White Noise
  bot.questPlan(9335, {
    "79039": [
      { farm: { item: 79039, monster: "Sea Spirit", map: MAP, source: "temp" } },
    ],
  });

  // 9336 Dreams Seep into Reality
  bot.questPlan(9336, {
    "79040": [
      { farm: { item: 79040, monster: "Necro Adipocere", map: MAP, source: "temp" } },
    ],
  });

  // 9337 Hadal Havoc
  bot.questPlan(9337, {
    "79041": [
      { farm: { item: 79041, monster: "Necro Adipocere", map: MAP, source: "temp" } },
    ],
    "79042": [
      { farm: { item: 79042, monster: "Sea Spirit", map: MAP, source: "temp" } },
    ],
    "79043": [{ gather: { id: 11982, map: MAP } }],
  });

  // 9338 See You on the Other Side
  bot.questPlan(9338, {
    "79044": [
      { farm: { item: 79044, monster: "Lady Noelle", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Deep Water complete");
}
