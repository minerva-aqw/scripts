/// name: Eternal rep
/// desc: Farms Eternal reputation to rank 10 via quest 5198 in fourdpyramid (White/Black Gems off Stone Sphynx). Requires the fourdpyramid storyline done to unlock 5198. Notifies on every rank-up.

// Ported from Skua `CoreFarms.EternalREP`: quest 5198 "Sphynxes are Riddled
// With Gems" wants White Gem x2 + Black Gem x2, both off Stone Sphynx (Skua
// hunts its two MapIDs; AQW wiki names the mob). Both requirements are temp
// drops (auto-loot, no floor drain). `bot.quest` accepts, fills via the
// handlers, and turns in by itself; the outer loop runs that cycle until
// rank 10. If 5198 is locked the first cycle fails naming the quest.
const RANK = 10;

const gems = {
  "35543": function () { bot.hunt("Stone Sphynx", "fourdpyramid", 2); }, // White Gem
  "35542": function () { bot.hunt("Stone Sphynx", "fourdpyramid", 2); }, // Black Gem
};
bot.quest(5198, gems);

let fac = bot.rep("Eternal");
if (!fac.found) {
  throw new Error("no Eternal faction after a turn-in (quest 5198 unlocked? finish the fourdpyramid story)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(5198, gems);
  fac = bot.rep("Eternal");
  if (fac.rank > last) {
    bot.notify("Eternal rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
