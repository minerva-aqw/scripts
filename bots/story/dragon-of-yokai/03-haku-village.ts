/// name: Haku Village
/// desc: Complete the Haku Village chapter of the Dragons of Yokai saga.
///
/// Every requirement is a temp quest item. The chapter mixes map objects with
/// named sources; the final quest is the Dai Tengu in the last room.

const MAP = "hakuvillage";
const TSUKU = "Tsukumogami";
const ONI = "Mountain Oni";
const KITSUNE = "Kitsune Spy";
const NAGAMI = "Nagami";
const DAI_TENGU = "Dai Tengu";

if (!bot.quest(9599).done()) {
  // 9590 99th Birthday
  bot.questPlan(9590, {
    "84051": [{ farm: { item: 84051, monster: TSUKU, map: MAP, source: "temp" } }],
  });

  // 9591 Red and Blue
  bot.questPlan(9591, {
    "84053": [{ gather: { id: 12706, map: MAP } }],
    "84052": [{ farm: { item: 84052, monster: ONI, map: MAP, source: "temp" } }],
  });

  // 9592 Cold Sunshower
  bot.questPlan(9592, {
    "84055": [{ gather: { id: 12707, map: MAP } }],
    "84054": [{ farm: { item: 84054, monster: TSUKU, map: MAP, source: "temp" } }],
  });

  // 9593 Inari Boom
  bot.questPlan(9593, {
    "84056": [{ gather: { id: 12708, map: MAP } }],
    "84057": [{ gather: { id: 12709, map: MAP } }],
    "84058": [{ farm: { item: 84058, monster: KITSUNE, map: MAP, source: "temp" } }],
  });

  // 9594 Cui Niao
  bot.questPlan(9594, {
    "84060": [{ gather: { id: 12710, map: MAP } }],
    "84059": [{ farm: { item: 84059, monster: NAGAMI, map: MAP, source: "temp" } }],
  });

  // 9595 Huli Jing
  bot.questPlan(9595, {
    "84061": [{ farm: { item: 84061, monster: KITSUNE, map: MAP, source: "temp" } }],
  });

  // 9596 Aka Oni Ao Oni
  bot.questPlan(9596, {
    "84062": [{ farm: { item: 84062, monster: ONI, map: MAP, source: "temp" } }],
  });

  // 9597 Stone Shangyuan Fest
  bot.questPlan(9597, {
    "84063": [{ farm: { item: 84063, monster: TSUKU, map: MAP, source: "temp" } }],
  });

  // 9598 Nagami Sashimi
  bot.questPlan(9598, {
    "84064": [{ farm: { item: 84064, monster: NAGAMI, map: MAP, source: "temp" } }],
  });

  // 9599 Divine Derision
  bot.questPlan(9599, {
    "84065": [{ farm: { item: 84065, monster: DAI_TENGU, map: MAP, source: "temp" } }],
  });
}
