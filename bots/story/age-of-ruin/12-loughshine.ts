/// name: Loughshine
/// desc: Complete the Loughshine chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "loughshine";
const LAST = 9764;

if (!bot.quest(LAST).done()) {
  // 9755 Wicker Magic
  bot.questPlan(9755, {
    "86258": [
      { farm: { item: 86258, monster: "Skye Cailleach", map: MAP, source: "temp" } },
    ],
    "86259": [{ gather: { id: 13273, map: MAP } }],
  });

  // 9756 Maigh Eo
  bot.questPlan(9756, {
    "86260": [
      { farm: { item: 86260, monster: "Scorched Elder Yew", map: MAP, source: "temp" } },
    ],
  });

  // 9757 Resentment Harbour
  bot.questPlan(9757, {
    "86261": [{ gather: { id: 13274, map: MAP, qty: 5 } }],
    "86262": [{ gather: { id: 13275, map: MAP } }],
  });

  // 9758 Wisened Yew
  bot.questPlan(9758, {
    "86264": [
      { farm: { item: 86264, monster: "Skye Cailleach", map: MAP, source: "temp" } },
    ],
    "86263": [
      { farm: { item: 86263, monster: "Scorched Elder Yew", map: MAP, source: "temp" } },
    ],
  });

  // 9759 Dragonflare
  bot.questPlan(9759, {
    "86265": [{ gather: { id: 13276, map: MAP } }],
  });

  // 9760 Shock Scatter
  bot.questPlan(9760, {
    "86266": [
      { farm: { item: 86266, monster: "Skye Executor", map: MAP, source: "temp" } },
    ],
  });

  // 9761 Grace of Three
  bot.questPlan(9761, {
    "86268": [{ gather: { id: 13277, map: MAP } }],
    "86267": [
      { farm: { item: 86267, monster: "Energy Elemental", map: MAP, source: "temp" } },
    ],
  });

  // 9762 Iubhair
  bot.questPlan(9762, {
    "86269": [{ gather: { id: 13278, map: MAP, qty: 5 } }],
    "86270": [{ gather: { id: 13279, map: MAP } }],
  });

  // 9763 Parting the Clouds
  bot.questPlan(9763, {
    "86272": [
      { farm: { item: 86272, monster: "Skye Executor", map: MAP, source: "temp" } },
    ],
    "86273": [{ gather: { id: 13280, map: MAP } }],
    "86271": [
      { farm: { item: 86271, monster: "Energy Elemental", map: MAP, source: "temp" } },
    ],
  });

  // 9764 Arrester
  bot.questPlan(9764, {
    "86274": [
      { farm: { item: 86274, monster: "Warden Iseul", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Loughshine complete");
}
