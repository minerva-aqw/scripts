/// name: Carcossa Court rep
/// desc: Farms Carcossa Court reputation to rank 10: registers quests 10810 (+10811/10812 as the story unlocks them), loops templeofdoom r7. Requires the story through Light and Lemming. Notifies on every rank-up.

// Ported from Skua `CoreFarms.CarcossaCourtRep` (the CoreSunSet story run
// is not ported: finish through "Light and Lemming" in templeofdoom
// first). The three quests unlock progressively, so the registered set
// follows completed() history and every registered quest fills off "*"
// kills in r7/Bottom, with the tick sweep turning in whatever filled. All
// requirements are temp drops (auto-loot, no floor drain).

const RANK = 10;

let QUESTS = [10810];
if (bot.quest(10812).completed()) {
  QUESTS = [10810, 10811, 10812];
} else if (bot.quest(10811).completed()) {
  QUESTS = [10810, 10811];
}
// Worst-case drops per round: 9 (10810) + 3 (10811) + 50 (10812).
const PER_ROUND = QUESTS.length === 3 ? 50 : 9;

let fac = bot.rep("Carcossa Court");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no entry yet: one round registers it via the
  // sweep turn-ins. Still missing means nothing filled (story prereq?) —
  // fail instead of farming blind.
  bot.quest.register(QUESTS);
  bot.hunt("*", "templeofdoom", PER_ROUND, "r7", "Bottom");
  bot.quest.unregister();
  fac = bot.rep("Carcossa Court");
  if (!fac.found) {
    throw new Error("no Carcossa Court faction after a round (quests filling? finish the story through Light and Lemming)");
  }
  last = fac.rank;
}

bot.quest.register(QUESTS);
let dry = 0;
while (fac.rank < RANK) {
  bot.hunt("*", "templeofdoom", PER_ROUND, "r7", "Bottom");
  fac = bot.rep("Carcossa Court");
  if (fac.rank > last) {
    bot.notify("Carcossa Court rank " + fac.rank + "/" + RANK);
    last = fac.rank;
    dry = 0;
  } else {
    dry += 1;
    if (dry >= 30) {
      throw new Error("Carcossa Court stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
    }
  }
}
bot.quest.unregister();
