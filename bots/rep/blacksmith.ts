/// name: Blacksmithing reputation
/// desc: Farm Blacksmithing reputation through quests 2777 and 8736 to rank 10.
///
/// Ranks 0-4 use Magic Sock it To You (2777): wolves and slimes in Greenguard.
/// Ranks 4-10 use Monster Machining (8736): Creature Creation in Maul, Hydra
/// Head 25 in the Hydra Challenge, and Dread Klunk at the top of the Tower of
/// Doom. The registered quests are accepted and handed in by the tick sweep.

const TARGET = 10;

function clearFloor(): void {
  try {
    bot.kill({ monster: "*", count: 3 });
  } catch (error) {
    // An already-cleared floor has no resident monsters.
    if (!String(error).includes("no *")) throw error;
  }
}

function enterDreadKlunk(): string {
  bot.travel("towerofdoom");
  bot.cell("r1");
  clearFloor();
  for (let below = 2; below < 10; below++) {
    bot.cell("r" + below);
    clearFloor();
  }
  bot.cell("r10", "Left");
  return "r10";
}

let rank = bot.rep("Blacksmithing").rank;
bot.notify("Blacksmithing reputation: rank " + rank + " -> " + TARGET);

if (rank < 4) {
  bot.quest.register([2777]);
  try {
    while (rank < 4) {
      bot.travel("greenguardeast");
      let cell = findMonsterCell("Wolf", "greenguardeast");
      bot.farm({
        item: 18424,
        qty: 2,
        monster: "Wolf",
        map: "greenguardeast",
        cell,
        source: "temp",
      });

      bot.travel("greenguardwest");
      cell = findMonsterCell("Slime", "greenguardwest");
      bot.farm({
        item: 16490,
        qty: 5,
        monster: "Slime",
        map: "greenguardwest",
        cell,
        source: "temp",
      });

      rank = bot.rep("Blacksmithing").rank;
    }
  } finally {
    bot.quest.unregister([2777]);
  }
}

if (rank < TARGET) {
  bot.quest.register([8736]);
  try {
    while (rank < TARGET) {
      bot.travel("maul");
      let cell = findMonsterCell("Creature Creation", "maul");
      bot.farm({
        item: 7990,
        qty: 1,
        monster: "Creature Creation",
        map: "maul",
        cell,
      });

      bot.travel("hydrachallenge");
      cell = findMonsterCell("Hydra Head 25", "hydrachallenge");
      bot.farm({
        item: 43797,
        qty: 75,
        monster: "Hydra Head 25",
        map: "hydrachallenge",
        cell,
      });

      cell = enterDreadKlunk();
      bot.farm({
        item: 23690,
        qty: 15,
        monster: "Dread Klunk",
        map: "towerofdoom",
        cell,
      });

      rank = bot.rep("Blacksmithing").rank;
    }
  } finally {
    bot.quest.unregister([8736]);
  }
}

bot.notify("Blacksmithing reputation reached rank " + rank);
