/// name: Necro Tower
/// desc: Complete the Necro Tower chapter, the third part of the Doomwood saga.
///
/// Three quests on slot 47 (values 15 to 17) and then slot 48 from 1091 to
/// 1101. The ten floor quests carry no requirements at all: each is an accept
/// and a turn-in that advances the elevator, so they run as empty plans in
/// order, from inside the tower, and the server decides whether the next floor
/// is open.
///
/// 1087 farms both of its drops from room r2, the two names Skua pins there.
/// 1090's seal is not a name farm at all: it drops from the one spawn the saga
/// script targets by MonMapID, so the step pins id 4 rather than a monster.
///
/// 1086 (Un-fortune-ate Fountain) also sits at slot 47 value 1, but it is a
/// repeatable side quest with ten fortune rewards, not a chain step, and running
/// it here would hand the plan a reward choice the chapter does not want.

const NECROTOWER = "necrotower";
const DOOMWOOD = "doomwood";
const LAST = 1101;

if (!bot.quest(LAST).done()) {
  // 1087 ID What You Did There
  bot.questPlan(1087, {
    "8005": [{ farm: { item: 8005, monster: "Doomwood Treeant", cell: "r2", map: NECROTOWER, source: "temp", pickup: 8005 } }],
    "8006": [{ farm: { item: 8006, monster: "Slimeskull", cell: "r2", map: NECROTOWER, source: "temp", pickup: 8006 } }],
  });

  // 1088 The Ego and the ID
  bot.questPlan(1088, {
    "8008": [{ farm: { item: 8008, monster: "Doomwood Soldier", map: DOOMWOOD, source: "temp", pickup: 8008 } }],
    "8007": [{ farm: { item: 8007, monster: "Doomwood Soldier", map: DOOMWOOD, source: "temp", pickup: 8007 } }],
  });

  // 1090 An IDeal Seal
  bot.questPlan(1090, {
    "8009": [{ farm: { item: 8009, monster: "*", id: 4, map: NECROTOWER, source: "temp", pickup: 8009 } }],
  });

  // 1091 Need for Speed (Reading)!
  bot.questPlan(1091, {
    "8013": [{ gather: { id: 438, map: NECROTOWER } }],
  });

  // 1092-1101 the elevator floors, offered from inside the tower
  bot.travel(NECROTOWER);
  for (let floor = 1092; floor <= 1101; floor += 1) {
    bot.questPlan(floor, {});
  }

  bot.notify("Necro Tower complete");
}
