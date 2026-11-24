/// name: Pet Tamer rep
/// desc: Farms Pet Tamer reputation to rank 10 via quest 5261 Mogzard in greenguardwest (West7/Down). Notifies on every rank-up.

// Ported from Skua `CoreFarms.PetTamerREP`: quest 5261 wants Mogzard
// Captured x1 (temp) off Mogzard. `bot.quest` accepts, fills via the
// handler, and turns in by itself; the loop runs that cycle to rank 10.
// Handler keyed by ItemID.

const RANK = 10;

const mog = {
  "35820": function () { bot.hunt("Mogzard", "greenguardwest", 1, "West7", "Down"); }, // Mogzard Captured
};
bot.quest(5261, mog);

let fac = bot.rep("Pet Tamer");
if (!fac.found) {
  throw new Error("no Pet Tamer faction after a turn-in (check bot.rep spelling)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5261, mog);
  fac = bot.rep("Pet Tamer");
  if (fac.rank > last) {
    bot.notify("Pet Tamer rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
