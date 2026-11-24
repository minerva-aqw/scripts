/// name: Blade of Awe rep
/// desc: Farms Blade of Awe reputation to rank 10: unlock chain 2933-2937, then 2935 Hilt turn-ins.

// Ported from Skua `CoreFarms.BladeofAweREP` (rep half; the item buy lives
// in bots/items/blade-of-awe.ts). 2935 pays rep per Hilt turn-in, so the
// loop runs one declarative round at a time until the faction reads 10.
// Handler keys are requirement ItemIDs (stable).

const RANK = 10;

const hilt = {
  "17485": function () { bot.hunt("Skeletal Viking", "castleundead", 1, "Enter", "Left"); }, // Hilt Found!
};

// Unlock first; completed steps return true without touching anything.
bot.quest(2933, {
  "17483": function () { bot.hunt("Sketchy Dragon", "j6"); }, // Stonewrit Found!
});
bot.quest(2934, {
  "17484": function () { bot.hunt("Fire Elemental", "gilead"); }, // Handle Found!
});
bot.quest(2935, hilt);
bot.quest(2936, {
  "17486": function () { bot.hunt("Hydra Head", "hydra"); }, // Blade Found!
});
bot.quest(2937, {
  "17487": function () { bot.hunt("Escherion", "escherion", 1, "Boss", "Left"); }, // Runes Found!
});

// Fresh accounts have no faction entry yet: one turn-in above registers it.
// Still missing means the name is wrong — fail instead of farming blind.
let fac = bot.rep("Blade of Awe");
if (!fac.found) {
  throw new Error("no Blade of Awe faction after unlock (check bot.rep spelling)");
}

while (fac.rank < RANK) {
  bot.quest(2935, hilt);
  fac = bot.rep("Blade of Awe");
}
