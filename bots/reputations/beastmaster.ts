/// name: BeastMaster rep
/// desc: Farms BeastMaster reputation to rank 10 (member-only): quest chain 3754 to rank 3, 3755 to rank 4, 3756 to rank 6, 3757 to rank 10. Notifies on every rank-up.

// Ported from Skua `CoreFarms.BeastMasterREP`. Member-only, so it gates up
// front. Each quest is a single-quest declarative cycle: `bot.quest`
// accepts, fills via the handlers, and turns in by itself. Every
// requirement is a temp drop (auto-loot, no floor drain). Handler keys are
// ItemIDs.

if (bot.me().upgraded !== true) {
  throw new Error("needs membership (BeastMaster rep is member-only)");
}

const RANK = 10;

const beasts = {
  "25454": function () { bot.hunt("Sneevil", "boxes", 1); }, // Beast Crate
  "25455": function () { bot.hunt("Fishwing", "pirates", 1); }, // Fish Scale
};
const scrolls = {
  "25460": function () { bot.hunt("Tanuki", "bamboo", 1); }, // Secret Scroll of Beast Commanding
  "25462": function () { bot.hunt("Pine Troll", "pines", 1); }, // Troll's Treatise on Beasts
};
const elementals = {
  "25470": function () { bot.hunt("Living Fire", "mafic", 1); }, // Living Flame Core
  "25469": function () { bot.hunt("Mana Imp", "elemental", 1); }, // Mana Manipulation Orb
};
const dark = {
  "25472": function () { bot.hunt("Golden Scarab", "pyramid", 1); }, // Gleaming Gems of Containment
  "25471": function () { bot.hunt("Solar Phoenix", "dreamnexus", 1); }, // Bright Binding of Submission
};

let fac = bot.rep("BeastMaster");
if (!fac.found) {
  bot.quest(3754, beasts);
  fac = bot.rep("BeastMaster");
  if (!fac.found) {
    throw new Error("no BeastMaster faction after a turn-in (quest 3754 filling?)");
  }
}

let last = fac.rank;
const phases = [
  { rank: 3, id: 3754, handlers: beasts },
  { rank: 4, id: 3755, handlers: scrolls },
  { rank: 6, id: 3756, handlers: elementals },
  { rank: RANK, id: 3757, handlers: dark },
];
for (const phase of phases) {
  while (fac.rank < phase.rank) {
    bot.quest(phase.id, phase.handlers);
    fac = bot.rep("BeastMaster");
    if (fac.rank > last) {
      bot.notify("BeastMaster rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
}
