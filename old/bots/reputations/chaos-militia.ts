/// name: Chaos Militia rep
/// desc: Farms Chaos Militia reputation to rank 10 via quest 5775 Expect the Inquisitors, looping Inquisitor Guard in citadel. Notifies on every rank-up.

// Ported from Skua `CoreFarms.ChaosMilitiaREP`: quest 5775 wants
// Inquisitor's Tabard x10 off Inquisitor Guard, each turn-in paying Chaos
// Militia rep. `bot.quest` accepts, fills via the handler, and turns in by
// itself; the outer loop runs that cycle until rank 10. Temp requirement
// (auto-loot, no floor drain). Handler keyed by ItemID.

const RANK = 10;

const tabards = {
  "38979": function () { bot.hunt("Inquisitor Guard", "citadel", 1); }, // Inquisitor's Tabard
};
bot.quest(5775, tabards);

let fac = bot.rep("Chaos Militia");
if (!fac.found) {
  throw new Error("no Chaos Militia faction after a turn-in (quest 5775 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5775, tabards);
  fac = bot.rep("Chaos Militia");
  if (fac.rank > last) {
    bot.notify("Chaos Militia rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
