/// name: Tower of Doom
/// desc: Complete the ten Tower of Doom floor quests.
///
/// Each floor is one quest (3475-3484) with one boss in r10. The quests share
/// one progression slot, so a completed higher floor means the lower floors
/// are done too; the loop still checks each floor and skips what is finished.

const BASE = 3474;
const LAST_FLOOR = 10;
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

if (bot.quest(BASE + LAST_FLOOR).done()) {
  bot.notify("Tower of Doom is already complete");
} else {
  bot.notify("Tower of Doom: starting");

  for (const floor of FLOORS) {
    const quest = bot.quest(BASE + floor.floor);
    if (quest.done()) continue;
    if (!quest.active()) quest.accept();

    const map = floor.floor === 1 ? "towerofdoom" : "towerofdoom" + floor.floor;
    bot.travel(map, "r10", "Left");
    bot.kill({ monster: floor.monster, count: 1 });
    quest.turnIn();

    bot.notify("Tower of Doom: floor " + floor.floor + " done");
  }

  bot.notify("Tower of Doom complete");
}
