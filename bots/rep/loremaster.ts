/// name: Loremaster reputation
/// desc: Farm Loremaster reputation to rank 10, using the member route when available.
///
/// Members reach rank 3 with Studying the Rogue, finish the four druid quests,
/// then repeat Quite the Problem. Free accounts repeat Studying the Rogue all
/// the way. Both routes use temp quest items.

const TARGET = 10;
const WARDWARF = "wardwarf";
const DRUIDS = "druids";

const STUDYING = 7505;
const DAGGER = 54577;
const SCROLL = 54578;

const QUITE = 3032;
const CRIES = [
  // id, item, monster, cell, qty
  [3029, 18525, "Void Bear", "r2", 6],
  [3030, 18526, "Void Larva", "r6", 4],
  [3031, 18527, "Void Ghast", "r6", 4],
  [3032, 18528, "Young Void Giant", "r5", 1],
];

function rankNow(): number {
  return bot.rep("Loremaster").rank;
}

// Dwarf War puts the war boss and the drow spawns on the same screen. Join
// straight there and let the live room report the actual cells.
function wardwarfCell(name: string): string {
  const spot = bot.locate(name) as { found: boolean; cell?: string; cells?: string[] };
  if (!spot.found || !spot.cell) {
    throw new Error(name + " not found in " + WARDWARF);
  }
  return spot.cell;
}

function studyRogue(daggerCell: string, jonsenCell: string): void {
  const quest = bot.quest(STUDYING);
  if (!quest.active()) quest.accept();

  bot.cell(daggerCell);
  bot.farm({
    item: DAGGER,
    qty: 4,
    monster: "Drow Assassin",
    map: WARDWARF,
    cell: daggerCell,
    source: "temp",
  });

  bot.cell(jonsenCell);
  bot.farm({
    item: SCROLL,
    qty: 1,
    monster: "D'wain Jonsen",
    map: WARDWARF,
    cell: jonsenCell,
    source: "temp",
  });

  quest.turnIn(0);
}

function completeDruidQuest(
  id: number,
  item: number,
  monster: string,
  cell: string,
  qty: number
): void {
  const quest = bot.quest(id);
  if (quest.done()) return;
  if (!quest.active()) quest.accept();
  bot.cell(cell);
  bot.farm({
    item,
    qty,
    monster,
    map: DRUIDS,
    cell,
    source: "temp",
  });
  quest.turnIn(0);
}

let rank = rankNow();
let member = bot.me().upgraded === true;

let daggerCell = "";
let jonsenCell = "";
if (rank < TARGET) {
  bot.travel(WARDWARF, "r4", "Left");
  daggerCell = wardwarfCell("Drow Assassin");
  jonsenCell = wardwarfCell("D'wain Jonsen");
}

if (member) {
  while (rank < 3) {
    studyRogue(daggerCell, jonsenCell);
    rank = rankNow();
  }

  bot.travel(DRUIDS);
  for (const [id, item, monster, cell, qty] of CRIES) {
    completeDruidQuest(id, item, monster, cell, qty);
  }

  while (rank < TARGET) {
    const quest = bot.quest(QUITE);
    if (!quest.active()) quest.accept();
    bot.cell("r5");
    bot.farm({
      item: 18528,
      qty: 1,
      monster: "Young Void Giant",
      map: DRUIDS,
      cell: "r5",
      source: "temp",
    });
    quest.turnIn(0);
    rank = rankNow();
  }
} else {
  while (rank < TARGET) {
    studyRogue(daggerCell, jonsenCell);
    rank = rankNow();
  }
}

bot.notify("Loremaster reputation reached rank " + rank);
