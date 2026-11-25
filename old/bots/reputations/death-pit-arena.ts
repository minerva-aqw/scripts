/// name: Death Pit Arena rep
/// desc: Farms Death Pit Arena reputation to rank 10 via quest 5153 Hun'Gar Defeated, looping General Hun'Gar in deathpit. Requires the Death Pit Arena saga (through Pax Defeated). Notifies on every rank-up.

// Ported from Skua `CoreFarms.DeathPitArenaREP`: quest 5153 wants
// General Hun'Gar Defeated x1 off General Hun'Gar, each turn-in paying
// Death Pit Arena rep. Temp requirement (auto-loot). Quest 5153/5154 are
// saga-gated, so a locked quest fails the first cycle — the faction check
// below names the saga instead of farming blind.

const RANK = 10;

const hungar = {
  "35326": function () { bot.hunt("General Hun'Gar", "deathpit", 1); }, // General Hun'Gar Defeated
};
bot.quest(5153, hungar);

let fac = bot.rep("Death Pit Arena");
if (!fac.found) {
  throw new Error("no Death Pit Arena faction after a turn-in (quest 5153 unlocked? do the Death Pit Arena saga through Pax Defeated)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5153, hungar);
  fac = bot.rep("Death Pit Arena");
  if (fac.rank > last) {
    bot.notify("Death Pit Arena rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
