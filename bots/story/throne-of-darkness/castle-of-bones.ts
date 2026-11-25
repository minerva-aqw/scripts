/// name: Castle of Bones
/// desc: Complete the Castle of Bones chapter of the Throne of Darkness saga.
///
/// Every drop is a temp quest item, so farms count temp inventory. Monster
/// cells are located once and reused; cells named by the chapter are explicit.

const MAP = "bonecastle";
let activeQuest = 0;

function gatherAt(item: number, qty: number, cellsToTry: string[]): void {
  let last: unknown = null;
  for (const cell of cellsToTry) {
    try {
      bot.cell(cell);
    } catch (error) {
      last = error;
      continue;
    }
    try {
      const result = bot.gatherState(item, MAP, qty, activeQuest) as {
        gathered: boolean;
        held: number;
        grant?: number | null;
      };
      if (result.gathered) return;
      last = new Error(
        "gather " + item + " failed at " + result.held + "/" + qty + " in " + cell
      );
    } catch (error) {
      last = error;
    }
  }
  throw last ?? new Error("gather " + item + " failed");
}

function drop(
  item: number,
  monster: string,
  qty: number,
  cell?: string,
  pad?: string
): void {
  bot.farm({
    item,
    monster,
    map: MAP,
    cell: findMonsterCell(monster, MAP, cell),
    pad,
    qty,
    source: "temp",
  });
}

function complete(id: number, fill: () => void): void {
  activeQuest = id;
  const quest = bot.quest(id);
  if (quest.done()) return;
  if (!quest.active()) quest.accept();
  fill();
  quest.turnIn();
  bot.notify("Castle of Bones: quest " + id + " done");
}

if (bot.quest(4992).done()) {
  bot.notify("Castle of Bones is already complete");
} else {
  bot.travel(MAP);
  bot.notify("Castle of Bones: starting");

  complete(4968, () => drop(34585, "Undead Guard", 1));
  complete(4969, () => drop(34586, "Undead Guard", 2));
  complete(4970, () => drop(34587, "Undead Knight", 3));
  complete(4971, () => drop(34588, "Fallen Deathknight", 8, "r4", "Left"));

  complete(4972, () => {
    gatherAt(4342, 3, ["r4", "r5"]);
    drop(34589, "Fallen Deathknight", 3);
  });

  complete(4973, () => drop(34591, "Undead Waiter", 6));

  complete(4974, () => {
    gatherAt(4343, 2, ["r6"]);
    gatherAt(4344, 2, ["r6"]);
    gatherAt(4345, 3, ["r6"]);
    drop(34631, "Undead Knight", 1);
  });

  complete(4975, () => drop(34595, "Ghoul", 6));
  complete(4976, () => drop(34596, "The Butcher", 1));
  complete(4977, () => drop(34597, "Skeletal Warrior", 10));

  complete(4978, () => {
    gatherAt(4346, 1, ["r11"]);
    gatherAt(4347, 1, ["r11"]);
    gatherAt(4348, 1, ["r11"]);
    drop(34632, "Skeletal Warrior", 1);
  });

  complete(4979, () => {
    gatherAt(4349, 1, ["r12"]);
    gatherAt(4350, 1, ["r12"]);
    gatherAt(4351, 1, ["r12"]);
    drop(34633, "Skeletal Warrior", 1);
  });

  complete(4980, () => {
    gatherAt(4354, 1, ["r13", "r12"]);
    gatherAt(4355, 1, ["r12", "r13"]);
    drop(34605, "Grateful Undead", 5);
    drop(34606, "That 70's Zombie", 2);
  });

  complete(4981, () => drop(34608, "Skeletal Warrior", 5, "r8", "Left"));

  complete(4982, () => {
    drop(34610, "Undead Guard", 1, "Enter", "Spawn");
    drop(34609, "Undead Knight", 1, "r3", "Bottom");
    drop(34611, "Skeletal Warrior", 1, "r8", "Left");
  });

  complete(4983, () => gatherAt(4352, 1, ["r16"]));
  complete(4984, () => gatherAt(4353, 4, ["r17"]));
  complete(4985, () => drop(34614, "Turtle", 6));

  complete(4986, () => {
    drop(34616, "Turtle", 1);
    drop(34617, "Turtle", 2);
    drop(34618, "Turtle", 1);
    drop(34615, "Turtle", 2);
  });

  complete(4987, () => drop(34619, "Snuggles, Torturer", 1));

  complete(4988, () => {
    drop(34620, "Jon Bones", 1);
    drop(34621, "Oberon Marrowtell", 1);
    drop(34622, "Baskerville", 1);
    drop(34623, "Knight of Lichens", 1);
  });

  complete(4989, () => drop(34624, "Rot Tin Tin", 1));

  complete(4990, () => {
    drop(34625, "Undead Golden Knight", 50);
    drop(34626, "Undead Golden Knight", 10);
    drop(34627, "Undead Golden Knight", 1);
  });

  complete(4991, () => {
    drop(34628, "Undead Knight", 5);
    drop(34629, "Skeletal Warrior", 5);
  });

  complete(4992, () => drop(34630, "Vaden", 1));

  bot.notify("Castle of Bones complete");
}
