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
// accepts, fills via the handlers, and turns in by itself. Rewards can
// land on the floor, so every quest is followed by a pickup drain before
// any travel. Trade-up ratios from the same source: 10 D -> 1 C
// (cap 500), 10 C -> 1 B (cap 200), 20 B -> 1 A (cap 100), all at
// shop 325 in /collection.

const WANT = 100;

function tokenQty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

// Quest rewards can land on the floor instead of joining the backpack,
// and nothing claims them by itself — not the hunt sweep (it only
// covers watched requirements) and not the turn-in (fire-and-forget).
// Drain each token name after every quest, before any travel leaves
// the room. `pickup` with a name claims one per call and reads false
// on a miss, so loop until the floor is clear of it.
function pickupTokens(names) {
  for (const n of names) {
    let guard = 0;
    while (bot.pickup(n)) {
      guard += 1;
      if (guard >= 500) break;
    }
  }
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
    // Handlers keyed by ItemID: quest_status reports these requirements
    // with empty names, so sName keys never match (IDs win on collision).
    const lab = function () { bot.hunt("*", "collectorlab", 1, "r2", "Left"); };
    bot.quest(1310, {
      "9317": lab, // Doppelganger Documents
    });
    bot.quest(1312, {
      "9377": lab, // Lead-based Liquid
      "9378": lab, // XY Elixir
      "9379": lab, // Scientific Super-slush
    });
    bot.quest(1313, {
      "9381": lab, // Sage Uldor's Head Replica
      "9382": lab, // Robina's Head Replica
      "9383": lab, // Slugwrath's Head Replica
      "9384": lab, // Pramithia's Head Replica
      "9385": lab, // Super Death's Head Replica
      "9386": lab, // Rolly Pony's Head Replica
    });
    bot.quest(1314, {
      "9388": lab, // Wanted Rock
      "9387": lab, // Winding String
    });
    pickupTokens(["Super-Fan Swag Token C"]);
  } else {
    const terr = function () { bot.hunt("*", "terrarium", 1, "Enter", "Spawn"); };
    bot.quest(1304, {
      "9306": terr, // Running Shoes
      "9307": terr, // Track Suit
      "9308": terr, // Sweatband
      "9309": terr, // Water bottle
    }, { choice: 9396 }); // Super-Fan Swag Token D (Skua farms D; C is the other choice)
    // 1304 pays one choice per turn-in (D here).
    pickupTokens(["Super-Fan Swag Token D", "Super-Fan Swag Token C"]);
    bot.quest(1307, {
      "9540": terr, // Ball of Fluff
      "9313": terr, // Dust Bunny Blown Apart!
    }, { choice: 9396 }); // Super-Fan Swag Token D
    pickupTokens(["Super-Fan Swag Token D", "Super-Fan Swag Token C"]);
  }
  tradeUp();
}
