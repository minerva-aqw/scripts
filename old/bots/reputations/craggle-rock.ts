/// name: CraggleRock rep
/// desc: Farms CraggleRock reputation to rank 10 via quest 7277 Star of the Sandsea, looping Kalestri Worshiper in wanders r2. Notifies on every rank-up.

// Ported from Skua `CoreFarms.CraggleRockREP`: quest 7277 wants Star of
// the Sandsea x1 off Kalestri Worshiper (the monster ID 560 Skua hunts by
// cell-jumping); each turn-in pays CraggleRock rep. Temp requirement
// (auto-loot, no floor drain). Handler keyed by ItemID.

const RANK = 10;

const star = {
  "52566": function () { bot.hunt("Kalestri Worshiper", "wanders", 1, "r2", "Down"); }, // Star of the Sandsea
};
bot.quest(7277, star);

let fac = bot.rep("CraggleRock");
if (!fac.found) {
  throw new Error("no CraggleRock faction after a turn-in (quest 7277 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(7277, star);
  fac = bot.rep("CraggleRock");
  if (fac.rank > last) {
    bot.notify("CraggleRock rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
