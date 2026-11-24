/// name: Brethwren rep
/// desc: Farms Brethwren reputation to rank 10 via quest 8989 Fowl Farming, looping Turkonian in birdswithharms. Notifies on every rank-up.

// Ported from Skua `CoreFarms.BrethwrenREP`: quest 8989 wants Turkonians
// Beaten x10 off Turkonian, each turn-in paying Brethwren rep. `bot.quest`
// accepts, fills via the handler, and turns in by itself; the outer loop
// runs that cycle until rank 10. Temp requirement (auto-loot). Skua skips
// the farm when the seasonal map is inactive; here the hunt simply fails
// naming the map instead.

const RANK = 10;

const fowl = {
  "74061": function () { bot.hunt("Turkonian", "birdswithharms", 1); }, // Turkonians Beaten
};
bot.quest(8989, fowl);

let fac = bot.rep("Brethwren");
if (!fac.found) {
  throw new Error("no Brethwren faction after a turn-in (quest 8989 filling? birdswithharms seasonal?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(8989, fowl);
  fac = bot.rep("Brethwren");
  if (fac.rank > last) {
    bot.notify("Brethwren rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
