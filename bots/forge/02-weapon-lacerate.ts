/// name: Lacerate
/// desc: Unlock the Lacerate Forge weapon enhancement.
///
/// Quest 8739 is the first weapon tier above the base Forge unlock: level 40 and
/// Blacksmithing rank 5 (22,500 rep). Six materials, two of them direct boss
/// drops (Kuro in /river, Big Jack Sprat in /graveyard) and four that are the
/// reward of their own small quest: Massive Horc Cleaver, Sword in the Stone,
/// Forest Axe and Black Knight Orb. The four are collected first, so the main
/// plan only has to hunt the two drops.
///
/// Every temp quest item here lands on the floor as a drop, and a temp-source
/// farm is out of the mission sweep by default, so each one declares `pickup`
/// to claim its own drop. The two map objects are grants instead and need none.
///
/// Three of the four reward items land on the floor too, and a turn-in leaves
/// them there: the cleaver, the sword and the axe are claimed right after the
/// quest that pays them, before the next plan travels away and takes the floor
/// with it. The Black Knight Orb is granted straight to the backpack.
///
/// The quest shares slot 10 with the three Hit Job quests that precede it
/// (values 1 to 3; its own is 4), so the accept needs that chain finished. It is
/// walked here when the slot reads lower.

const QUEST = 8739;
const UNLOCK = 92;
const LEVEL = 40;
const RANK = 5;

const MATERIALS = [1196, 1532, 1576, 1581];

/// A material is owned when it is in the backpack or the bank. The bank may
/// read unknown on an unloaded bank, which only means its quest runs again.
function owned(item: number): boolean {
  const state = bot.itemState(item) as { presence: string; banked: string };
  return state.presence === "present" || state.banked === "present";
}

/// A reward that did not reach the bag is claimed off the floor. `pickupNow`
/// answers `absent` without waiting when the drop has not landed yet, so the
/// bag read at the head of each attempt is what spaces the retry.
function settle(item: number, quest: number): void {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const state = bot.itemState(item) as { presence: string };
    if (state.presence === "present") return;
    const claim = bot.pickupNow(item) as { ok: boolean };
    if (claim.ok) return;
  }
  stopRun("lacerate: quest " + quest + " pays item " + item + " and it is neither in the bag nor on the floor");
}

function hitJob(): void {
  if (bot.quest(UNLOCK).done()) return;
  bot.questPlan(90, {
    "435": [
      {
        farm: {
          item: 435,
          pickup: 435,
          monster: "Shark Bait",
          cell: "End",
          map: "pirates",
          source: "temp",
        },
      },
    ],
  });
  bot.questPlan(91, {
    "42651": [
      {
        farm: {
          item: 42651,
          pickup: 42651,
          monster: "Kittarian",
          cell: "West1",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
    "42652": [
      {
        farm: {
          item: 42652,
          pickup: 42652,
          monster: "River Fishman",
          cell: "West9",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
    "42653": [
      {
        farm: {
          item: 42653,
          pickup: 42653,
          monster: "Slime",
          cell: "West10",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
    "42654": [
      {
        farm: {
          item: 42654,
          pickup: 42654,
          monster: "Frogzard",
          cell: "West3",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
    "42655": [
      {
        farm: {
          item: 42655,
          pickup: 42655,
          monster: "Big Bad Boar",
          cell: "West12",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
  });
  bot.questPlan(92, {
    "42649": [
      {
        farm: {
          item: 42649,
          pickup: 42649,
          monster: "Breken the Vile",
          cell: "West5",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
    "42650": [
      {
        farm: {
          item: 42650,
          pickup: 42650,
          monster: "Ogug Stoneaxe",
          cell: "West11",
          map: "greenguardwest",
          source: "temp",
        },
      },
    ],
  });
}

function horcCleaver(): void {
  bot.questPlan(
    279,
    {
      "1204": [
        {
          farm: {
            item: 1204,
            pickup: 1204,
            monster: "Horc Master",
            cell: "r3",
            map: "warhorc",
            source: "temp",
          },
        },
      ],
    },
    { choice: 0 }
  );
  settle(1196, 279);
}

function swordInStone(): void {
  bot.questPlan(
    316,
    {
      // Map object 54 grants 1567 itself, so it is a gather and not a farm.
      "1567": [{ gather: { id: 54, map: "greenguardeast", qty: 7 } }],
      "8703": [
        {
          farm: {
            item: 8703,
            pickup: 8703,
            monster: "Spider",
            map: "greenguardeast",
            source: "temp",
          },
        },
      ],
    },
    { choice: 0 }
  );
  settle(1532, 316);
}

function blackKnightOrb(): void {
  bot.questPlan(
    318,
    {
      "1577": [
        {
          farm: {
            item: 1577,
            pickup: 1577,
            monster: "Gell Oh No",
            map: "well",
            source: "temp",
          },
        },
      ],
      "1578": [
        {
          farm: {
            item: 1578,
            pickup: 1578,
            monster: "Greenguard Dragon",
            map: "greendragon",
            source: "temp",
          },
        },
      ],
      "1579": [
        {
          farm: {
            item: 1579,
            pickup: 1579,
            monster: "Deathgazer",
            map: "deathgazer",
            source: "temp",
          },
        },
      ],
      "1580": [
        {
          farm: {
            item: 1580,
            pickup: 1580,
            monster: "GreenGuard Basilisk",
            map: "trunk",
            source: "temp",
          },
        },
      ],
    },
    { choice: 0 }
  );
  settle(1576, 318);
}

function forestAxe(): void {
  bot.questPlan(
    301,
    {
      // Map object 55 grants 1548 itself, so it is a gather and not a farm.
      "1548": [{ gather: { id: 55, map: "farm", qty: 4 } }],
      "15199": [
        {
          farm: {
            item: 15199,
            pickup: 15199,
            monster: "Mosquito",
            map: "farm",
            source: "temp",
          },
        },
      ],
    },
    { choice: 0 }
  );
  settle(1581, 301);
}

function unlock(): void {
  hitJob();

  bot.notify("Lacerate: the four materials");
  if (!owned(1196)) horcCleaver();
  if (!owned(1532)) swordInStone();
  if (!owned(1576)) blackKnightOrb();
  if (!owned(1581)) forestAxe();

  // The projection counts the bank; the turn-in takes the bag only.
  for (const item of MATERIALS) bot.ensureItemState(item, 1);

  // The two main drops are permanent, so the farm sweeps its own item.
  bot.questPlan(QUEST, {
    "369": [
      {
        farm: {
          item: 369,
          monster: "Kuro",
          cell: "End",
          map: "river",
          notify: "Lacerate: Kuro's Wrath",
        },
      },
    ],
    "62": [
      {
        farm: {
          item: 62,
          monster: "Big Jack Sprat",
          cell: "End",
          map: "graveyard",
          notify: "Lacerate: Undead Plague Spear",
        },
      },
    ],
  });
  bot.notify("Lacerate unlocked");
}

if (bot.quest(QUEST).done()) {
  bot.notify("Lacerate is already unlocked");
} else {
  requireLevel("lacerate", LEVEL);
  requireRank("lacerate", "Blacksmithing", RANK);
  unlock();
}
