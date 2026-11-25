/// name: Sandsea rep
/// desc: Farms Sandsea reputation to rank 10: registers quests 916/917/919/921/922, loops "*" in sandsea (Enter/Spawn). Notifies on every rank-up.

// Ported from Skua `CoreFarms.SandseaREP`. All five quests share one cell,
// so they are registered once and filled concurrently from "*" kills in
// Enter/Spawn; the tick sweep turns in whatever filled. Every requirement
// is a temp drop (auto-loot, no floor drain). A stall guard fails loudly
// instead of spinning if the turn-ins ever stop landing.

const RANK = 10;
const QUESTS = [916, 917, 919, 921, 922];

let fac = bot.rep("Sandsea");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Sandsea entry yet: one round registers it
  // via the sweep turn-ins. Still missing after that means the quests
  // never filled — fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("*", "sandsea", 10, "Enter", "Spawn");
  bot.quest.unregister();
  fac = bot.rep("Sandsea");
  if (!fac.found) {
    throw new Error("no Sandsea faction after a round (quests 916/917/919/921/922 filling?)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "sandsea", 10, "Enter", "Spawn");
  fac = bot.rep("Sandsea");
  if (fac.rank > last) {
    bot.notify("Sandsea rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Sandsea stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
