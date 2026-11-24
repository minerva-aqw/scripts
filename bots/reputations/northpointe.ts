/// name: Northpointe rep
/// desc: Farms Northpointe reputation to rank 10 via quest 4027 Sage Advice (Bunch of Sage off Grim Stalker). Notifies on every rank-up.

// Ported from Skua `CoreFarms.NorthpointeREP`: quest 4027 "Sage Advice"
// wants Bunch of Sage x10 off Grim Stalker in northpointe, a temp drop
// (auto-loot, no floor drain). Single-quest declarative loop relies on the
// composite's own stall error — no extra guard.
const RANK = 10;

const sage = {
  "28190": function () { bot.hunt("Grim Stalker", "northpointe", 10); }, // Bunch of Sage
};
bot.quest(4027, sage);

let fac = bot.rep("Northpointe");
if (!fac.found) {
  throw new Error("no Northpointe faction after a turn-in (quest 4027 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(4027, sage);
  fac = bot.rep("Northpointe");
  if (fac.rank > last) {
    bot.notify("Northpointe rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
