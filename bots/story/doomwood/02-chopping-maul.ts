/// name: Chopping Maul
/// desc: Complete the Chopping Maul chapter, the second part of the Doomwood saga.
///
/// Five quests on slot 47, values 10 through 14, all inside /maul. Two are
/// map-item collects, so `gather` grants them straight into temp inventory; the
/// other three are monster drops, temp, and claim their own floor drop.
///
/// 1084 pins r2 for its wildcard farm, the room Skua farms the body parts in,
/// and 1082 clicks the same stink candle thirteen times — `gather` sends
/// getMapItem until the requirement's own count is met, one send per second.

const MAUL = "maul";
const LAST = 1085;

if (!bot.quest(LAST).done()) {
  // 1081 Zorbak's Hideout
  bot.questPlan(1081, {
    "7737": [{ gather: { id: 435, map: MAUL } }],
  });

  // 1082 Stink-tuary
  bot.questPlan(1082, {
    "7773": [{ gather: { id: 434, map: MAUL } }],
  });

  // 1083 The Infected
  bot.questPlan(1083, {
    "7940": [{ farm: { item: 7940, monster: "Personal Chopper", map: MAUL, source: "temp", pickup: 7940 } }],
    "7915": [{ farm: { item: 7915, monster: "Slimeskull", map: MAUL, source: "temp", pickup: 7915 } }],
  });

  // 1084 Chopping Spree
  bot.questPlan(1084, {
    "7916": [{ farm: { item: 7916, monster: "*", cell: "r2", map: MAUL, source: "temp", pickup: 7916 } }],
    "7935": [{ gather: { id: 436, map: MAUL } }],
  });

  // 1085 GraveStop The Creature
  bot.questPlan(1085, {
    "7917": [{ farm: { item: 7917, monster: "Creature Creation", map: MAUL, source: "temp", pickup: 7917 } }],
  });

  bot.notify("Chopping Maul complete");
}
