/// name: Shadow Dragon Shinobi class
/// desc: Gets the Shadow Dragon Shinobi class: Dragon Shinobi Tokens via 7815 in blackfridaywar, buy from merge shop 756. Seasonal (Black Friday only).

// Ported from Skua Seasonal/BlackFriday (ShadowDragonShinobi.cs + merge).
// No quest grants the class: merge shop 756 in blackfridaywar, 300 tokens.
// Skua prefers 7924 (shadowfortress scales, 30 tokens/round) when available
// and falls back to 7815; this bot runs 7815 unconditionally (event map, no
// prerequisites) — 10 tokens per round, 30 rounds for the class. The travel
// below is the seasonal gate: blackfridaywar only exists while the event is
// live, otherwise it fails naming the map.

function tokenQty() {
  const inv = bot.inventory(20561);
  return inv.found ? inv.qty : 0;
}

if (!bot.ensureItem("Shadow Dragon Shinobi")) {
  let rounds = 0;
  while (tokenQty() < 300 && rounds < 60) {
    bot.quest(7815, {
      "57714": function () { bot.hunt("Deal Bot 2.0", "blackfridaywar", 20); }, // EbilCorp Bots Battled x20
      "57715": function () { bot.hunt("*", "blackfridaywar", 20); }, // EbilCorp Shoppers Saved x20 (census cell, tops up until held)
    });
    rounds += 1;
  }
  if (tokenQty() < 300) {
    throw new Error("Shadow Dragon Shinobi stalled at " + tokenQty() + "/300 tokens (7815 dry? event ending?)");
  }

  bot.travel("blackfridaywar");
  if (!bot.buyItem(756, "Shadow Dragon Shinobi")) {
    throw new Error("shop 756 would not sell Shadow Dragon Shinobi (300 tokens held? event still live?)");
  }

  if (!bot.ensureItem("Shadow Dragon Shinobi")) {
    throw new Error("Shadow Dragon Shinobi not held after buying from shop 756");
  }
}
