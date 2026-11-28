/// name: Tower of Doom
/// desc: Climb the ten floors of the Tower of Doom story, one boss per floor.
///
/// Two gates guard this tower. The server refuses a floor's accept unless every
/// floor below it is completed, so the floors are walked in order and never
/// skipped. Each floor's room also refuses to be crossed while quest value slot
/// 159 reads below `floor - 1` and drops the avatar in its Prison cell instead;
/// the check runs on the first frame the room plays, which is the arrival move
/// itself. The slot is therefore opened before the travel, to the tower's top
/// value, so no frame of any floor can miss it.

const SLOT = 159;
const TOP = 10;

const FLOORS = [
  { map: "towerofdoom", quest: 3475, item: 23646, boss: "Dread Klunk" },
  { map: "towerofdoom2", quest: 3476, item: 23647, boss: "Dread Arradia" },
  { map: "towerofdoom3", quest: 3477, item: 23648, boss: "Dread Moganth" },
  { map: "towerofdoom4", quest: 3478, item: 23649, boss: "Dread Kathool" },
  { map: "towerofdoom5", quest: 3479, item: 23650, boss: "Creel" },
  { map: "towerofdoom6", quest: 3480, item: 23651, boss: "Dread Terror" },
  { map: "towerofdoom7", quest: 3481, item: 23652, boss: "Dread Warrior" },
  { map: "towerofdoom8", quest: 3482, item: 23653, boss: "Dread Avatar" },
  { map: "towerofdoom9", quest: 3483, item: 23654, boss: "Dread Fang" },
  { map: "towerofdoom10", quest: 3484, item: 23655, boss: "Slugbutter" },
];

for (const stage of FLOORS) {
  openQuestSlot("tower of doom", SLOT, TOP);
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
