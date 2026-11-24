/// name: Blade of Awe rep
/// desc: Farms Blade of Awe reputation to rank 10 via 2935 Hilt turn-ins. Assumes the 2933-2937 unlock chain is done.

// Ported from Skua `CoreFarms.BladeofAweREP` (rep half; the item buy lives
// in bots/items/blade-of-awe.ts). 2935 pays rep per Hilt turn-in, so the
// loop runs one declarative round at a time until the faction reads 10.
// Skeletal Viking in castleundead Enter/Left is the fastest of the five
// unlock hunts, which is why Skua registers 2935 and nothing else.
// Handler keys are requirement ItemIDs (stable).

const RANK = 10;

const hilt = {
  "17485": function () { bot.hunt("Skeletal Viking", "castleundead", 1, "Enter", "Left"); }, // Hilt Found!
};

// Unlock chain already done — straight to the fastest hunt.
bot.quest(2935, hilt);

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
