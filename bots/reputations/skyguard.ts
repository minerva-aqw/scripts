/// name: Skyguard rep
/// desc: Member-only: farms Swag Token C in collectorlab (r2/Left), exchanges C->B->A at shop 325, turns in quest 1326 to rank 10. Notifies on every rank-up.

// Ported from Skua `CoreFarms.SkyguardREP` -> `MembershipDues(Skyguard)`.
// Member-only: Skua returns early for free accounts, so this gates up
// front. Token C comes from the registered quests 1310/1312/1313/1314
// (their rewards) plus floor drops in r2, drained via pickup; shop 325 in
// collection trades C->B->A; each 1326 turn-in burns one Token A for rep.
// No per-requirement mapping needed: the registered set fills from shared
// "*" kills and the sweep turns in whatever completed.

const RANK = 10;

if (bot.me().upgraded !== true) {
  throw new Error("needs membership (Skyguard rep is member-only)");
}

function tokenQty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

// One token round: shared kills feed the registered set, drain the floor,
// then push whatever C/B is held one step up the exchange chain.
function farmTokens() {
  bot.quest.register([1310, 1312, 1313, 1314]);
  bot.hunt("*", "collectorlab", 20, "r2", "Left");
  let guard = 0;
  while (bot.pickup("Super-Fan Swag Token C")) {
    guard += 1;
    if (guard >= 100) break;
  }
  bot.quest.unregister();
  bot.travel("collection");
  const buyB = Math.min(Math.floor(tokenQty("Super-Fan Swag Token C") / 10), 200 - tokenQty("Super-Fan Swag Token B"));
  if (buyB > 0) bot.buyItem(325, "Super-Fan Swag Token B", buyB);
  const buyA = Math.min(Math.floor(tokenQty("Super-Fan Swag Token B") / 20), 100 - tokenQty("Super-Fan Swag Token A"));
  if (buyA > 0) bot.buyItem(325, "Super-Fan Swag Token A", buyA);
}

function ensureTokenA() {
  let dry = 0;
  while (!bot.ensureItem("Super-Fan Swag Token A")) {
    farmTokens();
    dry += 1;
    if (dry >= 30) {
      throw new Error("Skyguard stalled with no Swag Token A after 30 rounds (collectorlab r2 filling?)");
    }
  }
}

let fac = bot.rep("Skyguard");
let last;
if (fac.found) {
  last = fac.rank;
} else {
  // Fresh accounts have no Skyguard entry yet: one real 1326 turn-in
  // registers it. Still missing after that means the name is wrong —
  // fail instead of farming blind.
  ensureTokenA();
  bot.quest(1326, {});
  fac = bot.rep("Skyguard");
  if (!fac.found) {
    throw new Error("no Skyguard faction after a 1326 turn-in (check bot.rep spelling)");
  }
  last = fac.rank;
}

while (fac.rank < RANK) {
  ensureTokenA();
  bot.quest(1326, {});
  fac = bot.rep("Skyguard");
  if (fac.rank > last) {
    bot.notify("Skyguard rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
