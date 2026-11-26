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
// for the farm. `cell()` resolves the pad before the mission owns the cell.
let cell = "";
if (rank < TARGET) {
  bot.travel(MAP);
  cell = findMonsterCell("Stinger", MAP);
  bot.cell(cell);
}

while (rank < TARGET) {
  const quest = bot.quest(QUEST);
  if (!quest.active()) {
    try {
      quest.accept();
    } catch (error) {
      throw new Error(
        "Sugar, Sugar (" + QUEST + ") cannot be accepted; finish the Kimberly storyline first: " + error
      );
    }
  }

  bot.farm({
    item: HONEY,
    qty: 10,
    monster: "Stinger",
    map: MAP,
    cell,
    source: "temp",
  });

  quest.turnIn();
  rank = bot.rep("Mythsong").rank;
}

bot.notify("Mythsong reputation reached rank " + rank);
