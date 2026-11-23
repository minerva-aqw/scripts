/// name: Swag Token A farm
/// desc: Farms Super-Fan Swag Token A to 100, member and non-member paths. Member farms Token C in collectorlab r2, non-member farms Token D in terrarium, then trades up D-C-B-A at shop 325 in /collection.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Routes ported from Skua `CoreFarms.SwagTokenA` (non-member quests
// 1304/1307 in terrarium, member quests 1310/1312/1313/1314 in
// collectorlab r2 Left). Temp quest items drop off anything in those
// cells, so every handler hunts "*" and tops up until the watch reads
// held. Trade-up ratios from the same source: 10 D -> 1 C (cap 500),
// 10 C -> 1 B (cap 200), 20 B -> 1 A (cap 100), all at shop 325 in
// /collection.
//
// Declarative form: `bot.quest(id, handlers, { choice })` accepts, fills
// each requirement through its handler, then turns in. Handler keys are
// requirement ItemIDs (stable, from quest-data); quantities from the
// same. 1304/1307 pay a reward choice (9396 = Super-Fan Swag Token D;
// C is the other choice); the member quests have no reward to pick, so
// -1 is right for them.

const WANT = 100;

function tokenQty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

// The pending list reads a miss immediately; an id `pickup` sends
// `getDrop` blind and polls the grant to `op_timeout` (30s) on a miss.
// Probe once: when the list is up, claim by name (fast miss) gated on
// the floor listing the token; when it is off (Custom Drops UI),
// fall back to the direct id pickup.
let listOk = true;
try {
  bot.drops();
} catch (err) {
  listOk = false;
}

function floorHasName(name) {
  if (!listOk) return true;
  const d = bot.drops();
  for (const e of d) {
    if (e.name === name) return true;
  }
  return false;
}

function claim(name, id) {
  if (listOk) return bot.pickup(name);
  return bot.pickup(id);
}

// Quest rewards can land on the floor instead of joining the backpack, so
// every turn-in round is followed by a claim pass before any travel
// leaves the room. Only send when the floor actually lists the token,
// so the wait is cheap list reads instead of 30s grant polls.
function drainTokens(names, ids, before) {
  let guard = 0;
  while (progress() <= before && guard < 60) {
    for (let i = 0; i < names.length; i++) {
      if (floorHasName(names[i])) claim(names[i], ids[i]);
    }
    guard += 1;
  }
  guard = 0;
  let clearing = true;
  while (clearing && guard < 10) {
    clearing = false;
    for (let i = 0; i < names.length; i++) {
      if (floorHasName(names[i])) {
        claim(names[i], ids[i]);
        clearing = true;
      }
    }
    guard += 1;
  }
  if (progress() <= before) {
    throw new Error(
      "swag turn-ins left no tokens on the floor or in the bags (" + before + " held): " +
      "re-run resumes where it left off"
    );
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

const quests = member ? [1310, 1312, 1313, 1314] : [1304, 1307];
const choice = member ? -1 : 9396;
const map = member ? "collectorlab" : "terrarium";
const cell = member ? "r2" : "Enter";
const pad = member ? "Left" : "Spawn";
const claimed = member
  ? ["Super-Fan Swag Token C"]
  : ["Super-Fan Swag Token D", "Super-Fan Swag Token C"];
const claimedIds = member ? [9395] : [9396, 9395];

// One "*" hunt per requirement: qty is a floor, the hunt tops up until
// the watch reads held, sweeping floor drops as it goes.
const handlers = member ? {
  1310: {
    "9317": function () { bot.hunt("*", map, 1, cell, pad); }, // Doppelganger Documents
  },
  1312: {
    "9377": function () { bot.hunt("*", map, 5, cell, pad); }, // Lead-based Liquid
    "9378": function () { bot.hunt("*", map, 7, cell, pad); }, // XY Elixir
    "9379": function () { bot.hunt("*", map, 3, cell, pad); }, // Scientific Super-slush
  },
  1313: {
    "9381": function () { bot.hunt("*", map, 1, cell, pad); }, // Sage Uldor's Head Replica
    "9382": function () { bot.hunt("*", map, 1, cell, pad); }, // Robina's Head Replica
    "9383": function () { bot.hunt("*", map, 1, cell, pad); }, // Slugwrath's Head Replica
    "9384": function () { bot.hunt("*", map, 1, cell, pad); }, // Pramithia's Head Replica
    "9385": function () { bot.hunt("*", map, 1, cell, pad); }, // Super Death's Head Replica
    "9386": function () { bot.hunt("*", map, 1, cell, pad); }, // Rolly Pony's Head Replica
  },
  1314: {
    "9388": function () { bot.hunt("*", map, 10, cell, pad); }, // Wanted Rock
    "9387": function () { bot.hunt("*", map, 5, cell, pad); }, // Winding String
  },
} : {
  1304: {
    "9306": function () { bot.hunt("*", map, 1, cell, pad); }, // Running Shoes
    "9307": function () { bot.hunt("*", map, 1, cell, pad); }, // Track Suit
    "9308": function () { bot.hunt("*", map, 1, cell, pad); }, // Sweatband
    "9309": function () { bot.hunt("*", map, 1, cell, pad); }, // Water bottle
  },
  1307: {
    "9540": function () { bot.hunt("*", map, 10, cell, pad); }, // Ball of Fluff
    "9313": function () { bot.hunt("*", map, 10, cell, pad); }, // Dust Bunny Blown Apart!
  },
};

// The two tokens a round can actually move: A always, and the one this path
// farms (C for members, D otherwise). Measured before the hunt and after the
// claim pass, so a round that turns nothing in is visible.
function progress() {
  return (
    tokenQty("Super-Fan Swag Token A") +
    (member ? tokenQty("Super-Fan Swag Token C") : tokenQty("Super-Fan Swag Token D"))
  );
}

let rounds = 0;
while (tokenQty("Super-Fan Swag Token A") < WANT) {
  if (rounds >= 500) {
    throw new Error("swag tokens stalled at " + tokenQty("Super-Fan Swag Token A") + "/" + WANT);
  }
  const before = progress();
  for (const id of quests) {
    bot.quest(id, handlers[id], { choice: choice });
  }
  // Rewards always pay on a successful round, so the claim pass below
  // throws when nothing moved; the trip to the shop only happens when a
  // hand-in actually paid — never a map change per round that gains
  // nothing.
  drainTokens(claimed, claimedIds, before);
  tradeUp();
  rounds += 1;
}
