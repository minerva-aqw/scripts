/// name: Good rep
/// desc: Farms Good reputation to rank 10: quest 1952 in PoisonForest when the story is done, else 369 to rank 4 then 371 (member) / 372. Aligns Good itself first. Notifies on every rank-up.

// Ported from Skua `CoreFarms.GoodREP` (rep only). Alignment is automatic
// (`bot.align`, same packet as Skua's `ChangeAlignment`); quest 369 refuses
// otherwise, so a failed switch fails the run up front. Story branch is
// gated on 1955 like Skua. Every requirement is a temp drop (auto-loot, no
// floor drain). Single-quest declarative loops rely on the composite's own
// stall error — no extra guard.
const RANK = 10;

if (!bot.align("good")) {
  throw new Error("alignment switch refused (align Good manually first)");
}

let fac;
let last;
if (bot.quest(1955).completed()) {
  const loyal = {
    "11819": function () { bot.hunt("Burning Loyalist", "poisonforest", 10); }, // Knight Soothed
  };
  bot.quest(1952, loyal);
  fac = bot.rep("Good");
  if (!fac.found) {
    throw new Error("no Good faction after a turn-in (quest 1952 unlocked? 1955 done?)");
  }
  last = fac.rank;
  while (fac.rank < RANK) {
    bot.quest(1952, loyal);
    fac = bot.rep("Good");
    if (fac.rank > last) {
      bot.notify("Good rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
} else {
  const slime = {
    "1821": function () { bot.hunt("*", "swordhavenbridge", 6, "Bridge", "Left"); }, // Slime in a Jar
  };
  bot.quest(369, slime);
  fac = bot.rep("Good");
  if (!fac.found) {
    throw new Error("no Good faction after a turn-in (quest 369 needs Good alignment)");
  }
  last = fac.rank;
  while (fac.rank < 4) {
    bot.quest(369, slime);
    fac = bot.rep("Good");
    if (fac.rank > last) {
      bot.notify("Good rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
  const member = bot.me().upgraded === true;
  const fang = {
    "1823": function () { bot.hunt("Grumble", "sewer", 1, "End", "Left"); }, // Grumble's Fang
  };
  const skull = {
    "1824": function () { bot.hunt("*", "castleundead", 5, "Enter", "Spawn"); }, // Chaorrupted Skull
  };
  while (fac.rank < RANK) {
    bot.quest(member ? 371 : 372, member ? fang : skull);
    fac = bot.rep("Good");
    if (fac.rank > last) {
      bot.notify("Good rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
}
