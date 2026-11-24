/// name: ArchFiend class
/// desc: Gets the ArchFiend class (no rank-up): Evil rep, Nation materials, Abyssal Contract quest, purchase.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Ported from Skua `Nation/Various/Archfiend.cs` (acquisition only —
// rank-up skipped). Every leg checks what is already held first, so
// re-runs resume where they stopped. Quests run one at a time through
// `bot.quest`, which accepts, fills via the handlers, and turns in by
// itself; permanent monster drops are drained with `pickupTokens` right
// after their hunt, before any travel. Handler keys are ItemIDs: old
// definitions can report empty requirement names, and IDs win anyway.
//
// Legs (QuestData-verified requirements; Skua source for the route):
// - Evil rep 10: farmed by bots/reputations/evil.ts, required here for
//   quest 4432 (hard gate — the run stops naming it if short).
// - Gem of Nulgath x200 via 2857 Supplies (Relic of Chaos x1, permanent,
//   off Escherion in escherion/Boss per turn-in; choice 6136). Each
//   turn-in pays ONE reward choice — Gem x1 here — so the 200 gems cost
//   200 turn-ins. No bonuses: Tainted/Dark/Diamond/Uni13/Essence are
//   separate choices on the same quest, farmed on their own legs below.
// - Tainted Gem x300 via 7817 Swindle Bulk (Cubes x500, permanent, in
//   boxes/Fort2; Ice Cubes x6, temp, off Snow Golem in mountfrost/War;
//   choice 4769 = Tainted x25 per turn-in, 12 turn-ins).
// - Dark Crystal Shard x200 via 570 Essence of Defeat (Aracara faerie,
//   Hydra Head hydra, Vath stalagbite/r2, O-dokuro yokaiwar, Tibicenas
//   djinn, Defeated Makai x50 tercessuinotlim/m2, Escherion's Chain
//   escherion/Boss; pays Dark x2 per turn-in, 100 turn-ins).
// - Blood Gem x20 via 7816 Bloody Chaos (Escherion's Helm, Vath's
//   Shattered Sword, Hydra Scale Piece x200 off Hydra Head 85 in
//   hydrachallenge; choice 22332, pays x1 or x2 per turn-in).
// - Totem of Nulgath x8 via 726 (Essence of Nulgath x25 off Dark Makai
//   in tercessuinotlim/m2, Taro's Manslayer off Taro Blademaster per
//   turn-in). PREREQ: Dark Makai access (quest 9541 line in
//   tercessuinotlim) — the hunts fail loudly naming seen cells if locked.
// - Void Aura x2 via 4432 Retrieve Void Auras (10 essences x20 each —
//   Astral Ephemerite/timespace, Void Dragon/dragonchallenge, Belrot the
//   Fiend/citadel, Black Knight/greenguardwest, Tiger Leech/mudluk,
//   Carnax/aqlesson, Chaos Vordred/necrocavern, Unending Avatar/timevoid,
//   Dai Tengu/hachiko, Creature Creation/maul; choice 30613 pays x5+).
//   Monster names are essence-minus-"Essence" per QuestData; maps are best
//   guesses — a miss fails loudly naming the room's cells.
// - Archfiend's Favor x999: raw kills in evilwarnul/r9 (no quest).
// - Immortal Joe's Black Star (Mercutio in mercutio) and Dirtlicker
//   Demoted (Dirtlicker in fiendshard): direct hunt + pickup, no quest.
// - Stars from shops: Pink Star Diamond + Gold Star of Avarice (shop
//   1951 tercessuinotlim), Abyssal Star (shop 456 evilwarnul, costs the
//   farmed Dark Crystal/Tainted/Gem), Blood Star of the Archfiend (shop
//   1206 shadowblast, costs the farmed Blood Gem/Totem/Void Aura/Favor).
//   Each buy is verified; a shortfall throws naming the item.
// - Quest 8476 Void Promotion (level 50+ required) turns in the 7 stars
//   for the Abyssal Contract, then shop 695 tercessuinotlim sells the
//   ArchFiend (item 18894).
//
// PREREQS (checked or loud): level 50, Evil rank 10 via
// bots/reputations/evil.ts (it aligns itself), Dark Makai
// access, a combat class seated (Minerva cannot swap classes), and the
// usual patience — this is Nulgath, it grinds.

function tokenQty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

// Permanent drops land on the floor and nothing claims them by itself.
// Drain each name after its hunt, before any travel. `pickup` claims one
// per call and reads false on a miss, so loop until the floor is clear.
function pickupTokens(names) {
  for (const n of names) {
    let guard = 0;
    while (bot.pickup(n)) {
      guard += 1;
      if (guard >= 500) break;
    }
  }
}

function needHeld(name, qty) {
  return tokenQty(name) >= qty;
}

// Nothing to do when already owned (no rank-up in this bot): every leg
// below skips on held, the final buy skips too, and the run ends done.

const me = bot.me();
if (me.level < 50) {
  throw new Error("needs level 50 for quest 8476 (have " + me.level + ")");
}

// --- Evil rep 10 (4432 gate): farmed by bots/reputations/evil.ts ---
if (bot.rep("Evil").rank < 10) {
  throw new Error("needs Evil rank 10 first (run bots/reputations/evil.ts)");
}

