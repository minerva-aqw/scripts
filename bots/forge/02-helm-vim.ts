/// name: Vim
/// desc: Unlock the Vim Forge helm enhancement.
///
/// Quest 8824 is the first helm tier: level 70, Blacksmithing rank 7 (78,400
/// rep), and 250 Ethereal Essence. The essence drops from the Dreadrooms of
/// /towerofdoom10, and floor 8 is the cell with three of them.
///
/// The wiki lists the Rogue class at rank 10 as a requirement. The quest data
/// carries no class gate (its accept requirement is the class item at quantity
/// zero), and the live accept answered success on an account that does not own
/// Rogue, so no class is bought or ranked here.
///
/// Every tower room reads quest value slot 159 on the frame it plays, so the top
/// value is opened before the travel.

const QUEST = 8824;
const SLOT = 159;
const TOP = 10;
const LEVEL = 70;
const RANK = 7;
const ESSENCE = 71878;
const NEED = 250;

function unlock(): void {
  // The tower's rooms read the slot on the entry frame; the top value is opened
  // before the travel.
  openQuestSlot("vim", SLOT, TOP);

  bot.notify("Vim: " + NEED + " Ethereal Essence from floor 8");
  bot.questPlan(QUEST, {
    "71878": [
      {
        farm: {
          item: ESSENCE,
          monster: "*",
          cell: "r8",
          map: "towerofdoom10",
        },
      },
    ],
  });
  bot.notify("Vim unlocked");
}

if (bot.quest(QUEST).done()) {
  bot.notify("Vim is already unlocked");
} else {
  requireLevel("vim", LEVEL);
  requireRank("vim", "Blacksmithing", RANK);
  unlock();
}
