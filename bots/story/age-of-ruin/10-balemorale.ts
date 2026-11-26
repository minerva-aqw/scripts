/// name: Balemorale
/// desc: Complete the Balemorale chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "balemorale";
const LAST = 9729;

if (!bot.quest(LAST).done()) {
  // 9719 Estrangement
  bot.questPlan(9719, {
    "85853": [{ gather: { id: 12933, map: MAP } }],
  });

  // 9720 Searchlights
  bot.questPlan(9720, {
    "85854": [
      { farm: { item: 85854, monster: "Lightguard Paladin", map: MAP, source: "temp" } },
    ],
  });

  // 9721 Queensmen
  bot.questPlan(9721, {
    "85855": [
      { farm: { item: 85855, monster: "Noble's Knight", map: MAP, source: "temp" } },
    ],
  });

  // 9722 Cellar Secrets
  bot.questPlan(9722, {
    "85856": [{ gather: { id: 13177, map: MAP } }],
    "85857": [{ gather: { id: 13178, map: MAP } }],
  });

  // 9723 Chaotic Roots
  bot.questPlan(9723, {
    "85858": [
      { farm: { item: 85858, monster: "Chaos Spider", map: MAP, source: "temp" } },
    ],
    "85859": [{ gather: { id: 13179, map: MAP } }],
    "85860": [{ gather: { id: 13180, map: MAP } }],
  });

  // 9724 Eroding Era — Skua kills the whole richest cell for this one.
  bot.questPlan(9724, {
    "85861": [{ farm: { item: 85861, monster: "*", map: MAP, source: "temp" } }],
  });

  // 9725 Old Wolf
  bot.questPlan(9725, {
    "85862": [{ gather: { id: 13181, map: MAP, qty: 5 } }],
    "85863": [{ gather: { id: 13182, map: MAP } }],
  });

  // 9726 Abandoned Cradle
  bot.questPlan(9726, {
    "85864": [
      { farm: { item: 85864, monster: "Chaos Spider", map: MAP, source: "temp" } },
    ],
    "85865": [
      { farm: { item: 85865, monster: "Chaos Crystal", map: MAP, source: "temp" } },
    ],
    "85866": [{ gather: { id: 13183, map: MAP } }],
  });

  // 9727 Shockwaves
  bot.questPlan(9727, {
    "85867": [
      { farm: { item: 85867, monster: "Skye Warrior", map: MAP, source: "temp" } },
    ],
  });

  // 9728 Sleight of Hand
  bot.questPlan(9728, {
    "85868": [{ gather: { id: 13184, map: MAP, qty: 7 } }],
    "85869": [{ gather: { id: 13185, map: MAP } }],
  });

  // 9729 Double Fianchetto
  bot.questPlan(9729, {
    "85870": [
      { farm: { item: 85870, monster: "Queen Victoria", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Balemorale complete");
}
