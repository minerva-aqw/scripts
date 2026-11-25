/// name: BaconCat rep
/// desc: Farms BaconCat reputation to rank 10: registers quests 5112/5120, loops Ice Cream Shark in baconcatlair. Requires quest 5120 (Ziri storyline) unlocked. Notifies on every rank-up.

// Ported from Skua `CoreFarms.BaconCatREP`. Both quests fill off the same
// mob (5 Moglinberry Ice Cream for 5112 + 10 Shark Teeth for 5120), so
// they are registered once and filled concurrently, with the tick sweep
// turning in whatever filled. Every requirement is a temp drop (auto-loot,
// no floor drain). Quest 5120 must already be unlocked (Ziri storyline);
// if it is locked nothing fills and the preamble below fails naming it.

const RANK = 10;
const QUESTS = [5112, 5120];

let fac = bot.rep("BaconCat");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no BaconCat entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled (5120 locked?) — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("Ice Cream Shark", "baconcatlair", 15);
  bot.quest.unregister();
  fac = bot.rep("BaconCat");
  if (!fac.found) {
    throw new Error("no BaconCat faction after a round (quest 5120 unlocked? finish the Ziri storyline)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("Ice Cream Shark", "baconcatlair", 15);
  fac = bot.rep("BaconCat");
  if (fac.rank > last) {
    bot.notify("BaconCat rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("BaconCat stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
