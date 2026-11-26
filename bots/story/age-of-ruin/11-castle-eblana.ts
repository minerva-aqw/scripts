/// name: Castle Eblana
/// desc: Complete the Castle Eblana chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "castleeblana";
const LAST = 9741;

if (!bot.quest(LAST).done()) {
  // 9732 Skye's Raindrops
  bot.questPlan(9732, {
    "85916": [
      { farm: { item: 85916, monster: "Skye Warrior", map: MAP, source: "temp" } },
    ],
  });

  // 9733 Doctor's Orders
  bot.questPlan(9733, {
    "85917": [{ gather: { id: 13202, map: MAP, qty: 5 } }],
    "85918": [{ gather: { id: 13203, map: MAP } }],
  });

  // 9734 Shockwave's Ripples
  bot.questPlan(9734, {
    "85919": [
      { farm: { item: 85919, monster: "Skye Executor", map: MAP, source: "temp" } },
    ],
  });

  // 9735 Caretaker's Shadow
  bot.questPlan(9735, {
    "85920": [
      { farm: { item: 85920, monster: "Skye Warrior", map: MAP, source: "temp" } },
    ],
    "85921": [
      { farm: { item: 85921, monster: "Skye Executor", map: MAP, source: "temp" } },
    ],
    "85922": [{ gather: { id: 13204, map: MAP } }],
  });

  // 9736 Harbinger's Tears
  bot.questPlan(9736, {
    "85923": [
      { farm: { item: 85923, monster: "Bananach Raven", map: MAP, source: "temp" } },
    ],
  });

  // 9737 Spectre of Hunger
  bot.questPlan(9737, {
    "85924": [{ farm: { item: 85924, monster: "Fear Gorta", map: MAP, source: "temp" } }],
    "85925": [{ gather: { id: 13205, map: MAP } }],
  });

  // 9738 InnJustice
  bot.questPlan(9738, {
    "85928": [{ gather: { id: 13206, map: MAP } }],
    "85926": [
      { farm: { item: 85926, monster: "Bananach Raven", map: MAP, source: "temp" } },
    ],
    "85927": [{ farm: { item: 85927, monster: "Fear Gorta", map: MAP, source: "temp" } }],
  });

  // 9739 Find Shelter in...
  bot.questPlan(9739, {
    "85929": [{ gather: { id: 13207, map: MAP } }],
    "85930": [{ gather: { id: 13208, map: MAP } }],
  });

  // 9740 Heavy Handed
  bot.questPlan(9740, {
    "85931": [
      { farm: { item: 85931, monster: "Skye Warrior", map: MAP, source: "temp" } },
    ],
  });

  // 9741 Miserable Monsoon
  bot.questPlan(9741, {
    "85932": [
      { farm: { item: 85932, monster: "Warden Indradeep", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Castle Eblana complete");
}
