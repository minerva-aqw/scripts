/// name: Swag Token A farm
/// desc: Farms Super-Fan Swag Token A to 100, member and non-member paths. Member farms Token C in collectorlab r2, non-member farms Token D in terrarium, then trades up D-C-B-A at shop 325 in /collection.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Routes ported from Skua `CoreFarms.SwagTokenA` (non-member quests
// 1304/1307 in terrarium, member quests 1310/1312/1313/1314 in
// collectorlab r2 Left). Kills are "*" — the temp quest items drop off
// anything in those cells while the quests are accepted. Trade-up ratios
// from the same source: 10 D -> 1 C (cap 500), 10 C -> 1 B (cap 200),
// 20 B -> 1 A (cap 100), all at shop 325 in /collection.
//
// This is the registered form of the farm (Skua's `RegisterQuests`): every
// quest of the path is registered once, and the engine's tick accepts them
// and hands them in as their bags fill — the script never waits on a quest,
// it only kills, claims what fell on the floor, and trades up. The sweep cost
// is one projection round trip per interval, not per quest.

const WANT = 100;

function tokenQty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

// Quest rewards can land on the floor instead of joining the backpack, so
// every turn-in is followed by a claim pass before any travel leaves the
// room. `pickup` with a name claims one per call and reads false on a miss,
// so loop until the floor is clear of it.
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

// What the last sweep did, for the stall message: the reason a farm that is
// killing and claiming is not gaining tokens should be on screen, not guessed.
function sweptConcern(swept) {
  const list = (swept && swept.swept) || [];
  for (const d of list) {
    if (d.did === "refused") {
      return "quest " + d.id + " turn-in refused: " + (d.why || "no message");
    }
    if (d.did === "error") {
      return "quest " + d.id + " failed: " + (d.why || "no message");
    }
  }
  for (const d of list) {
    if (d.did === "accept") {
      return "quest " + d.id + " is not staying in the tracker";
    }
  }
  return "nothing changed";
}

const me = bot.me();
const member = me.upgraded === true;

// Hand the whole path to the tick. 1304/1307 pay a reward choice (9396 =
// Super-Fan Swag Token D; Skua farms D, C is the other choice); the member
// quests have no reward to pick, so -1 is right for them.
const quests = member ? [1310, 1312, 1313, 1314] : [1304, 1307];
bot.quest.register(quests, { choice: member ? -1 : 9396 });

// The two tokens a round can actually move: A always, and the one this path
// farms (C for members, D otherwise). Measured before the hunt and after the
// claim pass, so a round that turns nothing in is visible.
function progress() {
  return (
    tokenQty("Super-Fan Swag Token A") +
    (member ? tokenQty("Super-Fan Swag Token C") : tokenQty("Super-Fan Swag Token D"))
  );
}

// The tick accepts, but it does not wait — and a kill that lands before the
// quest reaches the tracker does not count for it (the hunt also reads the
// in-progress set when it starts, so an early hunt sees nothing to fill). So
// the fill does not begin until the tracker holds the path. Twenty short
// looks; after that the farm hunts anyway and the stall watchdog speaks.
function inTracker() {
  for (const id of quests) {
    const q = bot.quest(id);
    if (q.active() !== true && q.done() !== true) return false;
  }
  return true;
}
for (let look = 0; look < 20; look++) {
  if (inTracker()) break;
}

const map = member ? "collectorlab" : "terrarium";
const cell = member ? "r2" : "Enter";
const pad = member ? "Left" : "Spawn";
const claimed = member
  ? ["Super-Fan Swag Token C"]
  : ["Super-Fan Swag Token D", "Super-Fan Swag Token C"];

let stall = 0;
while (tokenQty("Super-Fan Swag Token A") < WANT) {
  const before = progress();
  // One hunt fills every registered quest at once: "*" matches no requirement
  // by name, so it tops up against the whole watch instead of one at a time.
  bot.hunt("*", map, 1, cell, pad);
  // Forced pass: the tick may be mid-interval and this is the moment the bags
  // are full. The hand-ins land here, so the floor can be claimed below.
  const swept = bot.quest.sweep();
  const turnedIn = ((swept && swept.swept) || []).filter(function (d) {
    return d.did === "turnin";
  }).length;
  pickupTokens(claimed);
  if (progress() > before) {
    stall = 0;
  } else {
    // The composite this replaced failed the run after five empty rounds; a
    // full hunt mission plus a claim pass is a much larger round, so eight of
    // them with no token movement is already a wedged farm.
    stall += 1;
    if (stall >= 8) {
      throw new Error("swag tokens are not moving: " + sweptConcern(swept));
    }
  }
  // Only leave the farming map when a hand-in actually paid. A trip to the
  // shop with nothing to trade is a map change per round that gains nothing —
  // the bot sits in /collection looking stuck while the kill loop waits for it.
  if (turnedIn > 0) tradeUp();
}
bot.quest.unregister();
