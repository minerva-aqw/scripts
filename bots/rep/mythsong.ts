/// name: Mythsong reputation
/// desc: Farm the repeatable Sugar, Sugar quest until Mythsong reputation reaches rank 10.
///
/// Sugar, Sugar is repeatable and pays reputation each turn-in. It unlocks
/// with the Lords of Chaos Kimberly storyline; a locked quest fails on accept
/// with the server's own reason. Honey Gathered is a temp quest item, so the
/// farm counts the temp inventory.

const MAP = "beehive";
const QUEST = 4829; // Sugar, Sugar
const HONEY = 33572; // Honey Gathered, a temp quest item
const TARGET = 10;

let rank = bot.rep("Mythsong").rank;

// Stinger spawns in more than one cell; locate the live room and stay there
// for the farm. The mission places itself in the map and cell it is given.
let cell = "";
if (rank < TARGET) {
  bot.travel(MAP);
  cell = findMonsterCell("Stinger", MAP);
}

while (rank < TARGET) {
  bot.questPlan(
    QUEST,
    {
      "33572": [{
        farm: {
          item: HONEY,
          monster: "Stinger",
          map: MAP,
          cell,
          source: "temp",
        },
      }],
    },
    { choice: 0 }
  );
  rank = bot.rep("Mythsong").rank;
}

bot.notify("Mythsong reputation reached rank " + rank);
