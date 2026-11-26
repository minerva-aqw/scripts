/// name: Bocklin Grove
/// desc: Complete the Bocklin Grove chapter of the Lynaria saga.
///
/// Every requirement is a temp quest item, so the farms count temp inventory.
/// The chapter runs in slot order; a finished chapter is a no-op.

const MAP = "bocklingrove";
const LAST = 10239;

let activeQuest = 0;

function drop(item: number, monster: string, qty: number): void {
  bot.farm({ item, monster, map: MAP, qty, source: "temp" });
}

function gather(item: number, qty: number): void {
  const got = bot.gatherState(item, MAP, qty, activeQuest) as {
    gathered: boolean;
    held: number;
  };
  if (!got.gathered) {
    throw new Error(
      "gather " + item + " x" + qty + " in " + MAP + " stopped at " + got.held
    );
  }
}

function complete(id: number, fill: () => void): void {
  activeQuest = id;
  const quest = bot.quest(id);
  if (quest.done()) return;
  if (!quest.active()) quest.accept();
  fill();
  quest.turnIn();
}

if (!bot.quest(LAST).done()) {
  bot.travel(MAP);

  complete(10230, () => {
    gather(14429, 1);
    drop(93544, "Wolf", 12);
  });

  complete(10231, () => drop(93546, "Spider", 12));
  complete(10232, () => drop(93547, "Sp-Eye", 12));

  complete(10233, () => {
    gather(14430, 1);
    gather(14431, 1);
  });

  complete(10234, () => drop(93550, "Garde Grif", 9));
  complete(10235, () => drop(93551, "Undead Garde", 9));
  complete(10236, () => drop(93552, "Garde Wraith", 12));

  complete(10237, () => {
    gather(14432, 1);
    gather(14433, 5);
  });

  complete(10238, () => {
    drop(93556, "Garde Wraith", 9);
    drop(93555, "Undead Garde", 6);
  });

  complete(10239, () => drop(93557, "Elder Necromancer", 1));

  bot.notify("Bocklin Grove complete");
}
