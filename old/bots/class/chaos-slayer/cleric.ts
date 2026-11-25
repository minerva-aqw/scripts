/// name: Chaos Slayer Cleric class
/// desc: Gets the Chaos Slayer Cleric class: 13 Lords of Chaos saga, buy from shop 891 in newfinale.

// Ported from Skua Other/Classes/REP-based/ChaosSlayer.cs (Cleric variant).
// Same gate for all four variants: full 13 Lords of Chaos saga, then one
// buy from shop 891 in newfinale. Only the shop entry differs.

if (!bot.ensureItem("Chaos Slayer Cleric")) {
  if (!bot.quest(3799).completed() || !bot.quest(3881).completed()) {
    throw new Error("needs 13 Lords of Chaos saga first (quests 3799 + 3881 incomplete)");
  }
  bot.travel("newfinale");
  if (!bot.buyItem(891, "Chaos Slayer Cleric") && !bot.ensureItem("Chaos Slayer Cleric")) {
    throw new Error("shop 891 would not sell Chaos Slayer Cleric (13 LoC saga incomplete?)");
  }
  if (!bot.ensureItem("Chaos Slayer Cleric")) {
    throw new Error("Chaos Slayer Cleric not held after buying from shop 891");
  }
}
