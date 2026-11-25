/// name: Blinding Light of Destiny
/// desc: Farms BLoD via necropolis merge 422 + battleunder quests. Non-member, daily-gated (mine metals). Blade path.

// Ported from Skua Good/BLoD (CoreBLOD, Fewest-Dailies: Blinding Blade of
// Destiny). Handler keys are requirement ItemIDs from quest-data; maps and
// monster names from the same source. Flat sequencing, re-runs resume.

function qty(name) {
  const inv = bot.inventory(name);
  return inv.found ? inv.qty : 0;
}

function ensureQty(name, want, what) {
  if (qty(name) < want) {
    throw new Error("BLoD short: " + name + " " + qty(name) + "/" + want + " (" + what + ")");
  }
}

if (bot.ensureItem("Blinding Light of Destiny")) {
  // Done: re-run resumes here with no travel.
} else {
  // Unlock: handle + medal are shop stock (doomwood 276), essences are
  // hunts. The buys MUST happen from doomwood: a cross-map shop load gets
  // the session kicked, so the handlers travel first (no-op when already
  // there).
  bot.quest(2066, {
    "8687": function () { bot.travel("doomwood"); bot.buyItem(276, 8687); }, // Handle
  });
  bot.quest(2067, {
    "7691": function () { bot.travel("doomwood"); bot.buyItem(276, 7691); }, // Bonegrinder Medal
  });
  bot.quest(2082, {
    "6697": function () { bot.hunt("Skeleton Warrior", "battleunderb"); }, // Undead Essence x25
  });
  bot.quest(2083, {
    "598": function () { bot.hunt("Skeleton Warrior", "battleunderb"); }, // Bone Dust x40
  });

  // Soul Searching feeds essences; register all three so hand-ins land as bags fill.
  let spiritRounds = 0;
  while (qty("Spirit Orb") < 100 && spiritRounds < 40) {
    bot.quest(939, {
      "6704": function () { bot.hunt("Bone Terror", "battleundera"); },
      "6705": function () { bot.hunt("Undead Champion", "battleunderb"); },
      "6706": function () { bot.hunt("Crystalized Jellyfish", "battleunderc"); },
    });
    bot.quest(2082, {
      "6697": function () { bot.hunt("Skeleton Warrior", "battleunderb"); },
    });
    bot.quest(2083, {
      "598": function () { bot.hunt("Skeleton Warrior", "battleunderb"); },
    });
    spiritRounds += 1;
  }
  ensureQty("Spirit Orb", 100, "2082/2083 turn-ins");

  bot.quest(2084, {
    "18350": function () { bot.hunt("Ephemerite", "timevoid"); }, // Celestial Compass
  });

  // Copper daily + enchant: axe + ore from Balboa, then paladaffodils + energy.
  let metalRounds = 0;
  while (qty("Copper") < 1 && metalRounds < 5) {
    bot.quest(2091, {
      "1708": function () { bot.hunt("Balboa", "stalagbite"); }, // Axe of the Prospector
      "11483": function () { bot.hunt("Balboa", "stalagbite", 30); }, // Raw Ore x30
    });
    metalRounds += 1;
  }
  ensureQty("Copper", 1, "mine daily 2091 (resumes tomorrow)");
  bot.quest(2107, {
    "12417": function () { bot.hunt("Seed Spitter", "arcangrove", 25); }, // Paladaffodil x25
    "11285": function () { bot.hunt("Skeleton Warrior", "battleunderb", 25); }, // Undead Energy x25
  });
  if (!bot.ensureItem("Celestial Copper of Destiny")) {
    // Dwarfhold 434 merge, same map rule as above.
    bot.travel("dwarfhold");
    if (!bot.buyItem(434, "Celestial Copper of Destiny")) {
      throw new Error("BLoD short: Celestial Copper of Destiny not in dwarfhold 434 (2107 done?)");
    }
  }
  bot.quest(2133, {
    "18351": function () { bot.hunt("Albino Bat", "dwarfhold"); }, // Forge Key
  });

  // Weapon kits, each declarative with Skua's hunts.
  bot.quest(2136, {
    "12498": function () { bot.hunt("Horc Noob", "noobshire", 1, "North", "Left"); },
    "12499": function () { bot.hunt("Bronze Draconian", "lair"); },
    "12500": function () { bot.hunt("Rock", "bloodtusk"); },
    "12501": function () { bot.hunt("Golden Scarab", "pyramid"); },
    "12502": function () { bot.hunt("Scarecrow", "farm", 4, "Crop1", "Right"); },
    "6925": function () { bot.hunt("Mummy", "pyramid", 7); },
    "54": function () { bot.hunt("*", "forest", 1, "Forest3", "Left"); },
  });
  bot.quest(2162, {
    "12541": function () { bot.hunt("Lich of the Stone", "darkoviaforest"); },
    "12537": function () { bot.hunt("Dai Tengu", "hachiko"); },
    "12538": function () { bot.hunt("LeatherWing", "pines", 10, "Path1", "Left"); },
    "12539": function () { bot.hunt("Chaos Vampire Knight", "lycan", 1, "r4", "Left"); },
    "12540": function () { bot.hunt("Cyclops Warlord", "faerie"); },
    "2941": function () { bot.hunt("Chaos Lycan", "safiria", 1, "c3", "Left"); },
    "12542": function () { bot.hunt("Lightning Ball", "airstorm"); },
    "12543": function () { bot.hunt("Tomb Robber", "sandport", 1, "r3", "Right"); },
  });

  // Ultimate kit doubles as the Bright Aura source (3 per turn-in).
  let uwkRounds = 0;
  while (qty("Ultimate Weapon Kit") < 1 && uwkRounds < 10) {
    bot.quest(2163, {
      "12641": function () { bot.hunt("Kitsune", "kitsune", 1, "Boss", "Left"); },
      "12642": function () { bot.hunt("Greenguard Dragon", "greendragon", 3, "Boss", "Left"); },
      "12643": function () { bot.hunt("Chaos Sphinx", "sandcastle", 1, "r7", "Left"); },
      "12644": function () { bot.hunt("Rock Roc", "roc"); },
      "12645": function () { bot.hunt("Grand Inquisitor", "citadel", 1, "m14", "Left"); },
      "12646": function () { bot.hunt("ProtoSartorium", "crashsite", 1, "Boss", "Left"); },
      "12647": function () { bot.hunt("Harpy", "djinn"); },
      "5752": function () { bot.hunt("Earth Elemental", "dragonplane", 1, "r2", "Right"); },
    });
    uwkRounds += 1;
  }
  ensureQty("Ultimate Weapon Kit", 1, "2163 materials");

  // Blade tiers through necropolis 422; each buy gates on kits + orbs + metal.
  const tiers = ["Blade of Destiny", "Bright Blade of Destiny", "Blinding Blade of Destiny"];
  for (let i = 0; i < tiers.length; i++) {
    if (!bot.ensureItem(tiers[i])) {
      bot.travel("necropolis");
      if (!bot.buyItem(422, tiers[i])) {
        throw new Error("BLoD short: " + tiers[i] + " not buyable at 422 (kits/orbs/metal?)");
      }
    }
  }

  // Fragments (2179, Blade-owned): 10 fragments per turn-in, choice picks the
  // reward. Spirit 50 / Loyal 25 / Blinding 1. Manual loop: the choice varies
  // per stage, so the declarative form (one choice per quest) does not fit.
  function fragTurns(want, choiceId, what) {
    let rounds = 0;
    while (qty(what) < want && rounds < 200) {
      if (!bot.quest(2179).active()) {
        bot.quest(2179).accept();
      }
      let frags = 0;
      let guard = 0;
      while (frags < 10 && guard < 30) {
        bot.hunt("*", "battleunderb");
        const inv = bot.inventory(12704);
        frags = inv.found ? inv.qty : 0;
        guard += 1;
      }
      if (frags < 10) {
        throw new Error("BLoD stalled: Blinding Light Fragments " + frags + "/10 in battleunderb");
      }
      bot.quest(2179).turnIn(choiceId);
      rounds += 1;
    }
    ensureQty(what, want, "2179 fragment turn-ins");
  }

  fragTurns(500, 12184, "Spirit Orb");
  fragTurns(250, 12311, "Loyal Spirit Orb");
  fragTurns(1, 6552, "Blinding Aura");

  // Bright 125 via UWK loops (3 per 2163) — the Blade path has no Bow, so no
  // fragment shortcut; re-runs keep banked kits and resume.
  let brightRounds = 0;
  while (qty("Bright Aura") < 125 && brightRounds < 60) {
    bot.quest(2163, {
      "12641": function () { bot.hunt("Kitsune", "kitsune", 1, "Boss", "Left"); },
      "12642": function () { bot.hunt("Greenguard Dragon", "greendragon", 3, "Boss", "Left"); },
      "12643": function () { bot.hunt("Chaos Sphinx", "sandcastle", 1, "r7", "Left"); },
      "12644": function () { bot.hunt("Rock Roc", "roc"); },
      "12645": function () { bot.hunt("Grand Inquisitor", "citadel", 1, "m14", "Left"); },
      "12646": function () { bot.hunt("ProtoSartorium", "crashsite", 1, "Boss", "Left"); },
      "12647": function () { bot.hunt("Harpy", "djinn"); },
      "5752": function () { bot.hunt("Earth Elemental", "dragonplane", 1, "r2", "Right"); },
    });
    brightRounds += 1;
  }
  ensureQty("Bright Aura", 125, "2163 loops");

  // Brilliant 75 + final UWK through the same merge; buy gates loudly.
  bot.travel("necropolis");
  if (qty("Brilliant Aura") < 75) {
    if (!bot.buyItem(422, "Brilliant Aura", 75)) {
      throw new Error("BLoD short: Brilliant Aura " + qty("Brilliant Aura") + "/75 at 422 (Bright stock?)");
    }
  }
  ensureQty("Ultimate Weapon Kit", 1, "2163 loops");
  ensureQty("Loyal Spirit Orb", 250, "2179 + 2163");
  ensureQty("Spirit Orb", 500, "2179 + 2163");

  bot.quest(2180, {});
  bot.travel("necropolis");
  if (!bot.buyItem(1415, "Blinding Light of Destiny")) {
    bot.quest(7673, {});
    if (!bot.buyItem(1415, "Blinding Light of Destiny")) {
      throw new Error("BLoD short: 2180 turned in but 1415 buy refused (bags/gold?)");
    }
  }
  if (!bot.ensureItem("Blinding Light of Destiny")) {
    throw new Error("BLoD not held after 1415 buy (check bags)");
  }
}
