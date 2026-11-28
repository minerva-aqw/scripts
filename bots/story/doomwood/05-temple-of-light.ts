/// name: Temple of the Light
/// desc: Complete the Temple of the Light chapter, the fifth part of the Doomwood saga.
///
/// Twenty-five quests on slot 49, values 1 through 25, inside /temple; there is
/// no 1136 in the quest data, so the run steps from Level 13 to Level 14. Most
/// of them are one level of the temple: three or four temp materials each, some
/// from a monster and some from a map object, and the rooms Skua pins (r2 for
/// the first level, r3, r4, r5, r7) are pinned here.
///
/// 1144's Temple Key is the one permanent requirement in the chapter, so it
/// counts the backpack and the farm claims it without being told.
///
/// 1148 is the exception: the Scroll of Cure Petrification is not a drop, it is
/// the Stone Paladin merge in this map (shop 287), made from a Basilisk's Scale
/// and a Scroll of Magic Inversion, both dropped by a Shelleton in r2. Those two
/// components have no id in any offline record, and a farm without an id cannot
/// claim its own floor drop, so the merge itself is left to the player: the run
/// checks for the scroll, merges nothing, and stops with the instruction if it
/// is not there yet. Run the bot again once it is, and 1148 turns in.

const TEMPLE = "temple";
const LAST = 1148;
const SCROLL = 8490;

