/// name: Naoise Grave
/// desc: Complete the Naoise Grave chapter of the Age of Ruin saga.
///
/// The quests run in slot order, not numeric order: 9774 sits between 9769 and
/// 9770.

const MAP = "naoisegrave";
const LAST = 9777;

if (!bot.quest(LAST).done()) {
  // 9768 Till When?
  bot.questPlan(9768, {
    "86472": [{ gather: { id: 13296, map: MAP } }],
    "86471": [
      { farm: { item: 86471, monster: "Bananach Raven", map: MAP, source: "temp" } },
    ],
  });

  // 9769 Energetic Feud
  bot.questPlan(9769, {
    "86473": [
      { farm: { item: 86473, monster: "Energy Elemental", map: MAP, source: "temp" } },
    ],
    "86474": [{ gather: { id: 13297, map: MAP } }],
  });

  // 9774 Glacial Seal — Brentan's object grants 13299 and Celestia's 13298.
  // The requirement order runs the other way round.
  bot.questPlan(9774, {
    "86476": [{ gather: { id: 13299, map: MAP } }],
    "86475": [{ gather: { id: 13298, map: MAP } }],
  });

  // 9770 The Cold Wind Guides
  bot.questPlan(9770, {
    "86477": [
      { farm: { item: 86477, monster: "Energy Elemental", map: MAP, source: "temp" } },
    ],
    "86478": [
      { farm: { item: 86478, monster: "Bananach Raven", map: MAP, source: "temp" } },
    ],
    "86479": [{ gather: { id: 13300, map: MAP } }],
  });

  // 9771 Cold Callers
  bot.questPlan(9771, {
    "86480": [
      { farm: { item: 86480, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
  });

  // 9772 Destinies Lost
  bot.questPlan(9772, {
    "86481": [
      { farm: { item: 86481, monster: "Bone Dragonling", map: MAP, source: "temp" } },
    ],
  });

  // 9773 Of the Sorrows
  bot.questPlan(9773, {
    "86482": [
      { farm: { item: 86482, monster: "Warden Iseul", map: MAP, source: "temp" } },
    ],
    "86483": [{ gather: { id: 13301, map: MAP } }],
  });

  // 9775 Cold-Blooded Torture
  bot.questPlan(9775, {
    "86484": [
      { farm: { item: 86484, monster: "Ice Guardian", map: MAP, source: "temp" } },
    ],
  });

  // 9776 Echoing Cries
  bot.questPlan(9776, {
    "86485": [
      { farm: { item: 86485, monster: "Bone Dragonling", map: MAP, source: "temp" } },
    ],
  });

  // 9777 Dragon's Seal
  bot.questPlan(9777, {
    "86486": [
      { farm: { item: 86486, monster: "Volgritian", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Naoise Grave complete");
}
