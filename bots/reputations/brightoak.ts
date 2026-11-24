/// name: Brightoak rep
/// desc: Farms Brightoak reputation to rank 10 via quest 4667 Unlocking the Guardian's Mouth, gathering map item 3984 in elfhame. Requires the Brightoak saga done to Elfhame. Notifies on every rank-up.

// Ported from Skua `CoreFarms.BrightoakREP`: quest 4667 wants Puzzle
// Completed x1, earned by picking up map item 3984 in elfhame (the puzzle
// click Skua waits on). `bot.gather` covers the map-item half; the quest
// composite accepts and turns in by itself. Temp requirement (auto-loot).
// Quest 4667 is saga-gated, so a locked quest fails the first cycle
// naming it instead of farming blind.

const RANK = 10;

const mouth = {
  "32211": function () { bot.gather(3984, "elfhame", 1); }, // Puzzle Completed
};
bot.quest(4667, mouth);

let fac = bot.rep("Brightoak");
if (!fac.found) {
  throw new Error("no Brightoak faction after a turn-in (quest 4667 unlocked? do the Brightoak saga to Elfhame)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(4667, mouth);
  fac = bot.rep("Brightoak");
  if (fac.rank > last) {
    bot.notify("Brightoak rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
