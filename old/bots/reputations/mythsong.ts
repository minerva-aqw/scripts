/// name: Mythsong rep
/// desc: Farms Mythsong reputation to rank 10 via quest 4829 Sugar, Sugar in beehive. Requires Lord of Chaos Kimberly (7th LoC) done to unlock 4829. Notifies on every rank-up.

// Ported from Skua `CoreFarms.MythsongREP`: quest 4829 "Sugar, Sugar"
// wants Honey Gathered x10 off Stinger in beehive, each turn-in pays
// Mythsong rep. `bot.quest` accepts, fills via the handler, and turns in
// by itself; the outer loop runs that cycle until rank 10. Handler keyed
// by ItemID. If 4829 is locked (Kimberly saga incomplete) the first cycle
// fails naming the quest instead of farming blind.

const RANK = 10;

const honey = {
  "33572": function () { bot.hunt("Stinger", "beehive", 1); }, // Honey Gathered
};
bot.quest(4829, honey);

let fac = bot.rep("Mythsong");
if (!fac.found) {
  throw new Error("no Mythsong faction after a turn-in (quest 4829 unlocked? do LoC Kimberly first)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(4829, honey);
  fac = bot.rep("Mythsong");
  if (fac.rank > last) {
    bot.notify("Mythsong rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
