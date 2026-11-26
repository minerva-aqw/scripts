/// name: Sea Voice
/// desc: Complete the Sea Voice chapter of the Age of Ruin saga.
///
/// The Voice in the Sea fight is built around the Vigil potion in slot 5, and
/// the engine cannot equip a potion. Equip Vigil before running this chapter,
/// or the boss is the unwinnable version. The Mopping Up turn-in is back in
/// Termina Temple.

const SEA = "seavoice";
const TEMPLE = "terminatemple";
const LAST = 9351;

if (!bot.quest(LAST).done()) {
  // 9348 Dead Sea
  bot.questPlan(9348, {
    "79182": [
      { farm: { item: 79182, monster: "Voice in the Sea", map: SEA, source: "temp" } },
    ],
  });

  // 9351 Mopping Up
  bot.questPlan(9351, {
    "56676": [{ gather: { id: 12050, map: TEMPLE } }],
    "54321": [{ gather: { id: 12051, map: TEMPLE } }],
  });

  bot.notify("Sea Voice complete");
}
