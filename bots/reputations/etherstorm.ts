/// name: Etherstorm rep
/// desc: Farms Etherstorm reputation to rank 10 via quest 3494 Dapper Hats in waterstorm/r5. Notifies on every rank-up.

// Ported from Skua `CoreFarms.EtherStormREP`: quest 3494 "Dapper Hats" wants
// Marsh Leather x8 + Silvery Fins x4, killed off anything in waterstorm r5
// like Skua does. Both requirements are temp drops (auto-loot, no floor
// drain). Single-quest declarative loop relies on the composite's own stall
// error — no extra guard.
const RANK = 10;

const hats = {
  "23746": function () { bot.hunt("*", "waterstorm", 8, "r5", "Left"); }, // Marsh Leather
  "23747": function () { bot.hunt("*", "waterstorm", 4, "r5", "Left"); }, // Silvery Fins
};
bot.quest(3494, hats);

let fac = bot.rep("Etherstorm");
if (!fac.found) {
  throw new Error("no Etherstorm faction after a turn-in (quest 3494 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(3494, hats);
  fac = bot.rep("Etherstorm");
  if (fac.rank > last) {
    bot.notify("Etherstorm rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
