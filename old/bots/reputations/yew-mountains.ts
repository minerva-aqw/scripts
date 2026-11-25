/// name: Yew Mountains rep
/// desc: Farms Yew Mountains reputation to rank 10. Runs daily 10342 once when never done; members farm 10345 (Gemrald, dwarfhold), free accounts register 10341+10346 in thelimacity. Notifies on every rank-up.

// Ported from Skua `CoreFarms.YewMountainsREP` (+ `Farm/REP/YewMountainsRep.cs`).
// Daily 10342 (Thelima Soldiers Trained x100, thelimacity r6/Left — a kill
// counter, no floor drain) runs once when never completed; re-runs skip it
// since there is no daily-complete API, and the farm loop below still
// progresses. Members loop declarative 10345 (Gemrald Shard, temp, off
// Gemrald in dwarfhold New1/Right). Free accounts register 10341 (Drow
// Tested x9, temp) + 10346 (Snowbeard's Bag of Gold x1, permanent floor
// drop, drained via pickup) over "*" kills, with the sweep turning in and
// a stall guard failing loudly instead of spinning.

const RANK = 10;

if (!bot.quest(10342).completed()) {
  bot.quest(10342, {
    "94877": function () { bot.hunt("*", "thelimacity", 100, "r6", "Left"); }, // Thelima Soldiers Trained
  });
}

const member = bot.me().upgraded === true;
const shard = {
  "94880": function () { bot.hunt("Gemrald", "dwarfhold", 1, "New1", "Right"); }, // Gemrald Shard
};

function drainBag() {
  let guard = 0;
  while (bot.pickup("Snowbeard's Bag of Gold")) {
    guard += 1;
    if (guard >= 100) break;
  }
}

let fac = bot.rep("Yew Mountains");
let last;
if (fac.found) {
  last = fac.rank;
} else if (member) {
  bot.quest(10345, shard);
  fac = bot.rep("Yew Mountains");
  if (!fac.found) {
    throw new Error("no Yew Mountains faction after a turn-in (check bot.rep spelling)");
  }
  last = fac.rank;
} else {
  bot.quest.register([10341, 10346]);
  bot.hunt("*", "thelimacity", 10, "r6", "Left");
  drainBag();
  bot.quest.unregister();
  fac = bot.rep("Yew Mountains");
  if (!fac.found) {
    throw new Error("no Yew Mountains faction after a round (quests 10341/10346 filling?)");
  }
  last = fac.rank;
}

if (member) {
  while (fac.rank < RANK) {
    bot.quest(10345, shard);
    fac = bot.rep("Yew Mountains");
    if (fac.rank > last) {
      bot.notify("Yew Mountains rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
} else {
  bot.quest.register([10341, 10346]);
  let dry = 0;
  while (fac.rank < RANK) {
    bot.hunt("*", "thelimacity", 10, "r6", "Left");
    drainBag();
    fac = bot.rep("Yew Mountains");
    if (fac.rank > last) {
      bot.notify("Yew Mountains rank " + fac.rank + "/" + RANK);
      last = fac.rank;
      dry = 0;
    } else {
      dry += 1;
      if (dry >= 30) {
        throw new Error("Yew Mountains stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
      }
    }
  }
  bot.quest.unregister();
}
