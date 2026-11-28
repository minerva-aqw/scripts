/// name: Necro U
/// desc: Complete the Necro U chapter, the fourth part of the Doomwood saga.
///
/// Twelve quests on slot 47, values 18 through 29, all inside /necrou. The
/// saga script spells the map both ways (`necroU` and `necrou`); the world map
/// entry is `necrou`, so that is the name used here.
///
/// Seven map objects and ten monster drops make up the materials. Every drop
/// is temp, so each farm claims its own floor drop. 1116, 1120 and 1121 pay
/// items, so they name a reward choice: 1121 lists two, and index 0 takes the
/// first of them.
///
/// 1154 and 1170 carry no requirements at all in the quest data: they are chain
/// steps, so they run as empty plans. If the live 1170 asks for a Vordred kill
/// the plan fails by name, which is the loud failure and not a silent skip.

const NECROU = "necrou";
const LAST = 1170;

if (!bot.quest(LAST).done()) {
  // 1112 Silence is Ghoulden
  bot.questPlan(1112, {
    "8385": [{ farm: { item: 8385, monster: "Ghoul", map: NECROU, source: "temp", pickup: 8385 } }],
  });

  // 1113 Ghouls with Gall
  bot.questPlan(1113, {
    "8386": [{ gather: { id: 450, map: NECROU } }],
  });

  // 1114 Goals for Ghouls and Other Undead
  bot.questPlan(1114, {
    "8387": [{ farm: { item: 8387, monster: "Ghoul", map: NECROU, source: "temp", pickup: 8387 } }],
    "8388": [{ farm: { item: 8388, monster: "Doomwood Soldier", map: NECROU, source: "temp", pickup: 8388 } }],
    "8389": [{ farm: { item: 8389, monster: "Doomwood Soldier", map: NECROU, source: "temp", pickup: 8389 } }],
  });

  // 1115 Knee Bone's Connected to the Thigh Bone
  bot.questPlan(1115, {
    "8390": [{ gather: { id: 449, map: NECROU } }],
  });

  // 1116 Hip Bone's Connected to the Back Bone
  bot.questPlan(
    1116,
    {
      "8392": [{ farm: { item: 8392, monster: "Doomwood Soldier", map: NECROU, source: "temp", pickup: 8392 } }],
      "8391": [{ farm: { item: 8391, monster: "Doomwood Soldier", map: NECROU, source: "temp", pickup: 8391 } }],
    },
    { choice: 0 }
  );

  // 1117 Back Bone's Connected to the Neck Bone
  bot.questPlan(1117, {
    "8394": [{ gather: { id: 451, map: NECROU } }],
    "8395": [{ farm: { item: 8395, monster: "Doomwood Treeant", map: NECROU, source: "temp", pickup: 8395 } }],
  });

  // 1118 Slip 'n Slimes
  bot.questPlan(1118, {
    "8396": [{ gather: { id: 452, map: NECROU } }],
    "8397": [{ farm: { item: 8397, monster: "Slimeskull", map: NECROU, source: "temp", pickup: 8397 } }],
  });

  // 1119 Sl-eye-me
  bot.questPlan(1119, {
    "8398": [{ gather: { id: 453, map: NECROU } }],
  });

  // 1120 Bones Over Brawn
  bot.questPlan(
    1120,
    {
      "8399": [{ farm: { item: 8399, monster: "Doomwood Soldier", map: NECROU, source: "temp", pickup: 8399 } }],
    },
    { choice: 0 }
  );

  // 1121 Skullaton Shells
  // Two objects, one per requirement. The plan binds each click to the
  // requirement it fills, so a sibling that is already full cannot end it.
  bot.questPlan(
    1121,
    {
      "8400": [{ gather: { id: 454, map: NECROU } }],
      "8401": [{ gather: { id: 455, map: NECROU } }],
      "8402": [{ farm: { item: 8402, monster: "Shelleton", map: NECROU, source: "temp", pickup: 8402 } }],
    },
    { choice: 0 }
  );

  // 1154 Noxious Noxus
  bot.questPlan(1154, {});

  // 1170 Vordred Boss!
  bot.questPlan(1170, {});

  bot.notify("Necro U complete");
}
