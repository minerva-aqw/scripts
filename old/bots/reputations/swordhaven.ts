/// name: Swordhaven rep
/// desc: Farms Swordhaven reputation to rank 10 via quests 3065/3066/3067/3070/3085/3086/3087 in castle (Spider, Wraith, Gargoyle, Fiend). Notifies on every rank-up.

// Ported from Skua `CoreFarms.SwordhavenREP`. Seven quests, one per mob
// pair, run in sequence per round (Skua's EnsureAccept/Hunt/EnsureComplete
// chain); `bot.quest` does accept/fill/turn-in per call. All requirements
// are temp (auto-loot, no floor drain). One shared handlers object covers
// every quest — each call only fires its own unmet requirements. The
// composites carry their own stall errors, so no extra guard here.

const RANK = 10;

const h = {
  "19062": function () { bot.hunt("Dungeon Fiend", "castle", 1); }, // Dungeon Fiend Hair Bow
  "19063": function () { bot.hunt("Dungeon Fiend", "castle", 1); }, // Dungeon Fiend Bow Tie
  "19064": function () { bot.hunt("Castle Spider", "castle", 1); }, // Eradicated Arachnid
  "19065": function () { bot.hunt("Castle Wraith", "castle", 1); }, // Castle Wraith Defeated
  "19072": function () { bot.hunt("Castle Wraith", "castle", 1); }, // Castle Wraith Wool
  "19073": function () { bot.hunt("Gargoyle", "castle", 1); }, // Gargoyle Gems
  "19070": function () { bot.hunt("Castle Spider", "castle", 1); }, // Castle Spider Silk Yarn
  "19071": function () { bot.hunt("Dungeon Fiend", "castle", 1); }, // Dungeon Fiend Textiles
  "19074": function () { bot.hunt("Castle Spider", "castle", 1); }, // Castle Spider Silk
  "19234": function () { bot.hunt("Gargoyle", "castle", 1); }, // Stony Plating
  "19254": function () { bot.hunt("Castle Wraith", "castle", 1); }, // Jarred Wraith
};

function cycle() {
  bot.quest(3065, h);
  bot.quest(3066, h);
  bot.quest(3067, h);
  bot.quest(3070, h);
  bot.quest(3085, h);
  bot.quest(3086, h);
  bot.quest(3087, h);
}
cycle();

let fac = bot.rep("Swordhaven");
if (!fac.found) {
  throw new Error("no Swordhaven faction after a round (quests 3065/3066/3067/3070/3085/3086/3087 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  cycle();
  fac = bot.rep("Swordhaven");
  if (fac.rank > last) {
    bot.notify("Swordhaven rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
