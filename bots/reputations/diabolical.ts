/// name: Diabolical rep
/// desc: Farms Diabolical reputation to rank 10: unlocks 7875/7876 once, then repeats 7877 in mudluk. Notifies on every rank-up.

// Ported from Skua `CoreFarms.DiabolicalREP`. Quests 7875 (Everlasting
// Scale off Unending Avatar, timevoid) and 7876 (Chaotic Arachnid's Flesh
// off ChaosWeaver Warrior, twilightedge) are one-time unlocks; they no-op
// when already completed, so re-runs resume at the farm quest 7877
// (Swamped Leech Tooth off Tiger Leech, mudluk). All requirements are temp
// drops (auto-loot). Handler keys are ItemIDs.

const RANK = 10;

if (!bot.quest(7877).completed()) {
  bot.quest(7875, {
    "58686": function () { bot.hunt("Unending Avatar", "timevoid", 1); }, // Everlasting Scale
  });
  bot.quest(7876, {
    "58687": function () { bot.hunt("ChaosWeaver Warrior", "twilightedge", 1); }, // Chaotic Arachnid's Flesh
  });
}

const tooth = {
  "58688": function () { bot.hunt("Tiger Leech", "mudluk", 1); }, // Swamped Leech Tooth
};
bot.quest(7877, tooth);

let fac = bot.rep("Diabolical");
if (!fac.found) {
  throw new Error("no Diabolical faction after a turn-in (quest 7877 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(7877, tooth);
  fac = bot.rep("Diabolical");
  if (fac.rank > last) {
    bot.notify("Diabolical rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
