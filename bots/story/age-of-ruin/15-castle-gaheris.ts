/// name: Castle Gaheris
/// desc: Complete the Castle Gaheris chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "castlegaheris";
const LAST = 9828;

if (!bot.quest(LAST).done()) {
  // 9819 Needs of the Few
  bot.questPlan(9819, {
    "87156": [
      { farm: { item: 87156, monster: "Energy Elemental", map: MAP, source: "temp" } },
    ],
    "87176": [{ gather: { id: 13378, map: MAP } }],
  });

  // 9820 Lost and Numb
  bot.questPlan(9820, {
    "87157": [
      { farm: { item: 87157, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
  });

  // 9821 Childhood Memories
  bot.questPlan(9821, {
    "87160": [{ gather: { id: 13379, map: MAP } }],
    "87158": [{ gather: { id: 13380, map: MAP } }],
    "87159": [{ gather: { id: 13381, map: MAP } }],
  });

  // 9822 Strangled Sobs
  bot.questPlan(9822, {
    "87161": [
      { farm: { item: 87161, monster: "Energy Elemental", map: MAP, source: "temp" } },
    ],
    "87162": [
      { farm: { item: 87162, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
  });

  // 9823 Distant Care
  bot.questPlan(9823, {
    "87163": [
      { farm: { item: 87163, monster: "Dark Cage", map: MAP, source: "temp" } },
    ],
  });

  // 9824 Minus K
  bot.questPlan(9824, {
    "87164": [
      { farm: { item: 87164, monster: "Glacial Crystal", map: MAP, source: "temp" } },
    ],
  });

  // 9825 Someone Else's Blood and Tears
  bot.questPlan(9825, {
    "87165": [
      { farm: { item: 87165, monster: "Elemental Hybrid", map: MAP, source: "temp" } },
    ],
  });

  // 9826 Honor Thy Family
  bot.questPlan(9826, {
    "87174": [{ gather: { id: 13382, map: MAP } }],
    "87175": [{ gather: { id: 13383, map: MAP } }],
  });

  // 9827 Life's Latest Lows
  bot.questPlan(9827, {
    "87166": [
      { farm: { item: 87166, monster: "Glacial Crystal", map: MAP, source: "temp" } },
    ],
    "87167": [
      { farm: { item: 87167, monster: "Elemental Hybrid", map: MAP, source: "temp" } },
    ],
  });

  // 9828 Vow of Misery
  bot.questPlan(9828, {
    "87168": [
      { farm: { item: 87168, monster: "Thundersnow Storm", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Castle Gaheris complete");
}
