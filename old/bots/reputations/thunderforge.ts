/// name: ThunderForge rep
/// desc: Farms ThunderForge reputation to rank 10 in deathpits: free accounts run 2733+2734 on Wrathful Vestis, members run 2734-2737 on Rotting Darkblood. Needs the saga done to unlock 2733. Notifies on every rank-up.

// Ported from Skua `CoreFarms.ThunderForgeREP`, both branches like
// reputations/evil.ts. Skua registers per branch over one shared mob;
// here each branch is sequential declarative `bot.quest` calls over one
// shared handlers object (same kills, same turn-ins). All requirements
// are temp (auto-loot, no floor drain). The composites carry their own
// stall errors, so no extra guard here.

const RANK = 10;
const member = bot.me().upgraded === true;

const free = {
  "16473": function () { bot.hunt("Wrathful Vestis", "deathpits", 1); }, // Vestis's Chaos Eye
  "16472": function () { bot.hunt("Wrathful Vestis", "deathpits", 1); }, // Darkblood Femur
};
const mem = {
  "16472": function () { bot.hunt("Rotting Darkblood", "deathpits", 1); }, // Darkblood Femur
  "16471": function () { bot.hunt("Rotting Darkblood", "deathpits", 1); }, // Rotstone Dagger
  "16470": function () { bot.hunt("Rotting Darkblood", "deathpits", 1); }, // Logash's Family Seal
  "16469": function () { bot.hunt("Rotting Darkblood", "deathpits", 1); }, // Slaver Drums
};

function cycle() {
  if (member) {
    bot.quest(2734, mem);
    bot.quest(2735, mem);
    bot.quest(2736, mem);
    bot.quest(2737, mem);
  } else {
    bot.quest(2733, free);
    bot.quest(2734, free);
  }
}
cycle();

let fac = bot.rep("ThunderForge");
if (!fac.found) {
  throw new Error("no ThunderForge faction after a round (2733 unlocked? finish the saga to Deathpits first)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  cycle();
  fac = bot.rep("ThunderForge");
  if (fac.rank > last) {
    bot.notify("ThunderForge rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
