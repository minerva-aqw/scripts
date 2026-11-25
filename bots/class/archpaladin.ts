/// name: ArchPaladin class
/// desc: Gets the ArchPaladin class (item 36920): Good rep gate, 5463-5470 chain (free 5463-5466 or member aptitude), BLoD mine unlock inline, shop buy in darkthronehub.

// Ported from Skua `Good/ArchPaladin.cs` (acquisition only). Story quests
// run in order through `bot.quest`, which accepts, fills via the handlers,
// and turns in by itself; one-time quests no-op when done, so re-runs
// resume. Handler keys are ItemIDs; permanent drops drain after each hunt.
//
// Gates and limits (fail loudly, like archfiend.ts):
// - Good rank 10 first (run bots/reputations/good.ts).
// - Gold is not farmable here: 5463/5474 buys need ~500k each; a refused
//   buy throws naming the shop.
// - Binky, Desterrat, Karok, Painadin, Ultra Alteon, Primarch, Unending
//   Avatar, Vordred: Skua uses public rooms; this hunts normal rooms.
// - 5469 needs Xan's Lair done (Shurpu access); members need Paladin or
//   Silver Paladin held for the aptitude path.

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
    throw new Error("shop " + shop + " would not sell " + item + " (gold or unlock short?)");
  }
}

