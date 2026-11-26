/// name: Tower of Doom
/// desc: Climb the ten floors of the Tower of Doom story, one boss per floor.
///
/// Two gates guard this tower. The server refuses a floor's accept unless every
/// floor below it is completed, so the floors are walked in order and never
/// skipped. Each floor's room also refuses to be crossed while quest value slot
/// 159 reads below `floor - 1`, and drops the avatar in its Prison cell instead.
/// That value is read from the client, so it is opened after the join and
/// before the first move.

const SLOT = 159;
const TOP = 10;

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

function openRoom(need: number): void {
  if ((bot.questValue(SLOT) as number) >= need) return;
  bot.setQuestValue(SLOT, TOP);
  const now = bot.questValue(SLOT) as number;
  if (now < need) {
    throw new Error("tower gate: slot " + SLOT + " reads " + now + ", floor needs " + need);
  }
}

for (const stage of FLOORS) {
  bot.travel(stage.map);
  openRoom(stage.value - 1);
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
