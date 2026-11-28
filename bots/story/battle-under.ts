/// name: Battle Under
/// desc: Complete the Battle Under saga from A to E in one run.
///
/// Five maps and two chains: A, B, C and D walk quest value slot 24 from 1 to
/// 18, and E sits on its own slot, 242. Every quest in the chain except 2215 is
/// repeatable, so neither `done()` nor the plan's own skip separates a finished
/// quest from an untouched one. The slot value is the only marker, and each
/// quest is skipped once its slot has reached that quest's value, so a second
/// run resumes at the first quest still owed.
///
/// D is member content. The engine cannot read the membership flag, so D runs
/// last: an account without membership finishes A, B, C and E and then meets
/// the server's refusal at 2211, which is the only honest way to say it.
///
/// Four rewards are claimed, because a later step or the Destiny chain wants
/// them: the Chopping Pole Arm from 689, the Undead Essence and Cavern
/// Celestite from 939, and the Battle Pickaxe that 2215 asks to own. The random
/// Deathknight gear from 690-692 is gear, not a material, and is left behind.

const A = "battleundera";
const B = "battleunderb";
const C = "battleunderc";
const D = "battleunderd";
const E = "battleundere";

const SLOT = 24;
const E_SLOT = 242;
const PICKAXE = 12838;

/// `runChainQuest(slot, value, quest, handlers, opts?)`: run one quest unless
/// its chain slot has already passed that quest's value.
function runChainQuest(
  slot: number,
  value: number,
  quest: number,
  handlers: QuestPlanHandlers,
  opts?: QuestPlanOpts
): void {
  if ((bot.questValue(slot) as number) >= value) return;
  bot.questPlan(quest, handlers, opts);
}

/// `claimReward(item, quest)`: a reward that did not reach the bag is claimed
/// off the floor. `ensureItemState` covers the direct grant and unbanks a copy
/// from an earlier run; `pickupNow` answers `absent` without waiting, so the
/// loop is bounded and the failure names both ids.
function claimReward(item: number, quest: number): void {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    if ((bot.ensureItemState(item, 1) as { ok: boolean }).ok) return;
    if ((bot.pickupNow(item) as { ok: boolean }).ok) return;
  }
  stopRun("battle under: quest " + quest + " pays item " + item + " and it is neither in the bag nor on the floor");
}

// Part A
runChainQuest(SLOT, 1, 374, {
  "1966": [{ farm: { item: 1966, monster: "Skeletal Warrior", map: A, source: "temp", pickup: 1966 } }],
});

runChainQuest(SLOT, 2, 375, {
  "1968": [{ farm: { item: 1968, monster: "Skeletal Warrior", map: A, source: "temp", pickup: 1968 } }],
  "1967": [{ farm: { item: 1967, monster: "Skeletal Warrior", map: A, source: "temp", pickup: 1967 } }],
});

runChainQuest(SLOT, 3, 376, {
  "1969": [{ farm: { item: 1969, monster: "Bone Terror", map: A, source: "temp", pickup: 1969 } }],
});

runChainQuest(
  SLOT,
  4,
  377,
  {
    "1970": [{ farm: { item: 1970, monster: "Skeletal Warrior", map: A } }],
  },
  { choice: 0 }
);

// Part B
runChainQuest(
  SLOT,
  5,
  689,
  {
    "5148": [{ farm: { item: 5148, monster: "Skeleton Warrior", map: B, source: "temp", pickup: 5148 } }],
  },
  { choice: 0 }
);
claimReward(5165, 689);

runChainQuest(
  SLOT,
  6,
  690,
  {
    "5149": [{ farm: { item: 5149, monster: "Skeleton Warrior", map: B, source: "temp", pickup: 5149 } }],
  },
  { choice: 0 }
);

runChainQuest(
  SLOT,
  7,
  691,
  {
    "5150": [{ farm: { item: 5150, monster: "Skeleton Warrior", map: B, source: "temp", pickup: 5150 } }],
  },
  { choice: 0 }
);

