/// name: Cape of Awe
/// desc: Hunts Binky in doomvault for the Cape Shard, turns in quest 4180, merges Cape Fragment to Cape Relic to Cape of Awe in museum shop 1129.

 // Cape of Awe (29375) via quest 4180 + museum merge shop 1129.
 // Chain, all verified live: Binky in doomvault r5 drops Cape Shard
 // (29387, permanent); quest 4180 turns 1 shard into 1 Cape Fragment
 // (29394, needs Armor of Awe Pass held + level 55 + faction 29 rank 10);
 // shop 1129 merges Fragment x1 to Cape Relic (29401), Relic x1 to Cape.
 // Pass comes from museum shop 1130 when missing; rep farms through the
 // same 2935 Hilt loop as the Blade of Awe rep bot.

// Binky hits like a boss (doomvault r5, pinned cell, no census needed).
const ShardHandlers = {
  "29387": function () { bot.hunt("Binky", "doomvault", 1, "r5", "Spawn"); }, // Cape Shard
};

const HiltHandlers = {
  "17485": function () { bot.hunt("Skeletal Viking", "castleundead", 1, "Enter", "Left"); }, // Hilt Found!
};

if (!bot.ensureItem(29375)) {
  if (!bot.ensureItem(29404)) {
    bot.travel("museum");
    if (!bot.buyItem(1130, 29404)) {
      throw new Error("Cape of Awe short: Armor of Awe Pass not in museum shop 1130");
    }
  }

  let fac = bot.rep("Blade of Awe");
  if (!fac.found) {
    throw new Error("no Blade of Awe faction after pass (check bot.rep spelling)");
  }

  while (fac.rank < 10) {
    bot.quest(2935, HiltHandlers);
    fac = bot.rep("Blade of Awe");
  }

  bot.quest(4180, ShardHandlers);

  // Relic then Cape, both merges in shop 1129 (museum map rule: the buys
  // happen from museum, a cross-map shop load reads as a disconnect).
  bot.travel("museum");
  if (!bot.ensureItem(29401)) {
    if (!bot.buyItem(1129, 29401)) {
      throw new Error("Cape of Awe short: Cape Relic not merging at 1129 (Fragment held?)");
    }
  }

  if (!bot.buyItem(1129, 29375)) {
    throw new Error("Cape of Awe short: Cape not merging at 1129 (Relic held?)");
  }

  if (!bot.ensureItem(29375)) {
    throw new Error("Cape of Awe not held after 1129 merge (check bags)");
  }
}
