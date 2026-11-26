/// name: Bocklin Castle
/// desc: Complete the Bocklin Castle chapter of the Lynaria saga.
///
/// Every requirement is a temp quest item, so the farms count temp inventory.
/// The chapter runs in slot order; a finished chapter is a no-op.

const MAP = "bocklincastle";
const LAST = 10252;

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

  complete(10243, () => {
    gather(14446, 1);
    drop(93593, "Undead Garde", 9);
  });

  complete(10244, () => drop(93595, "Garde Wraith", 1));

  complete(10245, () => {
    gather(14451, 1);
    gather(14447, 1);
  });

  complete(10246, () => {
    drop(93598, "Undead Garde", 6);
    drop(93599, "Garde Wraith", 9);
  });

  complete(10247, () => drop(93600, "Warped Revenant", 1));

  complete(10248, () => {
    gather(14448, 1);
    drop(93601, "Forsaken Necromancer", 1);
  });

  complete(10249, () => gather(14449, 6));

  complete(10250, () => {
    gather(14450, 1);
    drop(93610, "Faceless Ritualist", 12);
  });

  complete(10251, () => {
    drop(93604, "Warped Revenant", 9);
    drop(93605, "Faceless Ritualist", 6);
  });

  complete(10252, () => drop(93606, "Headless Knight", 1));

  bot.notify("Bocklin Castle complete");
}
