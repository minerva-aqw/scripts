/// name: Dreadfire rep
/// desc: Farms Dreadfire reputation to rank 10 via quest 5697 Gather Crystals, looping Arcane Crystal in dreadfire r13. Notifies on every rank-up.

// Ported from Skua `CoreFarms.DreadfireREP`: quest 5697 wants Perfect
// Crystal Orb x1 off the Arcane Crystal mob, each turn-in paying Dreadfire
// rep. Temp requirement (auto-loot, no floor drain). Handler keyed by
// ItemID.

const RANK = 10;

const orb = {
  "38483": function () { bot.hunt("Arcane Crystal", "dreadfire", 1, "r13", "Bottom"); }, // Perfect Crystal Orb
};
bot.quest(5697, orb);

let fac = bot.rep("Dreadfire");
if (!fac.found) {
  throw new Error("no Dreadfire faction after a turn-in (quest 5697 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5697, orb);
  fac = bot.rep("Dreadfire");
  if (fac.rank > last) {
    bot.notify("Dreadfire rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
