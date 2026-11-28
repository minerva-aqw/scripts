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
/// The quest shares slot 10 with the three Hit Job quests that precede it
/// (values 1 to 3; its own is 4), so the accept needs that chain finished. It is
/// walked here when the slot reads lower.

const QUEST = 8739;
const UNLOCK = 92;
const LEVEL = 40;
const RANK = 5;

function stop(message: string): never {
  bot.notify(message);
  throw new Error(message);
}

function guard(): void {
  const level = (bot.me() as { level: number }).level;
  if (level < LEVEL) {
    stop("lacerate needs level " + LEVEL + ", this character is level " + level);
  }
  const faction = bot.rep("Blacksmithing") as { found: boolean; rank: number };
  if (!faction.found) stop("lacerate: no Blacksmithing faction on this character");
  if (faction.rank < RANK) {
    stop(
      "lacerate needs Blacksmithing rank " + RANK + " (22,500 rep), the character is rank " +
        faction.rank + "; run Blacksmithing reputation first"
    );
  }
}

/// A material is ready when it sits in the backpack. The four quest rewards are
/// permanent, so one can be banked from an earlier run, and the turn-in takes
/// the bag only.
function ready(item: number): boolean {
  return (bot.ensureItemState(item, 1) as { ok: boolean }).ok;
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
}

function unlock(): void {
  hitJob();

  bot.notify("Lacerate: the four materials");
  if (!ready(1196)) horcCleaver();
  if (!ready(1532)) swordInStone();
  if (!ready(1576)) blackKnightOrb();
  if (!ready(1581)) forestAxe();

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
  guard();
  unlock();
}
