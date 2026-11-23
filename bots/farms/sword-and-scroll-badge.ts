/// name: Sword and Scroll Badge farm
/// desc: Farms Sword and Scroll Badge to 100 via repeatable quest 7505 Studying the Rogue in wardwarf.

 // Ported from Skua HallofClassesMerge findIngredients ("Sword and Scroll Badge"
 // case): Poisoned Dagger x4 off Drow Assassin plus Scroll: Opportunity's
 // Strike x1 off D'wain Jonsen, both in wardwarf, one turn-in per badge.
//
// Registered form (Skua's `RegisterQuests`): the quest is registered once
// and the tick accepts it and hands it in as the bags fill — the script
// never waits on an accept, it only hunts, claims what fell on the floor,
// and picks up the reward. The sweep cost is one projection round trip
// per interval, not per turn-in. This replaces the composite
// `bot.quest(7505, handlers)` form, where every round paid a blocking
// accept (1200ms quest gap + two stable tracker reads) plus a blocking
// turn-in.

const WANT = 100;
const BADGE = 54680; // Sword and Scroll Badge

function held() {
  const inv = bot.inventory(BADGE);
  return inv.found ? inv.qty : 0;
}

function drain(before) {
  // The reward drop may not be on the floor yet right after turn-in, and
  // a bare pickup reads a miss without waiting (Skua's Wait.ForPickup
  // does). Each call round-trips to the host, so retrying doubles as the
  // wait: keep claiming until the count grows past what turn-in started
  // with, then clear any remainder on the floor.
  let guard = 0;
  while (held() <= before && guard < 20) {
    bot.pickup(BADGE);
    guard += 1;
  }
  guard = 0;
  while (bot.pickup(BADGE)) {
    guard += 1;
    if (guard >= 500) break;
  }
  if (held() <= before) {
    throw new Error(
      "quest 7505 turned in but no Sword and Scroll Badge arrived (" + before + " held): " +
      "reward still on the floor or the quest closed server-side — re-run resumes where it left off"
    );
  }
}

// What the last sweep did, for the stall message: the reason a farm that is
// killing and claiming is not gaining badges should be on screen, not guessed.
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

// The quest has no reward to pick, so -1 is right.
bot.quest.register(7505, { choice: -1 });

// The tick accepts, but it does not wait — and a kill that lands before the
// quest reaches the tracker does not count for it (the hunt also reads the
// in-progress set when it starts, so an early hunt sees nothing to fill). So
// the fill does not begin until the tracker holds the quest. Twenty short
// looks; after that the farm hunts anyway and the stall watchdog speaks.
function inTracker() {
  const q = bot.quest(7505);
  return q.active() === true || q.done() === true;
}
for (let look = 0; look < 20; look++) {
  if (inTracker()) break;
}

bot.pickup(BADGE);

let stall = 0;
while (held() < WANT) {
  const before = held();
  // Split drops, so one hunt per monster: qty is a floor, each hunt tops
  // up its own requirement until the watch reads held, sweeping floor
  // drops as it goes. Same map, so the second hunt stays put.
  bot.hunt("Drow Assassin", "wardwarf", 1);
  bot.hunt("D'wain Jonsen", "wardwarf", 1);
  // Forced pass: the tick may be mid-interval and this is the moment the
  // bags are full. The hand-in lands here, so the floor can be claimed
  // below.
  const swept = bot.quest.sweep();
  const turnedIn = ((swept && swept.swept) || []).filter(function (d) {
    return d.did === "turnin";
  }).length;
  if (turnedIn > 0) {
    drain(before);
  } else {
    // No hand-in yet: still claim a reward left on the floor from a
    // previous round before counting the round as empty.
    bot.pickup(BADGE);
  }
  if (held() > before) {
    stall = 0;
  } else {
    stall += 1;
    if (stall >= 8) {
      throw new Error("Sword and Scroll Badge is not moving: " + sweptConcern(swept));
    }
  }
}
bot.quest.unregister();
