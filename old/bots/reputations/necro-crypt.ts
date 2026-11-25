/// name: Necro Crypt rep
/// desc: Farms Necro Crypt reputation to rank 10 via quest 3048 in castleundead (Old Bone off Skeletal Viking). Notifies on every rank-up.

// Ported from Skua `CoreFarms.NecroCryptREP`: quest 3048 "Help Professor
// Mueran" wants Old Bone x25 off Skeletal Viking, a temp drop (auto-loot,
// no floor drain). Single-quest declarative loop relies on the composite's
// own stall error — no extra guard.
const RANK = 10;

const bones = {
  "18905": function () { bot.hunt("Skeletal Viking", "castleundead", 25); }, // Old Bone
};
bot.quest(3048, bones);

let fac = bot.rep("Necro Crypt");
if (!fac.found) {
  throw new Error("no Necro Crypt faction after a turn-in (quest 3048 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(3048, bones);
  fac = bot.rep("Necro Crypt");
  if (fac.rank > last) {
    bot.notify("Necro Crypt rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