if (!bot.ensureItem(36920)) {
  if (bot.rep("Good").rank < 10) {
    throw new Error("needs Good rank 10 first (run bots/reputations/good.ts)");
  }
  const member = bot.me().upgraded === true;

  // BLoD mine unlock (5464's Undead Energy gate): buys plus 2082-2084.
  // 2082-2084 are repeatable (Once=False), so completed() never sticks —
  // gate each on its quest-value slot 78 (Skua's isCompletedBefore).
  // Spirit Orbs farm like Skua's BoneSomeDust — shared kills over the
  // registered pair until 100 held.
  if (bot.questValue(78) < 1) {
    bot.quest(2066, { "8687": function () { buy(276, "doomwood", "Blinding Light of Destiny Handle"); } });
  }
  if (bot.questValue(78) < 2) {
    bot.quest(2067, { "7691": function () { buy(276, "doomwood", "Bonegrinder Medal"); } });
  }
  if (bot.questValue(78) < 3) {
    bot.quest(2082, { "6697": function () { take("Skeleton Warrior", "battleunderb", "Undead Essence", 25); } });
  }
  if (bot.questValue(78) < 4) {
    bot.quest(2083, { "598": function () { take("Skeleton Warrior", "battleunderb", "Bone Dust", 40); } });
  }
  if (bot.questValue(78) < 5) {
    bot.quest(2084, {
      "12184": function () {
        bot.quest.register([2082, 2083], { choice: 0 });
        let guard = 0;
        while (!bot.ensureItem("Spirit Orb", 100)) {
          bot.hunt("*", "battleunderb", 25, "Enter", "Spawn");
          guard += 1;
          if (guard >= 40) {
            throw new Error("Spirit Orbs stalled (battleunderb Enter/Spawn filling?)");
          }
        }
        bot.quest.unregister();
      },
      "18350": function () { bot.hunt("Ephemerite", "timevoid", 1); }, // Celestial Compass (temp)
    });
  }

  if (!member) {
    // A Strong Base (Stone Paladin Armor costs ~500k gold).
    bot.quest(5463, {
      "37037": function () { buy(1308, "darkthronehub", "Exalted Paladin Seal"); },
      "8491": function () { buy(288, "temple", "Stone Paladin Armor"); },
    });
    // Proof of Valor.
    bot.quest(5464, {
      "37121": function () { take("Vordred", "vordredboss", "Vordred's Skull"); },
      "37124": function () { take("*", "dreadfight", "Dreadhaven Helm", 1, "Enter", "Spawn"); },
      "22341": function () { take("Desterrat Moya", "banished", "Desterrat Moya Tentacle"); },
      "11285": function () { take("*", "battleunderb", "Undead Energy", 100, "Enter", "Spawn"); },
      "25144": function () { take("DoomKitten", "doomkitten", "DoomKitten Claw"); },
      "18093": function () { take("Binky", "doomvault", "Binky's Uni-horn", 1, "r5", "Left"); },
    });
    // Mastering the Arcane.
    bot.quest(5465, {
      "11343": function () { take("Xan", "xantown", "Pyromancer Artifact", 1, "r8", "Left"); },
      "23823": function () { take("Proto-Air Dracolich", "dragonheart", "Zephyrus Manifesto"); },
      "27719": function () { take("Karok The Fallen", "northstar", "Karok's Glaceran Gem"); },
      "32286": function () { take("Mana Phoenix", "thirdspell", "Nightmare Kibble", 20); },
      "37045": function () { take("Lightning Ball", "thunderfang", "Condensed Energy"); },
      "37046": function () { take("Crystal Mana Construct", "downward", "Crystallized Mana Catalyst", 1, "r11", "Right"); },
      "37047": function () { take("Treeant", "farm", "Just the Perfect Stick"); },
    });
    // For Those Who Have Fallen.
    bot.quest(5466, {
      "1843": function () { buy(88, "castle", "Holy Hand Grenade"); },
      "37048": function () { take("Bird of Paradise", "manor", "Feather of Paradise", 20); },
      "37049": function () { take("*", "doomwood", "Shoelace of a Fallen Paladin", 10, "r6", "Right"); },
      "37050": function () { take("Amia the Cult Leader", "fotia", "Eternity Flame"); },
    });
  } else {
    // Aptitude path: needs a Paladin-class held (separate farm).
    if (!bot.ensureItem("Silver Paladin") && !bot.ensureItem("Paladin")) {
      throw new Error("member path needs Paladin or Silver Paladin held first");
    }
    const silver = bot.ensureItem("Silver Paladin");
    bot.quest(silver ? 5475 : 5471, {});
    bot.quest(silver ? 5476 : 5472, {});
    bot.quest(silver ? 5477 : 5473, {});
    bot.quest(silver ? 5478 : 5474, {
      "30616": function () { take("Colossal Primarch", "bosschallenge", "Primarch's Hilt"); },
      "37068": function () { take("Unending Avatar", "timevoid", "Condensed Mana"); },
      "37037": function () { buy(1308, "darkthronehub", "Exalted Paladin Seal"); }, // ~500k gold
    });
  }

  // Commandment.
  bot.quest(5467, {
    "37051": function () { take("Painadin Overlord", "brightfall", "Skill Observed"); },
    "37052": function () { take("Grand Inquisitor", "citadel", "Spirit of Vindication"); },
    "37053": function () { take("Good Lieutenant", "alliance", "Radiant Blade Enhancement"); },
  });
  // Hymn of Light.
  bot.quest(5468, {
    "11770": function () { take("Xavier Lionfang", "poisonforest", "Divine Elixir"); },
    "37055": function () { take("Ultra Chaos Alteon", "ultraalteon", "Prayer of Salvation"); },
    "37056": function () { take("Alliance Healer", "newfinale", "Acolyte's Braille"); },
    "37057": function () { take("Dove", "skytower", "Innocence", 10); },
  });
  // Righteous Seal (needs Xan's Lair done for Shurpu access).
  // Scroll of Ethereal Slumber comes from the 2347 chain, which consumes
  // ArchMage Ink (Skua Good/ArchPaladin.cs): SpellCrafting rank 8 unlocks
  // the shops, Mystic Shards x2 pays at shop 549, otherwise the voucher
  // path (100k gold -> Gold Voucher 100k -> Arcane Quill 17391 at shop 693
  // -> shop 622), with an underworld shard farm -> dragonrune shop 549 as
  // the last resort. Quest data: 2347 is repeatable, 1x 13289 in, 5x
  // scroll out; the true name is "ArchMage Ink" (capital M), so buys go by
  // ID — the shop match is case-exact.
  // ArchMage Ink = 13289, Arcane Quill = 17391.
  function qtyOf(item) {
    const inv = bot.inventory(item);
    return inv.found ? inv.qty : 0;
  }
  if (!bot.ensureItem("Scroll of Ethereal Slumber")) {
    if (bot.rep("SpellCrafting").rank < 8) {
      throw new Error("needs SpellCrafting rank 8 first (run bots/reputations/spellcrafting.ts)");
    }
    if (!bot.ensureItem(13289)) {
      // Every path below reports instead of throwing: the run ends naming
      // each refusal with what was held, so one run diagnoses all shops.
      let notes = [];
      // Path 1: shards on hand pay at spellcraft 549.
      if (bot.ensureItem("Mystic Shards", 2)) {
        bot.travel("spellcraft");
        if (!bot.buyItem(549, 13289) && !bot.ensureItem(13289)) {
          notes.push("549 spellcraft refused (Mystic Shards held " + qtyOf("Mystic Shards") + "/2)");
        }
      }
      // Path 2: voucher -> quill -> shop 622. Gold is not farmable here,
      // so a short wallet skips quietly to the shard farm below.
      if (!bot.ensureItem(13289) && !bot.ensureItem(17391) && bot.me().gold >= 100000) {
        bot.travel("spellcraft");
        bot.buyItem(693, "Gold Voucher 100k");
        bot.buyItem(693, 17391);
        if (!bot.ensureItem(17391)) {
          notes.push("693 spellcraft refused the voucher path (gold " + bot.me().gold + ", voucher held " + qtyOf("Gold Voucher 100k") + "/1)");
        }
      }
      if (!bot.ensureItem(13289) && bot.ensureItem(17391)) {
        bot.travel("spellcraft");
        if (!bot.buyItem(622, 13289) && !bot.ensureItem(13289)) {
          notes.push("622 spellcraft refused (Arcane Quill held " + qtyOf(17391) + "/1)");
        }
      }
      // Path 3: farm shards until HELD (not a fixed kill count — the drop
      // is not guaranteed) and pay at dragonrune 549. Runs whenever ink
      // is still missing, even with a quill on hand: a second currency is
      // a second chance, not a conflict.
      if (!bot.ensureItem(13289)) {
        let guard = 0;
        while (!bot.ensureItem("Mystic Shards", 2)) {
          bot.hunt("Skull Warrior", "underworld", 1);
          drain("Mystic Shards");
          guard += 1;
          if (guard >= 60) {
            throw new Error("Mystic Shards stalled (underworld Skull Warrior dropping? held " + qtyOf("Mystic Shards") + "/2)");
          }
        }
        bot.travel("dragonrune");
        if (!bot.buyItem(549, 13289) && !bot.ensureItem(13289)) {
          notes.push("549 dragonrune refused (Mystic Shards held " + qtyOf("Mystic Shards") + "/2)");
        }
      }
      if (!bot.ensureItem(13289)) {
        throw new Error("ArchMage Ink missing: " + notes.join("; "));
      }
    }
    bot.quest(2347, {});
    drain("Scroll of Ethereal Slumber");
  }
  bot.quest(5469, {
    "12583": function () { take("Shurpu Ring Guardian", "xancave", "Fists of Fire"); },
    "12934": function () {
      if (!bot.ensureItem("Scroll of Ethereal Slumber")) {
        throw new Error("Scroll of Ethereal Slumber missing (quest 2347 + ArchMage Ink?)");
      }
    },
    "37058": function () { take("Golden Caster", "onslaughttower", "Holy Magic Attunement"); },
    "37059": function () { take("Pettivox", "palace", "Ring of Mana Transposition"); },
  });
  // Sacred Magic: Eden.
  bot.quest(5470, {
    "37060": function () { take("Adventus", "seraph", "Sacred Tome"); },
    "37061": function () { take("Marsh Tree", "marsh", "Paladaffodil", 10); },
    "37062": function () { take("Lotus Spider", "wanders", "Spirit Lotus", 10, "r5", "Left"); },
    "37063": function () { take("Wisterrora", "gaiazor", "Cyanoblossom", 10); },
    "37064": function () { take("Trollola Plant", "bloodtusk", "Radiant Magnolia", 10); },
    "37065": function () { take("Nevanna", "gaiazor", "BrightOak Forest Sapling"); },
    "37066": function () { take("Malxas", "infernalspire", "Forbidden Demon Seal"); },
  });

  // The class itself.
  bot.travel("darkthronehub");
  if (!bot.buyItem(1303, 36920, 1) && !bot.ensureItem(36920)) {
    throw new Error("shop 1303 would not sell ArchPaladin (5463-5470 chain incomplete?)");
  }
  if (!bot.ensureItem(36920)) {
    throw new Error("ArchPaladin not held after buying from shop 1303");
  }
}
