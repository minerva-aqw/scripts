/// name: Somnia rep
/// desc: Farms Somnia reputation to rank 10 via quests 7665/7666/7669 in somnia (Nightspore, Orpheum Elemental, Dream Larva). Notifies on every rank-up.

// Ported from Skua `CoreFarms.SomniaREP` (7665 Dream Truffles x8,
// 7666 Orphium Ore x8, 7669 Dreamsilk x5 — all temp). Skua runs the three
// accepts/fills/turn-ins in sequence per round; `bot.quest` does the same
// per call, so one cycle is three calls and the loop repeats to rank 10.
// Handler keys are ItemIDs. The composites carry their own stall errors,
// so no extra guard here.

const RANK = 10;

const h = {
  "55931": function () { bot.hunt("Nightspore", "somnia", 1); }, // Dream Truffle
  "55932": function () { bot.hunt("Orpheum Elemental", "somnia", 1); }, // Orphium Ore
  "55935": function () { bot.hunt("Dream Larva", "somnia", 1); }, // Dreamsilk
};

function cycle() {
  bot.quest(7665, h);
  bot.quest(7666, h);
  bot.quest(7669, h);
}
cycle();

let fac = bot.rep("Somnia");
if (!fac.found) {
  throw new Error("no Somnia faction after a round (quests 7665/7666/7669 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  cycle();
  fac = bot.rep("Somnia");
  if (fac.rank > last) {
    bot.notify("Somnia rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
