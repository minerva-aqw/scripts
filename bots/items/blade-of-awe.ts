/// name: Blade of Awe
/// desc: Unlock quests 2933-2937, farm Blade of Awe rep to rank 6 via 2935, buy Blade of Awe from museum shop 631.

// Ported from Skua Good/GearOfAwe/BladeOfAwe.cs + CoreFarms.BladeofAweREP/UnlockBoA.
// Handler keys are requirement ItemIDs (stable); maps and monster names from the same source.
// 2937 pins Boss/Left in escherion; Skua's staff-target dance has no bot equivalent, the kill goes through the seated rotation.

if (!bot.ensureItem(17585)) {
  bot.quest(2933, {
    "17483": function () { bot.hunt("Sketchy Dragon", "j6"); }, // Stonewrit Found!
  });

  bot.quest(2934, {
    "17484": function () { bot.hunt("Fire Elemental", "gilead"); }, // Handle Found!
  });

  bot.quest(2935, {
    "17485": function () { bot.hunt("Skeletal Viking", "castleundead", 1, "Enter", "Left"); }, // Hilt Found!
  });

  bot.quest(2936, {
    "17486": function () { bot.hunt("Hydra Head", "hydra"); }, // Blade Found!
  });

  bot.quest(2937, {
    "17487": function () { bot.hunt("Escherion", "escherion", 1, "Boss", "Left"); }, // Runes Found!
  });

  let fac = bot.rep("Blade of Awe");
  if (!fac.found) {
    throw new Error("no Blade of Awe faction after unlock (check bot.rep spelling)");
  }

  while (fac.rank < 6) {
    bot.quest(2935, {
      "17485": function () { bot.hunt("Skeletal Viking", "castleundead", 1, "Enter", "Left"); }, // Hilt Found!
    });
    fac = bot.rep("Blade of Awe");
  }

  if (!bot.ensureItem(17585)) {
    bot.buyItem(631, 17585);
  }

  if (!bot.ensureItem(17585)) {
    throw new Error("Blade of Awe not held after buying from shop 631 (rank or gold gate?)");
  }
}
