/// name: Ninja class
/// desc: Gets the Ninja class: Rogue from classhalla, Mazumi quests 90-92, Ninja purchase.

// Ported from Skua CoreFarmerJoe starter setup + Story/Mazumi.cs MazumiQuests.
// Handler keys are requirement ItemIDs (stable); maps and monster names from the same source.
// Skua's RankUpClass/Experience/SetClass/EquipClass calls have no bot equivalent
// and are skipped — kills go through the seated rotation, so seat something that
// can live through the Hit Job boss (Breken the Vile hits like a 10k-hp wall).
// Frogzard pins West3/Up and Big Bad Boar pins West12/Up, mirroring Skua's cells.

if (!bot.ensureItem("Ninja")) {
  if (!bot.ensureItem("Rogue") && !bot.ensureItem("Rogue (Rare)")) {
    bot.travel("classhalla");
    if (!bot.buyItem(172, "Rogue") && !bot.ensureItem("Rogue")) {
      throw new Error("shop 172 would not sell Rogue (gold gate?)");
    }
  }

  bot.quest(90, {
    "435": function () { bot.hunt("Fishman Soldier", "pirates", 12); }, // Pirate Medallion
  });

  bot.quest(91, {
    "42651": function () { bot.hunt("Kittarian", "greenguardwest", 2); }, // Kittarian's Wallet
    "42652": function () { bot.hunt("River Fishman", "greenguardwest", 2); }, // River Fishman's Wallet
    "42653": function () { bot.hunt("Slime", "greenguardwest", 2); }, // Slime-Soaked Wallet
    "42654": function () { bot.hunt("Frogzard", "greenguardwest", 2, "West3", "Up"); }, // Frogzard's Lint Hoard
    "42655": function () { bot.hunt("Big Bad Boar", "greenguardwest", 1, "West12", "Up"); }, // Big Bad Boar's Wallet
  });

  bot.quest(92, {
    "42649": function () { bot.hunt("Breken the Vile", "greenguardwest"); }, // Breken the Vile's Sword
    "42650": function () { bot.hunt("Ogug Stoneaxe", "greenguardwest"); }, // Ogug Stoneaxe's Helmet
  });

  if (!bot.ensureItem("Ninja")) {
    bot.travel("classhalla");
    if (!bot.buyItem(178, "Ninja") && !bot.ensureItem("Ninja")) {
      throw new Error("shop 178 would not sell Ninja (Mazumi chain incomplete?)");
    }
  }

  if (!bot.ensureItem("Ninja")) {
    throw new Error("Ninja not held after buying from shop 178");
  }
}
