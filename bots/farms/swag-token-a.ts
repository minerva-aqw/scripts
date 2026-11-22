/// name: Swag Token A farm
/// desc: Farms Super-Fan Swag Token A to 100, member and non-member paths. Member farms Token C in collectorlab r2, non-member farms Token D in terrarium, then trades up D-C-B-A at shop 325 in /collection.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Routes ported from Skua `CoreFarms.SwagTokenA` (non-member quests
// 1304/1307 in terrarium, member quests 1310/1312/1313/1314 in
// collectorlab r2 Left). Kills are "*" — the temp quest items drop off
// anything in those cells while the quest is accepted, and `bot.quest`
// accepts, fills via the handlers, and turns in by itself. Trade-up
// ratios from the same source: 10 D -> 1 C (cap 500), 10 C -> 1 B
// (cap 200), 20 B -> 1 A (cap 100), all at shop 325 in /collection.

const WANT = 100;

function tokenQty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

function tradeUp() {
  bot.travel("collection");
  let d = tokenQty("Super-Fan Swag Token D");
  let c = tokenQty("Super-Fan Swag Token C");
  let b = tokenQty("Super-Fan Swag Token B");
  let a = tokenQty("Super-Fan Swag Token A");
  const buyC = Math.min(Math.floor(d / 10), 500 - c);
  if (buyC > 0) {
    bot.buyItem(325, "Super-Fan Swag Token C", buyC);
    c = tokenQty("Super-Fan Swag Token C");
    b = tokenQty("Super-Fan Swag Token B");
  }
  const buyB = Math.min(Math.floor(c / 10), 200 - b);
  if (buyB > 0) {
    bot.buyItem(325, "Super-Fan Swag Token B", buyB);
    b = tokenQty("Super-Fan Swag Token B");
    a = tokenQty("Super-Fan Swag Token A");
  }
  const buyA = Math.min(Math.floor(b / 20), WANT - a);
  if (buyA > 0) {
    bot.buyItem(325, "Super-Fan Swag Token A", buyA);
  }
}

const me = bot.me();
const member = me.upgraded === true;

while (tokenQty("Super-Fan Swag Token A") < WANT) {
  if (member) {
    bot.quest(1310, {
      "Doppelganger Documents": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
    });
    bot.quest(1312, {
      "Lead-based Liquid": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "XY Elixir": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Scientific Super-slush": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
    });
    bot.quest(1313, {
      "Sage Uldor's Head Replica": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Robina's Head Replica": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Slugwrath's Head Replica": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Pramithia's Head Replica": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Super Death's Head Replica": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Rolly Pony's Head Replica": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
    });
    bot.quest(1314, {
      "Wanted Rock": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
      "Winding String": function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); },
    });
  } else {
    bot.quest(1304, {
      "Running Shoes": function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); },
      "Track Suit": function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); },
      Sweatband: function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); },
      "Water bottle": function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); },
    });
    bot.quest(1307, {
      "Ball of Fluff": function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); },
      "Dust Bunny Blown Apart!": function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); },
    });
  }
  tradeUp();
}
