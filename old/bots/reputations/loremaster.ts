/// name: Loremaster rep
/// desc: Farms Loremaster reputation to rank 10: quest 7505 in wardwarf (member: 3032 in druids after the 3029-3031 unlock chain). Notifies on every rank-up.

// Ported from Skua `Farm/REP/LoremasterREP.cs` + `CoreFarms.LoremasterREP`.
// Free runs 7505 "Studying the Rogue" all the way; members run 7505 to
// rank 3, clear the one-time druids unlock chain, then repeat 3032 "Quite
// the Problem". Handler keys are ItemIDs (stable). The unlock quests are
// no-ops when already completed, so re-runs resume where they stopped.

const RANK = 10;

const rogue = {
  "54577": function () { bot.hunt("Drow Assassin", "wardwarf", 1); }, // Poisoned Dagger
  "54578": function () { bot.hunt("D'wain Jonsen", "wardwarf", 1); }, // Scroll: Opportunity's Strike
};
const knell = {
  "18528": function () { bot.hunt("Young Void Giant", "druids", 1, "r5", "Left"); }, // Void Giant Death Knell
};

let fac = bot.rep("Loremaster");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Loremaster entry yet: one turn-in registers it.
  bot.quest(7505, rogue);
  fac = bot.rep("Loremaster");
  if (!fac.found) {
    throw new Error("no Loremaster faction after a turn-in (check bot.rep spelling)");
  }
  last = fac.rank;
}

function cycle(id, handlers) {
  bot.quest(id, handlers);
  fac = bot.rep("Loremaster");
  if (fac.rank > last) {
    bot.notify("Loremaster rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}

if (bot.me().upgraded === true) {
  while (fac.rank < 3 && fac.rank < RANK) {
    cycle(7505, rogue);
  }
  // One-time unlock chain for 3032 (each is a no-op when already done).
  bot.quest(3029, {
    "18525": function () { bot.hunt("Void Bear", "druids", 1, "r2", "Left"); }, // Voidstone
  });
  bot.quest(3030, {
    "18526": function () { bot.hunt("Void Larva", "druids", 1, "r6", "Left"); }, // Void Larvae Death Cry
  });
  bot.quest(3031, {
    "18527": function () { bot.hunt("Void Ghast", "druids", 1, "r6", "Left"); }, // Ghast's Death Cry
  });
  while (fac.rank < RANK) {
    cycle(3032, knell);
  }
} else {
  while (fac.rank < RANK) {
    cycle(7505, rogue);
  }
}
