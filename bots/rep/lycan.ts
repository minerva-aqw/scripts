/// name: Lycan reputation
/// desc: Farm the repeatable Sanguine quest until Lycan reputation reaches rank 10.
///
/// Requires the Wolfwing storyline through quest 537. The rep loop is deliberately
/// explicit: accept, locate the live Sanguine cell, collect one mask, hand in, and
/// read the rank again. A refused accept or turn-in fails the run instead of
/// spinning on a sweep.

const QUEST = 537; // Sanguine
const MASK = 3750; // Sanguine Mask, a temp quest item
const TARGET = 10;

let rank = bot.rep("Lycan").rank;
if (rank < TARGET && !bot.quest(QUEST).done()) {
  throw new Error(
    "Lycan reputation needs the Wolfwing storyline through quest 537 (Sanguine)"
  );
}
bot.notify("Lycan reputation: rank " + rank + " -> " + TARGET);

// Farm only fights in the current cell. Join the map, then move to the cell
// holding Sanguine; `cell()` resolves the pad.
let cell = "";
if (rank < TARGET) {
  bot.travel("lycan");
  cell = findMonsterCell("Sanguine", "lycan");
  bot.cell(cell);
}

while (rank < TARGET) {
  const quest = bot.quest(QUEST);
  if (!quest.active()) quest.accept();

  bot.farm({
    item: MASK,
    monster: "Sanguine",
    map: "lycan",
    cell,
    source: "temp",
  });

  quest.turnIn();
  rank = bot.rep("Lycan").rank;
}

bot.notify("Lycan reputation reached rank " + rank);
