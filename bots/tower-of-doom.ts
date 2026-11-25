/// name: Tower of Doom
/// desc: Complete the ten Tower of Doom floor quests.
///
/// Each floor is one quest (3475-3484) with one boss in r10. The quests share
/// one progression slot, so a completed higher floor means the lower floors
/// are done too; the loop still checks each floor and skips what is finished.
///
/// The map refuses a direct jump to r10 until the nine floors below it are
/// cleared, so the bot walks up floor by floor and empties each one first.

const BASE = 3474;
const LAST_FLOOR = 10;
// Every tower floor shares this progression slot. The floor doors read it, so
// it must be high enough to reach r10 even when the server-side quest is not
// done yet. Restore it after entering: `done()` also reads the slot.
const PROGRESS_SLOT = 159;
const FLOOR_UNLOCK = 10;
// Each floor clears after its three resident monsters die. They respawn
// immediately, so `clear` would never see an empty cell. A floor that is
// already cleared has no monsters, and that is not a failure.
function clearFloor(): void {
  try {
    bot.kill({ monster: "*", count: 3 });
  } catch (error) {
    if (!String(error).includes("no *")) throw error;
  }
}

const FLOORS: Array<{ floor: number; monster: string }> = [
  { floor: 1, monster: "Dread Klunk" },
  { floor: 2, monster: "Dread Arradia" },
  { floor: 3, monster: "Dread Moganth" },
  { floor: 4, monster: "Dread Kathool" },
  { floor: 5, monster: "Creel" },
  { floor: 6, monster: "Dread Terror" },
  { floor: 7, monster: "Dread Warrior" },
  { floor: 8, monster: "Dread Avatar" },
  { floor: 9, monster: "Dread Fang" },
  { floor: 10, monster: "Slugbutter" },
];

if (!bot.quest(BASE + LAST_FLOOR).done()) {
  for (const floor of FLOORS) {
    const quest = bot.quest(BASE + floor.floor);
    // The slot is only a hint: a stopped run can leave it behind. The quest
    // record is the truth for resuming a partly finished tower.
    if (quest.done()) continue;
    const progress = Math.max(0, bot.questValue(PROGRESS_SLOT) as number);
    if (progress >= floor.floor) continue;

    const map = floor.floor === 1 ? "towerofdoom" : "towerofdoom" + floor.floor;

    if (!quest.active()) quest.accept();

    // Keep the slot at the unlock value for the whole visit. Lowering it
    // before the climb makes the map's floor frame send the avatar to Prison.
    let cleared = false;
    bot.setQuestValue(PROGRESS_SLOT, FLOOR_UNLOCK);
    try {
      bot.travel(map);
      // The first map enters into a lobby and starts at r1. Maps 2-10 enter
      // directly on their first floor, which is the Enter cell; they have no
      // r1 at all.
      if (floor.floor === 1) bot.cell("r1");
      clearFloor();
      for (let below = 2; below < LAST_FLOOR; below++) {
        bot.cell("r" + below);
        clearFloor();
      }
      bot.cell("r" + LAST_FLOOR, "Left");
      bot.kill({ monster: floor.monster, count: 1 });
      quest.turnIn();
      cleared = true;
    } finally {
      bot.setQuestValue(PROGRESS_SLOT, cleared ? floor.floor : floor.floor - 1);
    }
  }

  bot.notify("Tower of Doom complete");
}
