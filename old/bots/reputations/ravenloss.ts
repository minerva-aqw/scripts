/// name: Ravenloss rep
/// desc: Farms Ravenloss reputation to rank 10 via quest 3445 Slay the Spiderkin in twilightedge. Needs the Ravenloss saga done to unlock 3445. Notifies on every rank-up.

// Ported from Skua `CoreFarms.RavenlossREP`: quest 3445 wants ChaosWeaver
// Slain x10 (temp) off ChaosWeaver Mage in twilightedge. `bot.quest`
// accepts, fills via the handler, and turns in by itself; the loop runs
// that cycle to rank 10. Handler keyed by ItemID. If 3445 is locked
// (Ravenloss saga incomplete) the first cycle fails naming the quest.

const RANK = 10;

const slain = {
  "23410": function () { bot.hunt("ChaosWeaver Mage", "twilightedge", 1); }, // ChaosWeaver Slain
};
bot.quest(3445, slain);

let fac = bot.rep("Ravenloss");
if (!fac.found) {
  throw new Error("no Ravenloss faction after a turn-in (3445 unlocked? finish the Ravenloss saga first)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(3445, slain);
  fac = bot.rep("Ravenloss");
  if (fac.rank > last) {
    bot.notify("Ravenloss rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
