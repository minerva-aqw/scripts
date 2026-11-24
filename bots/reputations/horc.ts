/// name: Horc rep
/// desc: Farms Horc reputation to rank 10 via quest 1265 in bloodtuskwar (Chaorrupted drops off the three Chaotic mobs). Notifies on every rank-up.

// Ported from Skua `CoreFarms.HorcREP`: quest 1265 "Zot Gives Peace" wants
// Chaorrupted Eye x3 + Tentacle x5 + Tusk x5, all temp drops (auto-loot, no
// floor drain). `bot.quest` accepts, fills via the handlers, and turns in
// by itself; the outer loop runs that cycle until rank 10. Single-quest
// declarative loop relies on the composite's own stall error.
const RANK = 10;

const zot = {
  "9043": function () { bot.hunt("Chaotic Lemurphant", "bloodtuskwar", 3); }, // Chaorrupted Eye
  "9044": function () { bot.hunt("Chaotic Horcboar", "bloodtuskwar", 5); }, // Chaorrupted Tentacle
  "9045": function () { bot.hunt("Chaotic Chinchilizard", "bloodtuskwar", 5); }, // Chaorrupted Tusk
};
bot.quest(1265, zot);

let fac = bot.rep("Horc");
if (!fac.found) {
  throw new Error("no Horc faction after a turn-in (quest 1265 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(1265, zot);
  fac = bot.rep("Horc");
  if (fac.rank > last) {
    bot.notify("Horc rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
