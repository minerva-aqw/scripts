/// name: Battle Under
/// desc: Complete the Battle Under storyline across battleundera through battleundere.
///
/// Most drops are temp quest items, so farms count temp inventory. The member
/// wing (battleunderd) is skipped on non-member accounts. Map items are
/// clicked from the cell they live in; the cell list contains the known
/// locations and a few neighbours.

let activeQuest = 0;

function gatherAt(
  item: number,
  map: string,
  qty: number,
  cells: string[]
): void {
  let last: unknown = null;
  for (const cell of cells) {
    try {
      bot.cell(cell);
    } catch (error) {
      last = error;
      continue;
    }
    try {
      const result = bot.gatherState(item, map, qty, activeQuest) as {
        gathered: boolean;
        held: number;
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
  map: string,
  item: number,
  monster: string,
  qty: number,
  cell?: string,
  pad?: string,
  source?: "inventory" | "temp"
): void {
  bot.travel(map);
  bot.farm({
    item,
    qty,
    monster,
    map,
    cell: findMonsterCell(monster, map, cell),
    pad,
    source: source ?? "temp",
  });
}

function complete(id: number, map: string, fill: () => void): void {
  activeQuest = id;
  const quest = bot.quest(id);
  if (quest.done()) return;
  bot.travel(map);
  if (!quest.active()) quest.accept();
  fill();
  quest.turnIn();
}

if (!bot.quest(5928).done()) {
  // battleundera
  complete(374, "battleundera", () => {
    drop("battleundera", 1966, "Skeletal Warrior", 1);
  });

  complete(375, "battleundera", () => {
    drop("battleundera", 1968, "Skeletal Warrior", 3);
    drop("battleundera", 1967, "Skeletal Warrior", 6);
  });

  complete(376, "battleundera", () => {
    drop("battleundera", 1969, "Bone Terror", 1);
  });

  complete(377, "battleundera", () => {
    drop("battleundera", 1970, "Skeletal Warrior", 1, undefined, undefined, "inventory");
  });

  // battleunderb
  complete(689, "battleunderb", () => {
    drop("battleunderb", 5148, "Skeleton Warrior", 6);
  });

  complete(690, "battleunderb", () => {
    drop("battleunderb", 5149, "Skeleton Warrior", 6);
  });

  complete(691, "battleunderb", () => {
    drop("battleunderb", 5150, "Skeleton Warrior", 6);
  });

  complete(692, "battleunderb", () => {
    drop("battleunderb", 5151, "Undead Champion", 1);
  });

  complete(935, "battleunderb", () => {
    gatherAt(253, "battleunderb", 1, ["Enter", "r2", "r3", "r4"]);
  });

  // battleunderc
  complete(936, "battleunderc", () => {
    drop("battleunderc", 6701, "Blue Crystalized Undead", 8);
  });

  complete(937, "battleunderc", () => {
    drop("battleunderc", 6702, "Blue Crystalized Undead", 12);
  });

  complete(938, "battleunderc", () => {
    drop("battleunderc", 6703, "Crystalized Jellyfish", 1);
  });

  complete(939, "battleunderc", () => {
    drop("battleundera", 6704, "Bone Terror", 1);
    drop("battleunderb", 6705, "Undead Champion", 1);
    drop("battleunderc", 6706, "Crystalized Jellyfish", 1);
  });

  // battleunderd (member wing)
  if (bot.me().upgraded === true) {
    complete(2211, "battleunderd", () => {
      drop("battleunderd", 12850, "Shivering Bones", 10, "Enter", "Spawn");
    });

    complete(2212, "battleunderd", () => {
      drop("battleunderd", 12852, "Icy Banshee", 7, "r2", "Left");
      gatherAt(1286, "battleunderd", 8, ["r2", "r1", "r3", "Enter"]);
    });

    complete(2213, "battleunderd", () => {
      drop("battleunderd", 12853, "Skeletal Warrior", 1, "r5", "Left");
    });

    complete(2214, "battleunderd", () => {
      gatherAt(1287, "battleunderd", 4, ["r5", "r4", "r6"]);
      drop("battleunderd", 12855, "Glacial Horror", 1, "r5", "Left");
    });

    if (!bot.quest(2215).done() && bot.itemState(12838).qty < 1) {
      const pickaxe = bot.quest(2213);
      if (!pickaxe.active()) pickaxe.accept();
      activeQuest = 2213;
      drop("battleunderd", 12853, "Skeletal Warrior", 1, "r5", "Left");
      pickaxe.turnIn();
    }

    complete(2215, "battleunderd", () => {
      gatherAt(1288, "battleunderd", 1, ["r5", "r6", "r4", "Enter"]);
    });
  }

  // battleundere
  complete(5927, "battleundere", () => {
    gatherAt(5362, "battleundere", 1, ["Enter", "r2", "r3"]);
    drop("battleundere", 40581, "Lava Guard", 1);
  });

  complete(5928, "battleundere", () => {
    drop("battleundere", 40582, "Hot Mama", 1);
  });

  bot.notify("Battle Under complete");
}
