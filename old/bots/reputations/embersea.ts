/// name: Embersea rep
/// desc: Farms Embersea reputation to rank 10: quest 4080 in Pyrewatch when unlocked (map item 3162), else Blazebinders in fireforge via 4228. Notifies on every rank-up.

// Ported from Skua `CoreFarms.EmberseaREP`, which branches on whether the
// 4080 story line is done. Easy path: 4080 "Spreading Like Wildfire" wants
// Mirror Rebuilt x4 off map item 3162 in Pyrewatch. Hard path: 4228 "Slay
// the Blazebinders" wants Defeated Blazebinder x5, killed off anything in
// fireforge cell 4 like Skua does. Both requirements are temp drops
// (auto-loot, no floor drain). Single-quest declarative loops rely on the
// composite's own stall error — no extra guard.
const RANK = 10;

function cycle(id, handlers) {
  bot.quest(id, handlers);
  const fac = bot.rep("Embersea");
  if (!fac.found) {
    throw new Error("no Embersea faction after a turn-in (quest " + id + " filling?)");
  }
  return fac;
}

let fac;
let last;
if (bot.quest(4080).completed()) {
  const wildfire = {
    "28575": function () { bot.gather(3162, "pyrewatch", 4); }, // Mirror Rebuilt
  };
  fac = cycle(4080, wildfire);
  last = fac.rank;
  while (fac.rank < RANK) {
    bot.quest(4080, wildfire);
    fac = bot.rep("Embersea");
    if (fac.rank > last) {
      bot.notify("Embersea rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
} else {
  const blaze = {
    "29666": function () { bot.hunt("*", "fireforge", 5, "4", "Left"); }, // Defeated Blazebinder
  };
  fac = cycle(4228, blaze);
  last = fac.rank;
  while (fac.rank < RANK) {
    bot.quest(4228, blaze);
    fac = bot.rep("Embersea");
    if (fac.rank > last) {
      bot.notify("Embersea rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
}
