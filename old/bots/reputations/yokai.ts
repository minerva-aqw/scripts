/// name: Yokai rep
/// desc: Farms Yokai reputation to rank 10 via quest 383 Pockey Challenge in dragonkoiz (Piece of Pockey x3). Notifies on every rank-up.

// Ported from Skua `CoreFarms.YokaiREP`: quest 383 wants Piece of Pockey
// x3 (temp) off Pockey Chew. `bot.quest` accepts, fills via the handler,
// and turns in by itself; the loop runs that cycle to rank 10. Handler
// keyed by ItemID.

const RANK = 10;

const pockey = {
  "2023": function () { bot.hunt("Pockey Chew", "dragonkoiz", 1); }, // Piece of Pockey
};
bot.quest(383, pockey);

let fac = bot.rep("Yokai");
if (!fac.found) {
  throw new Error("no Yokai faction after a turn-in (check bot.rep spelling)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(383, pockey);
  fac = bot.rep("Yokai");
  if (fac.rank > last) {
    bot.notify("Yokai rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
