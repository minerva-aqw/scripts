/// name: TreasureHunter rep
/// desc: Farms TreasureHunter reputation to rank 10 via quest 6593 Qualifying Quest in stalagbite (Balboa, Super Specific Rock). Notifies on every rank-up.

// Ported from Skua `CoreFarms.TreasureHunterREP`: quest 6593 wants Super
// Specific Rock x1 (temp) off Balboa. `bot.quest` accepts, fills via the
// handler, and turns in by itself; the loop runs that cycle to rank 10.
// Handler keyed by ItemID.

const RANK = 10;

const rock = {
  "45805": function () { bot.hunt("Balboa", "stalagbite", 1); }, // Super Specific Rock
};
bot.quest(6593, rock);

let fac = bot.rep("TreasureHunter");
if (!fac.found) {
  throw new Error("no TreasureHunter faction after a turn-in (check bot.rep spelling)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(6593, rock);
  fac = bot.rep("TreasureHunter");
  if (fac.rank > last) {
    bot.notify("TreasureHunter rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
