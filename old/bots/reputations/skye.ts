/// name: Skye rep
/// desc: Farms Skye reputation to rank 10: needs quest 9125 Your Hero done (09SeaVoice), then registers 9709/9710/9711/9717 looping "*" in balemorale (r10/Bottom). Notifies on every rank-up.

// Ported from Skua `CoreFarms.SkyeREP`. Quest 9125 is a hard gate — the
// run stops naming it instead of farming a locked set. All four quests
// share one cell, so they are registered once and the tick sweep turns in
// whatever filled. Every requirement is temp (auto-loot, no floor drain).

const RANK = 10;
const QUESTS = [9709, 9710, 9711, 9717];

if (!bot.quest(9125).completed()) {
  throw new Error("quest 9125 Your Hero not done (run 09SeaVoice) — Skye farm locked");
}

let fac = bot.rep("Skye");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Skye entry yet: one round registers it via
  // the sweep turn-ins. Still missing after that means the quests never
  // filled — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("*", "balemorale", 10, "r10", "Bottom");
  bot.quest.unregister();
  fac = bot.rep("Skye");
  if (!fac.found) {
    throw new Error("no Skye faction after a round (quests 9709/9710/9711/9717 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "balemorale", 10, "r10", "Bottom");
  fac = bot.rep("Skye");
  if (fac.rank > last) {
    bot.notify("Skye rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Skye stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
