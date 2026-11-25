/// name: Soak test
/// desc: Run the boss-blocker and multi-requirement quest legs of the live soak.
///
/// Escherion covers a boss whose blocker must be engaged first. Hit Job (92)
/// covers a quest with two temp drops, each farmed from its own monster.

function cellOf(name: string): string {
  const spot = bot.locate(name) as {
    found: boolean;
    cell?: string;
    cells?: string[];
  };
  if (!spot.found || !spot.cell) {
    const seen = spot.cells?.length ? " (cells: " + spot.cells.join(", ") + ")" : "";
    throw new Error(name + " not found in the current map" + seen);
  }
  return spot.cell;
}

// 1. Boss with a blocker.
bot.notify("soak: travelling to escherion");
bot.travel("escherion", "Boss", "Left");

bot.notify("soak: killing Escherion");
bot.kill({
  monster: "Escherion",
  blockers: ["Staff"],
  count: 1,
});

// 2. Quest with two turn-in requirements. Hit Job is from the Mazumi story.
const hitJob = bot.quest(92);
if (!hitJob.done()) {
  if (!hitJob.active()) hitJob.accept();

  bot.travel("greenguardwest");
  let cell = cellOf("Breken the Vile");
  bot.farm({
    item: 42649,
    monster: "Breken the Vile",
    map: "greenguardwest",
    cell,
    source: "temp",
  });

  cell = cellOf("Ogug Stoneaxe");
  bot.farm({
    item: 42650,
    monster: "Ogug Stoneaxe",
    map: "greenguardwest",
    cell,
    source: "temp",
  });

  hitJob.turnIn();
}

bot.notify("soak: boss and Hit Job done");
