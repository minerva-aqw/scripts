/// name: Examen
/// desc: Unlock the Examen Forge helm enhancement.
///
/// Quest 8825 is the second helm tier: level 70, Blacksmithing rank 7 (78,400
/// rep), and 250 Ethereal Essence from the Dreadrooms of /towerofdoom10, floor
/// 8, the cell with three of them.
///
/// Its accept requirement is the Healer class at quantity zero, the same shape
/// 8824 carries for Rogue — and that one accepted on an account with no Rogue at
/// all — so no class is bought or ranked here.
///
/// Every tower room reads quest value slot 159 on the frame it plays, so the top
/// value is opened before the travel.

const QUEST = 8825;
const SLOT = 159;
const TOP = 10;
const LEVEL = 70;
const RANK = 7;
const ESSENCE = 71878;
const NEED = 250;

function unlock(): void {
  // The tower's rooms read the slot on the entry frame; the top value is opened
  // before the travel.
  openQuestSlot("examen", SLOT, TOP);

  bot.notify("Examen: " + NEED + " Ethereal Essence from floor 8");
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
  bot.notify("Examen unlocked");
}

if (bot.quest(QUEST).done()) {
  bot.notify("Examen is already unlocked");
} else {
  requireLevel("examen", LEVEL);
  requireRank("examen", "Blacksmithing", RANK);
  unlock();
}
