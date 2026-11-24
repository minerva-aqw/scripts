/// name: Infernal Army rep
/// desc: Farms Infernal Army reputation to rank 10 via quest 5707 in dreadfire/r10 (Living Brimstone). Notifies on every rank-up.

// Ported from Skua `CoreFarms.InfernalArmyREP`: quest 5707 "Practice Time"
// wants Living Brimstone Defeated x1 off Living Brimstone, a temp drop
// (auto-loot, no floor drain). Single-quest declarative loop relies on the
// composite's own stall error — no extra guard.
const RANK = 10;

const practice = {
  "38500": function () { bot.hunt("Living Brimstone", "dreadfire", 1, "r10", "Left"); }, // Living Brimstone Defeated
};
bot.quest(5707, practice);

let fac = bot.rep("Infernal Army");
if (!fac.found) {
  throw new Error("no Infernal Army faction after a turn-in (quest 5707 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5707, practice);
  fac = bot.rep("Infernal Army");
  if (fac.rank > last) {
    bot.notify("Infernal Army rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
