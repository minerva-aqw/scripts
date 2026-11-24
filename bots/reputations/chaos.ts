/// name: Chaos rep
/// desc: Farms Chaos reputation to rank 10 via quest 3594 Embrace Your Chaos in mountdoomskull. Aligns Chaos itself first. Notifies on every rank-up.

// Ported from Skua `CoreFarms.ChaosREP`: quest 3594 wants Chaos Power
// Increased x6, filled by kills in mountdoomskull b1, each turn-in paying
// Chaos rep. Alignment is automatic (`bot.align`, same packet as Skua's
// `ChangeAlignment`); a refused switch fails the run up front. Temp
// requirement (auto-loot, no floor drain). Handler keyed by ItemID.

const RANK = 10;

if (!bot.align("chaos")) {
  throw new Error("alignment switch refused (align Chaos manually first)");
}

const embrace = {
  "24243": function () { bot.hunt("*", "mountdoomskull", 1, "b1", "Left"); }, // Chaos Power Increased
};
bot.quest(3594, embrace);

let fac = bot.rep("Chaos");
if (!fac.found) {
  throw new Error("no Chaos faction after a turn-in (check spelling; 3594 needs Chaos alignment)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(3594, embrace);
  fac = bot.rep("Chaos");
  if (fac.rank > last) {
    bot.notify("Chaos rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
