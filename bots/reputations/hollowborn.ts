/// name: Hollowborn rep
/// desc: Farms Hollowborn reputation to rank 10: neotower vindicators via 9865 (member: 10298) when the story is there, else Gargrowl + Shadow Guardian in shadowrealm via 7553 + 7555. Notifies on every rank-up.

// Ported from Skua `CoreFarms.HollowbornREP`. Skua picks the neotower path
// when quest 9865 is unlocked; here that reads as 9865 (or legend 10298)
// already completed. Every requirement is a temp drop (auto-loot, no floor
// drain). The two-quest shadowrealm path registers and sweeps with a stall
// guard; single-quest loops rely on the composite's own stall error.
const RANK = 10;

let fac;
let last;
if (bot.quest(9865).completed() || bot.quest(10298).completed()) {
  const id = bot.me().upgraded === true ? 10298 : 9865;
  const vindicated = {
    "87922": function () { bot.hunt("Vindicator Assassin", "neotower", 1, "r6", "Left"); }, // Blades
    "87923": function () { bot.hunt("Vindicator BeastTamer", "neotower", 1, "r7", "Right"); }, // Chain
    "87924": function () { bot.hunt("Vindicator Priest", "neotower", 1, "r10", "Right"); }, // Scripture
  };
  bot.quest(id, vindicated);
  fac = bot.rep("Hollowborn");
  if (!fac.found) {
    throw new Error("no Hollowborn faction after a turn-in (quest " + id + " filling?)");
  }
  last = fac.rank;
  while (fac.rank < RANK) {
    bot.quest(id, vindicated);
    fac = bot.rep("Hollowborn");
    if (fac.rank > last) {
      bot.notify("Hollowborn rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
  }
} else {
  const QUESTS = [7553, 7555];
  fac = bot.rep("Hollowborn");
  if (fac.found) {
    last = fac.rank;
  } else {
    bot.quest.register(QUESTS, { choice: 0 });
    bot.hunt("Gargrowl", "shadowrealm", 8, "r2", "Left");
    bot.hunt("Shadow Guardian", "shadowrealm", 5, "r2", "Left");
    bot.quest.unregister();
    fac = bot.rep("Hollowborn");
    if (!fac.found) {
      throw new Error("no Hollowborn faction after a round (quests 7553/7555 filling?)");
    }
    last = fac.rank;
  }
  bot.quest.register(QUESTS, { choice: 0 });
  let dry = 0;
  while (fac.rank < RANK) {
    bot.hunt("Gargrowl", "shadowrealm", 8, "r2", "Left"); // Darkseed
    bot.hunt("Shadow Guardian", "shadowrealm", 5, "r2", "Left"); // Shadow Medallion
    fac = bot.rep("Hollowborn");
    if (fac.rank > last) {
      bot.notify("Hollowborn rank " + fac.rank + "/" + RANK);
      last = fac.rank;
      dry = 0;
    } else {
      dry += 1;
      if (dry >= 30) {
        throw new Error("Hollowborn stalled at rank " + fac.rank + " (30 rounds with no rank-up)");
      }
    }
  }
  bot.quest.unregister();
}
