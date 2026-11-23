/// name: Chaos Lords 12 - Xiang
/// desc: Xiang chapter, quests 2909-3189. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Xiang.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 3187 farms its three products under the helper quests Skua registers,
// then turns in from mirrorportal, like Skua's join there.
// 3188 skips the equip/unequip packet dance (no bot equip verb) and the
// leftover-potion sale. 3189 skips the gear-store swaps (no bot bank verb).

bot.quest(2909, {
  "17375": function () { bot.gather(1779, "battleoff"); }, // Warlic's List
});

bot.quest(2910, {
  "17376": function () { bot.gather(1780, "battleoff", 8); }, // Spare Part
});

bot.quest(2911, {
  "17377": function () { bot.hunt("Evil Moglin", "battleoff", 4); }, // Battery
});

bot.quest(2912, {
  "17378": function () { bot.hunt("Evil Moglin", "battleoff"); }, // Magna-Gem
});

bot.quest(2913, {
  "17379": function () { bot.hunt("Undead Minion", "brightfall", 8); }, // Minions Defeated
});

bot.quest(2914, {
  "17380": function () { bot.hunt("Undead Mage", "brightfall", 8); }, // Mages Defeated
});

bot.quest(2915, {
  "17381": function () { bot.gather(1781, "brightfall", 6); }, // Doomlight Healed
});

bot.quest(2916, {
  "17382": function () { bot.gather(1782, "brightfall", 8); }, // Ward Placed
});

bot.quest(2917, {
  "17383": function () { bot.hunt("Painadin Overlord", "brightfall"); }, // Painadin Defeated
});

bot.travel("overworld");
bot.quest(2918, {});

bot.quest(2919, {
  "17459": function () { bot.hunt("Undead Minion", "overworld", 5); }, // Quality Weapon
});

bot.quest(2920, {
  "17460": function () { bot.hunt("Undead Minion", "overworld", 3); }, // Souls Freed
});

bot.quest(2921, {
  "17461": function () { bot.hunt("Undead Minion", "overworld"); }, // Signet Ring
});

bot.quest(2922, {
  "17462": function () { bot.hunt("Undead Mage", "overworld", 3); }, // Souls Freed
});

bot.quest(2923, {
  "17463": function () { bot.gather(1800, "overworld", 6); }, // Supplies Delivered
});

bot.quest(2924, {
  "17464": function () { bot.hunt("Undead Bruiser", "overworld", 3); }, // Souls Freed
});

bot.quest(2925, {
  "17465": function () { bot.hunt("Undead Bruiser", "overworld"); }, // Battle Plans
});

bot.quest(2926, {
  "17466": function () { bot.hunt("Undead Minion", "overworld", 3); }, // Souls Freed
});

bot.quest(2927, {
  "17467": function () { bot.gather(1801, "overworld", 8); }, // Banner Placed
});

bot.quest(2928, {
  "17468": function () { bot.hunt("Undead Minion", "overworld", 3); }, // Souls Freed
});

bot.quest(2929, {
  "17469": function () { bot.hunt("Undead Minion", "overworld", 10); }, // Doomfire
});

bot.quest(2930, {
  "17470": function () { bot.hunt("Undead Minion", "overworld", 3); }, // Souls Freed
});

bot.quest(2931, {
  "17471": function () { bot.gather(1802, "overworld", 10); }, // Purified Bone Dust
});

bot.quest(2932, {
  "17472": function () { bot.hunt("Undead Artix", "overworld"); }, // Artix Defeated
});

bot.quest(3166, {
  "20800": function () { bot.hunt("Fire Leech", "reddeath", 6); }, // Monstrous Life Force
});

bot.quest(3167, {
  "20801": function () { bot.hunt("RedDeath Moglin", "reddeath", 5); }, // Boneweed
  "20802": function () { bot.gather(2178, "reddeath"); }, // Powdered Boneweed Incense
  "20803": function () { bot.gather(2179, "reddeath"); }, // Incense Burnt
});

bot.quest(3168, {
  "20804": function () { bot.gather(2180, "reddeath"); }, // Reasonably Clean Swamp Water
});

bot.quest(3169, {
  "20805": function () { bot.hunt("Fire Leech", "reddeath", 8); }, // Flame Gland
});

bot.quest(3170, {
  "20806": function () { bot.hunt("Grim Widow", "reddeath", 10); }, // Sticky Webbing
});

bot.quest(3171, {
  "20807": function () { bot.hunt("Swamp Wraith", "reddeath", 10); }, // Viscous Ectoplasm
});

bot.quest(3172, {
  "20808": function () { bot.hunt("Swamp Wraith", "reddeath", 12); }, // Spectral Energy
});

bot.quest(3183, {
  "20886": function () { bot.gather(2203, "battleontown"); }, // Alina's Recipe
});

if (!bot.quest(3187).completed()) {
  bot.quest(3187).accept();
  let rounds = 0;
  while (!bot.ensureItem("Perfect Prism")) {
    if (rounds >= 25) {
      throw new Error("no Perfect Prism after 25 earthstorm fills");
    }
    bot.quest(3184, {
      "20887": function () { bot.hunt("Shard Spinner", "earthstorm", 5); }, // Reflective Fragment
    }, { turnIn: false });
    bot.pickup("Perfect Prism");
    rounds += 1;
  }
  rounds = 0;
  while (!bot.ensureItem("Unchaorrupted Sample")) {
    if (rounds >= 25) {
      throw new Error("no Unchaorrupted Sample after 25 bloodtuskwar fills");
    }
    bot.quest(3185, {
      "20888": function () { bot.hunt("Chaotic Horcboar", "bloodtuskwar", 5); }, // Vials of Blood
    }, { turnIn: false });
    bot.pickup("Unchaorrupted Sample");
    rounds += 1;
  }
  rounds = 0;
  while (!bot.ensureItem("Harpy Feather")) {
    if (rounds >= 25) {
      throw new Error("no Harpy Feather after 25 bloodtuskwar fills");
    }
    bot.quest(3186, {
      "20889": function () { bot.hunt("Chaos Tigriff", "bloodtuskwar", 5); }, // Feathers
    }, { turnIn: false });
    bot.pickup("Harpy Feather");
    rounds += 1;
  }
  bot.travel("mirrorportal");
  bot.quest(3187).turnIn();
  bot.pickup("Shriekward Potion");
}

if (!bot.quest(3188).completed()) {
  bot.quest(3188).accept();
  bot.travel("mirrorportal");
  bot.buyItem(774, "Shriekward Potion", 99);
  bot.hunt("Chaos Harpy", "mirrorportal", 1, "r3", "Left");
  bot.quest(3188).turnIn();
}

bot.quest(3189, {
  "20894": function () { bot.hunt("Chaos Lord Xiang", "mirrorportal", 1, "r4", "Right"); }, // Chaos Lord Xiang Defeated
});
