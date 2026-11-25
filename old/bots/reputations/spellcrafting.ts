/// name: SpellCrafting rep
/// desc: Farms SpellCrafting reputation to rank 10: unlock 2260 once, then 2299 (Ember Ink) to rank 4, then 2322 (Hallow Ink) to 10. Sells leftover ink. Notifies on every rank-up.

// Ported from Skua `CoreFarms.SpellCraftingREP`. Unlock 2260 (map item
// 1920 in dragonrune + Arcane Parchment x13 off Skeletal Warrior, both
// temp) runs once via the completed gate. Then each phase farms shop
// currency (Mystic Quills off Slugfit in mobius Slugfit/Bottom, Mystic
// Parchment off Skull Warrior in underworld — permanent floor drops,
// drained via pickup), buys 50 ink at shop 549 in dragonrune, and chains
// single-ink turn-ins (2299/2322 need one permanent ink each, held, so the
// calls take empty handlers). A dry guard fails loudly if ink ever stops
// coming.

const RANK = 10;

if (!bot.quest(2260).completed()) {
  bot.quest(2260, {
    "18872": function () { bot.gather(1920, "dragonrune", 1); }, // Silver Runethread
    "18871": function () { bot.hunt("Skeletal Warrior", "castleundead", 1); }, // Arcane Parchment
  });
}

function drainFloor(name) {
  let guard = 0;
  while (bot.pickup(name)) {
    guard += 1;
    if (guard >= 100) break;
  }
}

let fac = bot.rep("SpellCrafting");
if (!fac.found) {
  throw new Error("no SpellCrafting faction after unlock 2260 (check bot.rep spelling)");
}
let last = fac.rank;

function farmInk(mob, map, drop, ink, cell, pad) {
  if (cell) {
    bot.hunt(mob, map, 10, cell, pad);
  } else {
    bot.hunt(mob, map, 10);
  }
  drainFloor(drop);
  bot.travel("dragonrune");
  bot.buyItem(549, ink, 50);
}

let dry = 0;
while (fac.rank < 4) {
  if (!bot.ensureItem("Ember Ink")) {
    farmInk("Slugfit", "mobius", "Mystic Quills", "Ember Ink", "Slugfit", "Bottom");
    dry += 1;
    if (dry >= 30) {
      throw new Error("SpellCrafting stalled with no Ember Ink after 30 rounds (Slugfit/shop 549 ok?)");
    }
  } else {
    bot.quest(2299, {});
    fac = bot.rep("SpellCrafting");
    if (fac.rank > last) {
      bot.notify("SpellCrafting rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
    dry = 0;
  }
}

dry = 0;
while (fac.rank < RANK) {
  if (!bot.ensureItem("Hallow Ink")) {
    farmInk("Skull Warrior", "underworld", "Mystic Parchment", "Hallow Ink");
    dry += 1;
    if (dry >= 30) {
      throw new Error("SpellCrafting stalled with no Hallow Ink after 30 rounds (Skull Warrior/shop 549 ok?)");
    }
  } else {
    bot.quest(2322, {});
    fac = bot.rep("SpellCrafting");
    if (fac.rank > last) {
      bot.notify("SpellCrafting rank " + fac.rank + "/" + RANK);
      last = fac.rank;
    }
    dry = 0;
  }
}

bot.sellItem("Ember Ink", 9999);
bot.sellItem("Hallow Ink", 9999);