// --- Gem of Nulgath x200 (one choice per turn-in, 200 turn-ins) ---
while (!needHeld("Gem of Nulgath", 200)) {
  bot.quest(2857, {
    "67266": function () { boss.escherion(); }, // Relic of Chaos (staff first)
  }, { choice: 6136 }); // Gem of Nulgath
}

// --- Tainted Gem x300 (x25 per turn-in, 12 turn-ins) ---
while (!needHeld("Tainted Gem", 300)) {
  bot.quest(7817, {
    "4708": function () { bot.hunt("*", "boxes", 1, "Fort2", "Left"); }, // Cubes
    "14403": function () { bot.hunt("Snow Golem", "mountfrost", 1, "War", "Left"); }, // Ice Cubes
  }, { choice: 4769 }); // Tainted Gem
}

// --- Dark Crystal Shard x200 ---
while (!needHeld("Dark Crystal Shard", 200)) {
  bot.quest(570, {
    "4659": function () { bot.hunt("Aracara", "faerie", 1); },
    "4660": function () { bot.hunt("Hydra Head", "hydra", 1); },
    "4658": function () { bot.hunt("Vath", "stalagbite", 1, "r2", "Left"); },
    "4657": function () { bot.hunt("O-dokuro", "yokaiwar", 1); },
    "15398": function () { bot.hunt("Tibicenas", "djinn", 1); },
    "1528": function () { bot.hunt("*", "tercessuinotlim", 1, "m2", "Left"); }, // Defeated Makai
    "2431": function () { boss.escherion(); }, // Escherion's Chain (staff first)
  });
}

// --- Blood Gem of the Archfiend x20 ---
while (!needHeld("Blood Gem of the Archfiend", 20)) {
  bot.quest(7816, {
    "1172": function () { boss.escherion(); }, // Escherion's Helm (staff first)
    "1757": function () { bot.hunt("Vath", "stalagbite", 1, "r2", "Left"); },
    "43797": function () { bot.hunt("Hydra Head 85", "hydrachallenge", 1); }, // Hydra Scale Piece
  }, { choice: 22332 }); // Blood Gem of the Archfiend
}

// --- Totem of Nulgath x8 ---
while (!needHeld("Totem of Nulgath", 8)) {
  bot.quest(726, {
    "5356": function () { bot.hunt("Dark Makai", "tercessuinotlim", 1, "m2", "Left"); }, // Essence of Nulgath
    "538": function () { bot.hunt("Taro Blademaster", "tercessuinotlim", 1); }, // Taro's Manslayer
  });
}

// --- Void Aura x2 (one 4432 turn-in pays x5+) ---
while (!needHeld("Void Aura", 2)) {
  bot.quest(4432, {
    "30602": function () { bot.hunt("Astral Ephemerite", "timespace", 1); },
    "30610": function () { bot.hunt("Void Dragon", "dragonchallenge", 1); },
    "30603": function () { bot.hunt("Belrot the Fiend", "citadel", 1); },
    "30604": function () { bot.hunt("Black Knight", "greenguardwest", 1); },
    "30605": function () { bot.hunt("Tiger Leech", "mudluk", 1); },
    "30606": function () { bot.hunt("Carnax", "aqlesson", 1); },
    "30607": function () { bot.hunt("Chaos Vordred", "necrocavern", 1); },
    "30609": function () { bot.hunt("Unending Avatar", "timevoid", 1); },
    "30608": function () { bot.hunt("Dai Tengu", "hachiko", 1); },
    "30611": function () { bot.hunt("Creature Creation", "maul", 1); },
  }, { choice: 30613 }); // Void Aura
}

// --- Archfiend's Favor x999 (no quest, raw drops) ---
while (!needHeld("Archfiend's Favor", 999)) {
  bot.hunt("*", "evilwarnul", 1, "r9", "Left");
  pickupTokens(["Archfiend's Favor"]);
}

// --- Direct boss drops (no quest) ---
while (!needHeld("Immortal Joe's Black Star", 1)) {
  bot.hunt("Mercutio", "mercutio", 1);
  pickupTokens(["Immortal Joe's Black Star"]);
}
while (!needHeld("Dirtlicker Demoted", 1)) {
  bot.hunt("Dirtlicker", "fiendshard", 1);
  pickupTokens(["Dirtlicker Demoted"]);
}

// --- Shop stars (verified, loud on shortfall) ---
function buyOrThrow(shop, map, name, qty) {
  if (needHeld(name, qty)) return;
  bot.travel(map);
  if (!bot.buyItem(shop, name, qty) && !needHeld(name, qty)) {
    throw new Error("shop " + shop + " short on " + name + " (have " + tokenQty(name) + "/" + qty + ")");
  }
}
buyOrThrow(1951, "tercessuinotlim", "Pink Star Diamond of Nulgath", 1);
buyOrThrow(1951, "tercessuinotlim", "Gold Star of Avarice", 1);
buyOrThrow(456, "evilwarnul", "Abyssal Star", 1);
buyOrThrow(1206, "shadowblast", "Blood Star of the Archfiend", 1);

// --- Abyssal Contract (all 7 stars held by now) ---
bot.quest(8476, {});
pickupTokens(["Abyssal Contract"]);

// --- The class itself ---
if (!bot.ensureItem("ArchFiend")) {
  bot.travel("tercessuinotlim");
  if (!bot.buyItem(695, 18894, 1) && !bot.ensureItem("ArchFiend")) {
    throw new Error("shop 695 would not sell the ArchFiend (Abyssal Contract missing?)");
  }
}