runChainQuest(
  SLOT,
  8,
  692,
  {
    "5151": [{ farm: { item: 5151, monster: "Undead Champion", map: B, source: "temp", pickup: 5151 } }],
  },
  { choice: 0 }
);

runChainQuest(SLOT, 9, 935, {
  "6700": [{ gather: { id: 253, map: B } }],
});

// Part C
runChainQuest(SLOT, 10, 936, {
  "6701": [{ farm: { item: 6701, monster: "Blue Crystalized Undead", map: C, source: "temp", pickup: 6701 } }],
});

runChainQuest(SLOT, 11, 937, {
  "6702": [{ farm: { item: 6702, monster: "Blue Crystalized Undead", map: C, source: "temp", pickup: 6702 } }],
});

// The jellyfish that pays the capture is the big one on the boss screen: the
// two smaller Purple Crystalized Jellyfish carry the same substring in their
// name but drop Crystal Cores, not the quest item. `r5` is the screen Skua
// farms its Jellyfish Soul from, so the click lands on the right one.
runChainQuest(SLOT, 12, 938, {
  "6703": [{ farm: { item: 6703, monster: "Crystalized Jellyfish", cell: "r5", map: C, source: "temp", pickup: 6703 } }],
});

runChainQuest(
  SLOT,
  13,
  939,
  {
    "6704": [{ farm: { item: 6704, monster: "Bone Terror", map: A, source: "temp", pickup: 6704 } }],
    "6705": [{ farm: { item: 6705, monster: "Undead Champion", map: B, source: "temp", pickup: 6705 } }],
    "6706": [{ farm: { item: 6706, monster: "Crystalized Jellyfish", cell: "r5", map: C, source: "temp", pickup: 6706 } }],
  },
  { choice: 0 }
);
claimReward(6697, 939);
claimReward(6699, 939);

// Part E, before D because D is the member-only one
runChainQuest(E_SLOT, 1, 5927, {
  "40580": [{ gather: { id: 5362, map: E } }],
  "40581": [{ farm: { item: 40581, monster: "Lava Guard", map: E, source: "temp", pickup: 40581 } }],
});

runChainQuest(E_SLOT, 2, 5928, {
  "40582": [{ farm: { item: 40582, monster: "Hot Mama", map: E, source: "temp", pickup: 40582 } }],
});

// Part D
runChainQuest(SLOT, 14, 2211, {
  "12850": [{ farm: { item: 12850, monster: "Shivering Bones", cell: "Enter", map: D, source: "temp", pickup: 12850 } }],
});

runChainQuest(SLOT, 15, 2212, {
  "12852": [{ farm: { item: 12852, monster: "Icy Banshee", cell: "r2", map: D, source: "temp", pickup: 12852 } }],
  "12851": [{ gather: { id: 1286, map: D } }],
});

runChainQuest(
  SLOT,
  16,
  2213,
  {
    "12853": [{ farm: { item: 12853, monster: "Skeletal Warrior", cell: "r5", map: D, source: "temp", pickup: 12853 } }],
  },
  { choice: 0 }
);
claimReward(PICKAXE, 2213);

runChainQuest(SLOT, 17, 2214, {
  "12854": [{ gather: { id: 1287, map: D } }],
  "12855": [{ farm: { item: 12855, monster: "Glacial Horror", cell: "r5", map: D, source: "temp", pickup: 12855 } }],
});

// 2215 asks to own the pickaxe, not to carry it into the turn-in.
bot.ensureItemState(PICKAXE, 1);

runChainQuest(
  SLOT,
  18,
  2215,
  {
    "12856": [{ gather: { id: 1288, map: D } }],
  },
  { choice: 0 }
);

if ((bot.questValue(SLOT) as number) >= 18 && (bot.questValue(E_SLOT) as number) >= 2) {
  bot.notify("Battle Under complete");
}
