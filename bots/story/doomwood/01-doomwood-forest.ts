/// name: Doomwood Forest
/// desc: Complete the Doomwood Forest chapter, the first part of the Doomwood saga.
///
/// Nine quests share quest value slot 47, so they run in value order and the
/// chapter ends on 1089. Every requirement is a temp quest item: a monster drop
/// claims itself off the floor with `pickup`, and the three map items are
/// collected through `gather`, which grants into temp inventory directly. 1080
/// and 1089 carry no requirements at all and only need the accept and turn-in.
///
/// Two rooms are pinned: 1064 takes its fingerbones from the Soldier room r8,
/// and 1066 is a wildcard farm in r6, the room that hands out the Warrior
/// token. Every other farm picks its own source cell.

const DOOMWOOD = "doomwood";
const KEEP = "doomundead";
const LAST = 1089;

if (!bot.quest(LAST).done()) {
  // 1080 Lightguard Keep Found
  bot.questPlan(1080, {});

  // 1064 Bony Battalion
  bot.questPlan(1064, {
    "7676": [{ farm: { item: 7676, monster: "Doomwood Ectomancer", map: DOOMWOOD, source: "temp", pickup: 7676 } }],
    "7677": [{ farm: { item: 7677, monster: "Doomwood Bonemuncher", map: DOOMWOOD, source: "temp", pickup: 7677 } }],
    "7678": [{ farm: { item: 7678, monster: "Doomwood Soldier", cell: "r8", map: DOOMWOOD, source: "temp", pickup: 7678 } }],
  });

  // 1065 Warrior Rez-queue
  bot.questPlan(1065, {
    "7679": [{ gather: { id: 423, map: DOOMWOOD } }],
  });

  // 1066 Bone-tired Backup
  bot.questPlan(1066, {
    "7734": [{ farm: { item: 7734, monster: "*", cell: "r6", map: DOOMWOOD, source: "temp", pickup: 7734 } }],
  });

  // 1067 Reconnaissance Route
  bot.questPlan(1067, {
    "7680": [{ gather: { id: 422, map: DOOMWOOD } }],
  });

  // 1068 Fight Against Shadowed Light
  bot.questPlan(1068, {
    "7681": [{ farm: { item: 7681, monster: "Undead Paladin", map: DOOMWOOD, source: "temp", pickup: 7681 } }],
  });

  // 1069 Camouflage: Skelly-Style
  bot.questPlan(1069, {
    "7682": [{ farm: { item: 7682, monster: "Doomwood Bonemuncher", map: DOOMWOOD, source: "temp", pickup: 7682 } }],
    "7683": [{ farm: { item: 7683, monster: "Doomwood Ectomancer", map: DOOMWOOD, source: "temp", pickup: 7683 } }],
    "7684": [{ farm: { item: 7684, monster: "Doomwood Bonemuncher", map: DOOMWOOD, source: "temp", pickup: 7684 } }],
    "7685": [{ farm: { item: 7685, monster: "Doomwood Soldier", map: DOOMWOOD, source: "temp", pickup: 7685 } }],
  });

  // 1070 De(ad)ception
  bot.questPlan(1070, {
    "7686": [{ gather: { id: 427, map: KEEP } }],
    "32875": [{ farm: { item: 32875, monster: "*", cell: "r3", map: KEEP, source: "temp", pickup: 32875 } }],
  });

  // 1089 Artix Stopped!
  bot.questPlan(1089, {});

  bot.notify("Doomwood Forest complete");
}
