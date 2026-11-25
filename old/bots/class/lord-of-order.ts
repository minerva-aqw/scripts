/// name: Lord of Order class
/// desc: Gets the Lord of Order class: daily chain 7156-7165, one quest per run, choice 0 on the final turn-in.

// Ported from Skua `Dailies/LordOfOrder.cs`. Ten daily quests, one per
// run: the entry does the first incomplete quest then ends, so run it
// again after reset. Every requirement is permanent (temp=0, floor
// drops), drained after each hunt. Handler keys are ItemIDs.
//
// Known engine constraints (fail loudly if hit):
// - Gaiazor, Desolich, Ultra Chaos Warlord, Champion of Chaos: Skua uses
//   public rooms; this hunts normal rooms, which is much harder.
// - Kitsune tail mechanic: Skua drives it via packet listener; a plain
//   hunt may stall on the Hanzamune blade.
// - 7160 assumes the DragonFable Origins line is done; 7156 assumes the
//   CitadelRuins Murry/Polish lines are done for Enn'troepy access.
// - 7164: Skua also farms Fishing rep 7 (packet minigame, no bot
//   equivalent). Nothing in 7164's requirements names it, so the chain
//   tries regardless; a refused turn-in fails naming the quest.

function drain(item) {
  let guard = 0;
  while (bot.pickup(item)) {
    guard += 1;
    if (guard >= 500) break;
  }
}

function take(mob, map, item, qty, cell, pad) {
  bot.hunt(mob, map, qty || 1, cell, pad);
  drain(item);
}

function buy(shop, map, item, qty) {
  bot.travel(map);
  if (!bot.buyItem(shop, item, qty || 1) && !bot.ensureItem(item, qty || 1)) {
    throw new Error("shop " + shop + " would not sell " + item);
  }
}

if (!bot.ensureItem("Lord of Order")) {
  if (!bot.quest(7156).completed()) {
    bot.quest(7156, {
      "50696": function () { // Mage's Gratitude (via 6182)
        bot.quest(6182, {
          "42568": function () { take("Enn'tröpy", "citadelruins", "Enn'tröpy Defeated"); },
        });
        drain("Mage's Gratitude");
      },
      "50697": function () { buy(614, "ravenscar", "Ravenscar's Truth"); }, // Ravenscar's Truth
      "50695": function () { take("Banshee Mallora", "deadmoor", "Deadmoor Spirits Helped"); },
      "15637": function () { take("Chaorrupted Knight", "watchtower", "Pristine Blades of Order"); },
      "33879": function () { buy(1221, "dreadrock", "Dreadrock Donation Receipt"); },
    });
  } else if (!bot.quest(7157).completed()) {
    bot.quest(7157, {
      "50698": function () { take("Warden Elfis", "dwarfprison", "Warden Elfis Detained"); },
      "50699": function () { take("Piggy Drake", "prison", "Piggy Drake Punished"); },
      "50700": function () { take("Mysterious Stranger", "mysteriousdungeon", "Mysterious Stranger Foiled"); },
      "50701": function () { take("Calico Cobby", "dreammaster", "Calico Cobby Crushed"); },
    });
  } else if (!bot.quest(7158).completed()) {
    bot.quest(7158, {
      "50704": function () { take("Chaos Lord Lionfang", "stormtemple", "Purified Raindrop", 15); },
      "11481": function () { buy(1951, "tercessuinotlim", "Chaoroot", 15); },
      "50702": function () { take("Ultra Chaos Warlord", "chaosboss", "Chaotic War Essence", 15); },
      "50703": function () { take("Chaorruption", "shadowgates", "Chaorrupting Particles", 15); },
    });
  } else if (!bot.quest(7159).completed()) {
    bot.quest(7159, {
      "50705": function () { take("Gaiazor", "gaiazor", "Gaiazor's Cornerstone"); },
      "50706": function () { take("Dakka the Dire Dragon", "treetitanbattle", "Dakka's Crystal"); },
      "50707": function () { take("Giant Necklace", "andre", "Andre's Necklace Fragment"); },
      "50708": function () { take("Desolich", "desolich", "Desolich's Skull"); },
    });
  } else if (!bot.quest(7160).completed()) {
    bot.quest(7160, {
      "2238": function () { take("Kitsune", "kitsune", "Hanzamune Dragon Koi Blade", 1, "Boss", "Left"); },
      "6232": function () { take("Ledgermayne", "ledgermayne", "The Supreme Arcane Staff"); },
      "15004": function () { take("Dragonoid", "mqlesson", "Dragonoid of Hours"); },
      "41694": function () { bot.gather(5470, "maxius", 1); drain("Safiria's Spirit Orb"); },
      "43684": function () { // Ice Katana (via 6319)
        bot.quest(6319, {
          "43739": function () { take("Living Fire", "drakonnan", "Inferno Heart"); },
        });
        drain("Ice Katana");
      },
    });
  } else if (!bot.quest(7161).completed()) {
    bot.quest(7161, {
      "50709": function () { take("Tree of Destiny", "elemental", "Unity of Life"); },
      "50710": function () { take("Faust", "orchestra", "Harmony of Solace"); },
      "50711": function () { take("Pactagonal Knight", "cathedral", "Teamwork Observed", 20); },
      "50729": function () { take("Queen's ArchSage", "goose", "Scroll of Enchantment"); },
    });
  } else if (!bot.quest(7162).completed()) {
    bot.quest(7162, {
      "37056": function () { take("Alliance Healer", "newfinale", "Acolyte's Braille"); },
      "50712": function () { take("Drow Assassin", "wardwarf", "Suppressed Drows", 10); },
      "50713": function () { take("Skeletal Fire Mage", "warundead", "Suppressed Undead", 10); },
      "50714": function () { take("Horc Warrior", "warhorc", "Suppressed Horcs", 10); },
      "50715": function () { take("Weaver Queen's Hound", "weaverwar", "Suppressed Weavers", 10); },
      "50716": function () { take("Extriki", "extriki", "Strength of Resilience"); },
    });
  } else if (!bot.quest(7163).completed()) {
    bot.quest(7163, {
      "50717": function () { take("Guardian Spirit", "elfhame", "Law of Nature"); },
      "50718": function () { take("Kathool", "deepchaos", "Law of Time"); },
      "50719": function () { take("ShadowStone Support", "necrocavern", "Law of Gravity"); },
      "50720": function () { take("Reflecteract", "blackholesun", "Law of Relativity"); },
      "50721": function () { take("Tonitru", "thunderfang", "Law of Conservation of Energy"); },
      "50722": function () { take("Red Dragon", "lair", "Law of Low Drop Rates", 20); },
    });
  } else if (!bot.quest(7164).completed()) {
    bot.quest(7164, {
      "50723": function () { take("Undead Raxgore", "doomvaultb", "Weapon Imprint", 5, "r26", "Left"); },
      "50724": function () { buy(363, "greenguardwest", "Lure of Order"); },
      "50725": function () { take("Chaos Lord Xiang", "mirrorportal", "Quixotic Mana Essence", 5, "r4", "Right"); },
      "50728": function () { take("Serepthys", "yasaris", "Inversion Infusion", 5); },
    });
  } else if (!bot.quest(7165).completed()) {
    bot.quest(7165, {
      "50726": function () { take("Champion of Chaos", "ultradrakath", "Champion of Chaos Confronted"); },
    }, { choice: 0 }); // Lord of Order class (first reward)
    drain("Lord of Order");
  }

  if (!bot.ensureItem("Lord of Order")) {
    throw new Error("Lord of Order not held (daily chain incomplete — run again after reset)");
  }
}