if (!bot.quest(LAST).done()) {
  // 1123 Level 1
  bot.questPlan(1123, {
    "8449": [{ farm: { item: 8449, monster: "Slimeskull", cell: "r2", map: TEMPLE, source: "temp", pickup: 8449 } }],
    "8450": [{ farm: { item: 8450, monster: "Doomwood Bonemuncher", cell: "r2", map: TEMPLE, source: "temp", pickup: 8450 } }],
    "8451": [{ farm: { item: 8451, monster: "Shelleton", cell: "r2", map: TEMPLE, source: "temp", pickup: 8451 } }],
  });

  // 1124 Level 2
  bot.questPlan(1124, {
    "8452": [{ gather: { id: 456, map: TEMPLE } }],
    "8453": [{ farm: { item: 8453, monster: "Undead Mage", cell: "r3", map: TEMPLE, source: "temp", pickup: 8453 } }],
    "8454": [{ farm: { item: 8454, monster: "Doomwood Ectomancer", cell: "r3", map: TEMPLE, source: "temp", pickup: 8454 } }],
  });

  // 1125 Level 3
  bot.questPlan(1125, {
    "8456": [{ farm: { item: 8456, monster: "Lich", cell: "r4", map: TEMPLE, source: "temp", pickup: 8456 } }],
    "8455": [{ farm: { item: 8455, monster: "Ghoul", cell: "r4", map: TEMPLE, source: "temp", pickup: 8455 } }],
  });

  // 1126 Level 4
  bot.questPlan(1126, {
    "8457": [{ gather: { id: 457, map: TEMPLE } }],
    "8458": [{ farm: { item: 8458, monster: "Skeletal Fire Mage", cell: "r5", map: TEMPLE, source: "temp", pickup: 8458 } }],
  });

  // 1127 Level 5
  bot.questPlan(1127, {
    "8459": [{ farm: { item: 8459, monster: "Doomwood Ectomancer", map: TEMPLE, source: "temp", pickup: 8459 } }],
  });

  // 1128 Level 6
  bot.questPlan(1128, {
    "8460": [{ farm: { item: 8460, monster: "Doomwood Bonemuncher", cell: "r2", map: TEMPLE, source: "temp", pickup: 8460 } }],
    "8461": [{ farm: { item: 8461, monster: "Sanguine Souleater", cell: "r7", map: TEMPLE, source: "temp", pickup: 8461 } }],
  });

  // 1129 Level 7
  bot.questPlan(1129, {
    "8462": [{ gather: { id: 458, map: TEMPLE } }],
  });

  // 1130 Level 8
  bot.questPlan(1130, {
    "8464": [{ farm: { item: 8464, monster: "Doomwood Ectomancer", map: TEMPLE, source: "temp", pickup: 8464 } }],
    "8463": [{ farm: { item: 8463, monster: "Skeletal Fire Mage", map: TEMPLE, source: "temp", pickup: 8463 } }],
  });

  // 1131 Level 9
  bot.questPlan(1131, {
    "8465": [{ gather: { id: 459, map: TEMPLE } }],
    "8466": [{ farm: { item: 8466, monster: "Ghoul", map: TEMPLE, source: "temp", pickup: 8466 } }],
  });

  // 1132 Level 10
  bot.questPlan(1132, {
    "8467": [{ farm: { item: 8467, monster: "Doomwood Ectomancer", map: TEMPLE, source: "temp", pickup: 8467 } }],
  });

  // 1133 Level 11
  bot.questPlan(1133, {
    "8468": [{ gather: { id: 460, map: TEMPLE } }],
    "8469": [{ farm: { item: 8469, monster: "Sanguine Souleater", map: TEMPLE, source: "temp", pickup: 8469 } }],
  });

  // 1134 Level 12
  bot.questPlan(1134, {
    "8470": [{ farm: { item: 8470, monster: "Slimeskull", map: TEMPLE, source: "temp", pickup: 8470 } }],
    "8471": [{ farm: { item: 8471, monster: "Doomwood Ectomancer", map: TEMPLE, source: "temp", pickup: 8471 } }],
  });

  // 1135 Level 13
  bot.questPlan(1135, {
    "8472": [{ gather: { id: 461, map: TEMPLE } }],
  });

  // 1137 Level 14
  bot.questPlan(1137, {
    "8473": [{ farm: { item: 8473, monster: "Doomwood Soldier", map: TEMPLE, source: "temp", pickup: 8473 } }],
  });

  // 1138 Level 15
  bot.questPlan(1138, {
    "8474": [{ farm: { item: 8474, monster: "Ghoul", map: TEMPLE, source: "temp", pickup: 8474 } }],
  });

  // 1139 Level 16
  bot.questPlan(1139, {
    "8475": [{ gather: { id: 462, map: TEMPLE } }],
  });

  // 1140 Level 17
  bot.questPlan(1140, {
    "8476": [{ farm: { item: 8476, monster: "Doomwood Bonemuncher", map: TEMPLE, source: "temp", pickup: 8476 } }],
    "8477": [{ farm: { item: 8477, monster: "Skeleton", map: TEMPLE, source: "temp", pickup: 8477 } }],
  });

  // 1141 Level 18
  bot.questPlan(1141, {
    "8478": [{ farm: { item: 8478, monster: "Undead Mage", map: TEMPLE, source: "temp", pickup: 8478 } }],
    "8479": [{ farm: { item: 8479, monster: "Skeletal Fire Mage", map: TEMPLE, source: "temp", pickup: 8479 } }],
  });

  // 1142 Level 19
  bot.questPlan(1142, {
    "8480": [{ gather: { id: 463, map: TEMPLE } }],
    "8481": [{ farm: { item: 8481, monster: "Shelleton", map: TEMPLE, source: "temp", pickup: 8481 } }],
    "8482": [{ farm: { item: 8482, monster: "Skeleton", map: TEMPLE, source: "temp", pickup: 8482 } }],
  });

  // 1143 Level 20
  bot.questPlan(1143, {
    "8483": [{ farm: { item: 8483, monster: "Lich", map: TEMPLE, source: "temp", pickup: 8483 } }],
  });

  // 1144 Defy the Dracolich
  bot.questPlan(1144, {
    "8525": [{ farm: { item: 8525, monster: "Dracolich", map: TEMPLE } }],
  });

  // 1145 Restore the Tome
  bot.questPlan(1145, {
    "8485": [{ gather: { id: 464, map: TEMPLE } }],
  });

  // 1146 Recover the Pages
  bot.questPlan(1146, {
    "8486": [{ farm: { item: 8486, monster: "Doomwood Bonemuncher", map: TEMPLE, source: "temp", pickup: 8486 } }],
  });

  // 1147 Reconstruct the Codex
  bot.questPlan(1147, {
    "8487": [{ farm: { item: 8487, monster: "Cryptkeeper Lich", map: TEMPLE, source: "temp", pickup: 8487 } }],
  });

  // 1148 Galvanize the Guardian
  bot.travel(TEMPLE);
  if (!(bot.ensureItemState(SCROLL, 1) as { ok: boolean }).ok) {
    stopRun(
      "temple: 1148 needs the Stone Paladin merge (shop 287): merge a Basilisk's Scale and a Scroll of Magic Inversion, both dropped by a Shelleton in r2, then run this bot again"
    );
  }
  bot.questPlan(1148, {});

  bot.notify("Temple of the Light complete");
}
