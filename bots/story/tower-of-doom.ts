/// name: Tower of Doom
/// desc: Climb the ten floors of the Tower of Doom story, one boss per floor.
///
/// The floors are a server-enforced chain: the server refuses an accept with
/// "complete all previous floors" when its own count is behind, so the floors
/// are always walked from the top and never skipped by slot value. The slot
/// (159) is only raised when it lags, and never rolled back. Each boss stands
/// alone in r10, so no cell is pinned.

const SLOT = 159;

const FLOORS = [
  { value: 1, map: "towerofdoom", quest: 3475, item: 23646, boss: "Dread Klunk" },
  { value: 2, map: "towerofdoom2", quest: 3476, item: 23647, boss: "Dread Arradia" },
  { value: 3, map: "towerofdoom3", quest: 3477, item: 23648, boss: "Dread Moganth" },
  { value: 4, map: "towerofdoom4", quest: 3478, item: 23649, boss: "Dread Kathool" },
  { value: 5, map: "towerofdoom5", quest: 3479, item: 23650, boss: "Creel" },
  { value: 6, map: "towerofdoom6", quest: 3480, item: 23651, boss: "Dread Terror" },
  { value: 7, map: "towerofdoom7", quest: 3481, item: 23652, boss: "Dread Warrior" },
  { value: 8, map: "towerofdoom8", quest: 3482, item: 23653, boss: "Dread Avatar" },
  { value: 9, map: "towerofdoom9", quest: 3483, item: 23654, boss: "Dread Fang" },
  { value: 10, map: "towerofdoom10", quest: 3484, item: 23655, boss: "Slugbutter" },
];

// The chain count is the slot; a floor only needs the ones below it counted.
// Raise it when the server is behind, but never write it down: a finished
// tower must keep reading as finished.
function countFloorsThrough(value: number): void {
  const now = bot.questValue(SLOT) as number;
  if (now >= 0 && now < value) bot.setQuestValue(SLOT, value);
}

for (const stage of FLOORS) {
  countFloorsThrough(stage.value - 1);
  bot.questPlan(stage.quest, {
    [String(stage.item)]: [{
      farm: {
        item: stage.item,
        monster: stage.boss,
        map: stage.map,
        source: "temp",
      },
    }],
  });
}

bot.notify("Tower of Doom complete");
