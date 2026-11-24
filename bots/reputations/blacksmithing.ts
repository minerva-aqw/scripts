/// name: Blacksmithing rep
/// desc: Farms Blacksmithing reputation to rank 10 (monster-farm path, not gold): quest 2777 to rank 4, then 8736 to rank 10. Notifies on every rank-up.

// Ported from Skua `CoreFarms.BlacksmithingREP` with UseGold=false: the
// gold/voucher turn-in path has no place in a quest bot. Both farm quests
// run as single-quest declarative cycles. Every requirement is a temp drop
// (auto-loot, no floor drain) per quest-data.json. Handler keys are ItemIDs.

const RANK = 10;

const socks = {
  "18424": function () { bot.hunt("Wolf", "greenguardeast", 1); }, // Furry Lost Sock
  "16490": function () { bot.hunt("Slime", "greenguardwest", 1); }, // Slimy Lost Sock
};
const machining = {
  "43797": function () { bot.hunt("Hydra Head 25", "hydrachallenge", 1); }, // Hydra Scale Piece
  "7990": function () { bot.hunt("Creature Creation", "maul", 1); }, // Creature Shard
  "23690": function () { bot.hunt("Dread Klunk", "towerofdoom", 1); }, // Monster Trophy
};

let fac = bot.rep("Blacksmithing");
if (!fac.found) {
  bot.quest(2777, socks);
  fac = bot.rep("Blacksmithing");
  if (!fac.found) {
    throw new Error("no Blacksmithing faction after a turn-in (quest 2777 filling?)");
  }
}

let last = fac.rank;
const phases = [
  { rank: 4, id: 2777, handlers: socks },
  { rank: RANK, id: 8736, handlers: machining },
];
for (const phase of phases) {
  while (fac.rank < phase.rank) {
    bot.quest(phase.id, phase.handlers);
    fac = bot.rep("Blacksmithing");
    if (fac.rank > last) {
      bot.notify("Blacksmithing rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
}
