/// name: Forge cape enhancement
/// desc: Unlock the Forge cape enhancement with the four Infernal wings.
///
/// Quest 8758 takes one wing from each Infernal commander: the Diabolical
/// Warlord in /lostruinswar, the Infernal Warlord in /lostruins, and Azkorath
/// and Malxas in /infernalspire. The data gates it on level 30 and Blacksmithing
/// rank 4 (10,000 rep); anything else the server wants is left to the accept.
///
/// Every one of the four stands alone in its cell, so no farm here needs a
/// blocker.

const QUEST = 8758;
const LEVEL = 30;
const RANK = 4;

const WINGS = [31040, 31044, 36468, 36473];

function stop(message: string): never {
  bot.notify(message);
  throw new Error(message);
}

function guard(): void {
  const level = (bot.me() as { level: number }).level;
  if (level < LEVEL) {
    stop("forge cape needs level " + LEVEL + ", this character is level " + level);
  }
  const faction = bot.rep("Blacksmithing") as { found: boolean; rank: number };
  if (!faction.found) stop("forge cape: no Blacksmithing faction on this character");
  if (faction.rank < RANK) {
    stop(
      "forge cape needs Blacksmithing rank " + RANK + " (10,000 rep), the character is rank " +
        faction.rank + "; run Blacksmithing reputation first"
    );
  }
}

/// Move a wing a previous run left in the bank into the backpack: the projection
/// counts the bank, the turn-in takes the bag only. A wing that is not owned yet
/// reads `ok:false` here and is left to the plan.
function bagWings(): void {
  for (const wing of WINGS) bot.ensureItemState(wing, 1);
}

function unlock(): void {
  bagWings();

  bot.notify("Forge cape: Diabolical Warlord, Malxas, Infernal Warlord, Azkorath");
  bot.questPlan(QUEST, {
    "31040": [
      {
        farm: {
          item: 31040,
          monster: "Diabolical Warlord",
          cell: "r7",
          map: "lostruinswar",
          notify: "Forge cape: Prismatic Celestial Wings",
        },
      },
    ],
    "36473": [
      {
        farm: {
          item: 36473,
          monster: "Malxas",
          cell: "r21a",
          map: "infernalspire",
          notify: "Forge cape: Wings Of Destruction",
        },
      },
    ],
    "31044": [
      {
        farm: {
          item: 31044,
          monster: "Infernal Warlord",
          cell: "r7",
          map: "lostruins",
          notify: "Forge cape: Broken Wings",
        },
      },
    ],
    "36468": [
      {
        farm: {
          item: 36468,
          monster: "Azkorath",
          cell: "r16",
          map: "infernalspire",
          notify: "Forge cape: Shadow's Wings",
        },
      },
    ],
  });
  bot.notify("Forge cape enhancement unlocked");
}

if (bot.quest(QUEST).done()) {
  bot.notify("Forge cape enhancement is already unlocked");
} else {
  guard();
  unlock();
}
