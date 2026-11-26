/// name: Bocklin Sanctum
/// desc: Complete the Bocklin Sanctum chapter of the Lynaria saga.
///
/// Every requirement is a temp quest item, so the farms count temp inventory.
/// The chapter runs in slot order; a finished chapter is a no-op.

const MAP = "bocklinsanctum";
const LAST = 10265;

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

  complete(10256, () => drop(93672, "Warped Revenant", 12));
  complete(10257, () => drop(93673, "Faceless Ritualist", 9));
  complete(10258, () => gather(14478, 6));

  complete(10259, () => {
    drop(93676, "Faceless Ritualist", 6);
    drop(93675, "Warped Revenant", 9);
  });

  complete(10260, () => {
    gather(14479, 1);
    drop(93678, "Tarnished Scion", 1);
  });

  complete(10261, () => {
    gather(14480, 1);
    drop(93679, "Ghostly Servant", 15);
  });

  complete(10262, () => drop(93681, "Headless Rider", 1));

  complete(10263, () => {
    gather(14481, 1);
    gather(14482, 1);
  });

  complete(10264, () => {
    drop(93684, "Ghostly Servant", 12);
    drop(93685, "Headless Rider", 6);
  });

  complete(10265, () => drop(93686, "Thronekeeper", 1));

  bot.notify("Bocklin Sanctum complete");
}
