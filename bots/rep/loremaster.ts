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
  [3029, 18525, "Void Bear"],
  [3030, 18526, "Void Larva"],
  [3031, 18527, "Void Ghast"],
];

function rankNow(): number {
  return bot.rep("Loremaster").rank;
}

function studyRogue(): void {
  bot.questPlan(
    STUDYING,
    {
      "54577": [{
        farm: {
          item: DAGGER,
          monster: "Drow Assassin",
          map: WARDWARF,
          source: "temp",
        },
      }],
      "54578": [{
        farm: {
          item: SCROLL,
          monster: "D'wain Jonsen",
          map: WARDWARF,
          source: "temp",
        },
      }],
    },
    { choice: 0 }
  );
}

function fillOne(id: number, item: number, monster: string): void {
  const handlers: Record<string, unknown> = {};
  handlers[String(item)] = [{
    farm: { item, monster, map: DRUIDS, source: "temp" },
  }];
  bot.questPlan(id, handlers, { choice: 0 });
}

let rank = rankNow();
const member = bot.me().upgraded === true;

if (member) {
  while (rank < 3) {
    studyRogue();
    rank = rankNow();
  }

  for (const [id, item, monster] of DRUID_QUESTS) {
    if (!bot.quest(id).done()) fillOne(id, item, monster);
  }
  if (!bot.quest(QUITE).done()) fillOne(QUITE, 18528, "Young Void Giant");

  while (rank < TARGET) {
    fillOne(QUITE, 18528, "Young Void Giant");
    rank = rankNow();
  }
} else {
  while (rank < TARGET) {
    studyRogue();
    rank = rankNow();
  }
}

bot.notify("Loremaster reputation reached rank " + rank);
