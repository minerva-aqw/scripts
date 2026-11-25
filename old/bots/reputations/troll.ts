/// name: Troll rep
/// desc: Farms Troll reputation to rank 10 via quest 1263 in bloodtuskwar (Lemurphant eye, Horcboar tentacle, Chinchilizard tusk). Notifies on every rank-up.

// Ported from Skua `CoreFarms.TrollREP`: quest 1263 wants Chaorrupted Eye
// x3, Tentacle x5 and Tusk x5 (all temp) off the three Chaotic mobs.
// `bot.quest` accepts, fills via the handlers, and turns in by itself;
// the loop runs that cycle to rank 10. Handler keys are ItemIDs.

const RANK = 10;

const h = {
  "9043": function () { bot.hunt("Chaotic Lemurphant", "bloodtuskwar", 1); }, // Chaorrupted Eye
  "9044": function () { bot.hunt("Chaotic Horcboar", "bloodtuskwar", 1); }, // Chaorrupted Tentacle
  "9045": function () { bot.hunt("Chaotic Chinchilizard", "bloodtuskwar", 1); }, // Chaorrupted Tusk
};
bot.quest(1263, h);

let fac = bot.rep("Troll");
if (!fac.found) {
  throw new Error("no Troll faction after a turn-in (check bot.rep spelling)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(1263, h);
  fac = bot.rep("Troll");
  if (fac.rank > last) {
    bot.notify("Troll rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
