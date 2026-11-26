/// name: Loremaster reputation
/// desc: Farm Loremaster reputation to rank 10, using the member route when available.
///
/// Members reach rank 3 with Studying the Rogue, finish the four druid quests,
/// then repeat Quite the Problem. Free accounts repeat Studying the Rogue all
/// the way. Every requirement is filled by a declarative quest plan with temp
/// inventory counting.

const TARGET = 10;
const WARDWARF = "wardwarf";
const DRUIDS = "druids";

const STUDYING = 7505;
const DAGGER = 54577;
const SCROLL = 54578;

const QUITE = 3032;
const DRUID_QUESTS = [
  [3029, 18525, "Void Bear", "r2"],
  [3030, 18526, "Void Larva", "r6"],
  [3031, 18527, "Void Ghast", "r6"],
];

function rankNow(): number {
  return bot.rep("Loremaster").rank;
}

function studyRogue(daggerCell: string, jonsenCell: string): void {
  bot.questPlan(
    STUDYING,
    {
      "54577": [{
        farm: {
          item: DAGGER,
          monster: "Drow Assassin",
          map: WARDWARF,
          cell: daggerCell,
          source: "temp",
        },
      }],
      "54578": [{
        farm: {
          item: SCROLL,
          monster: "D'wain Jonsen",
          map: WARDWARF,
          cell: jonsenCell,
          source: "temp",
        },
      }],
    },
    { choice: 0 }
  );
}

function fillOne(id: number, item: number, monster: string, cell: string): void {
  const handlers: Record<string, unknown> = {};
  handlers[String(item)] = [{
    farm: { item, monster, map: DRUIDS, cell, source: "temp" },
  }];
  bot.questPlan(id, handlers, { choice: 0 });
}

let rank = rankNow();
const member = bot.me().upgraded === true;

let daggerCell = "";
let jonsenCell = "";
if (rank < TARGET) {
  bot.travel(WARDWARF, "r4", "Left");
  daggerCell = findMonsterCell("Drow Assassin", WARDWARF);
  jonsenCell = findMonsterCell("D'wain Jonsen", WARDWARF);
}

if (member) {
  while (rank < 3) {
    studyRogue(daggerCell, jonsenCell);
    rank = rankNow();
  }

  bot.travel(DRUIDS);
  for (const [id, item, monster, cell] of DRUID_QUESTS) {
    if (!bot.quest(id).done()) fillOne(id, item, monster, cell);
  }
  if (!bot.quest(QUITE).done()) fillOne(QUITE, 18528, "Young Void Giant", "r5");

  while (rank < TARGET) {
    fillOne(QUITE, 18528, "Young Void Giant", "r5");
    rank = rankNow();
  }
} else {
  while (rank < TARGET) {
    studyRogue(daggerCell, jonsenCell);
    rank = rankNow();
  }
}

bot.notify("Loremaster reputation reached rank " + rank);
