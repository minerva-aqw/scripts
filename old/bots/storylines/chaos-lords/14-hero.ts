/// name: Chaos Lords 14 - Hero
/// desc: Chaos finale, quests 3578-3881. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Hero.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// Skua's private-room resets run on public rooms here; the achievement
// packet and equip/unequip dance have no bot equivalent and are skipped.

bot.quest(3578, {});
bot.quest(3579, {});
bot.quest(3580, {});
bot.quest(3581, {});
bot.quest(3582, {});
bot.quest(3583, {});
bot.quest(3584, {});
bot.quest(3585, {});
bot.quest(3586, {});
bot.quest(3587, {});
bot.quest(3588, {});
bot.quest(3589, {});
bot.quest(3590, {});
bot.quest(3591, {});
bot.quest(3764, {});

bot.quest(3765, {
  "24361": function () { bot.gather(2726, "mountdoomskull"); }, // Drakath Confronted
});

bot.quest(3766, {});
bot.quest(3779, {});

bot.quest(3781, {
  "25796": function () { bot.hunt("Alliance Virago", "newfinale", 13); }, // Alliance Defeated in Willowcreek
});

bot.quest(3788, {
  "25782": function () { bot.hunt("Chaos Challenger", "newfinale"); }, // Chaos Challenger Defeated
});

bot.quest(3783, {
  "25798": function () { bot.hunt("Alliance Virago", "newfinale", 13); }, // Alliance Defeated in Doomwood
});

bot.quest(3789, {
  "25803": function () { bot.hunt("Chaorrupted Lycan Hunter", "newfinale"); }, // Chaorrupted Lycan Hunter Defeated
});

bot.quest(3785, {
  "25800": function () { bot.hunt("Alliance Virago", "newfinale", 13); }, // Alliance Defeated in Darkovia
});

bot.quest(3790, {
  "25804": function () { bot.hunt("Memory of Vampires", "newfinale"); }, // Memory of Vampires Defeated
});

bot.quest(3787, {
  "25802": function () { bot.hunt("Alliance Virago", "newfinale", 17); }, // Alliance Defeated in the Lair
});

bot.quest(3608, {});
bot.quest(3618, {});
bot.quest(3609, {});
bot.quest(3610, {});
bot.quest(3611, {});
bot.quest(3612, {});
bot.quest(3613, {});
bot.quest(3614, {});
bot.quest(3615, {});
bot.quest(3616, {});
bot.quest(3617, {});
bot.quest(3619, {});
bot.quest(3791, {});
bot.quest(3792, {});

bot.quest(3794, {
  "25813": function () { bot.hunt("Alliance Soldier", "newfinale", 20); }, // Alliance Defeated in Battleon
});

bot.quest(3795, {
  "25862": function () { bot.gather(2894, "drakathfight"); }, // Drakath Battled!
});

bot.quest(3620, {
  "26272": function () { bot.hunt("Darkness Elemental", "shadowrise", 20); }, // Death's Minion Defeated
});

bot.quest(3796, {
  "25863": function () { bot.gather(2895, "shadowrise"); }, // Death's Lair Found?
});

bot.quest(3797, {});

bot.quest(3798, {
  "25903": function () { bot.gather(2896, "shadowattack"); }, // Hunt for Death
});

bot.quest(3799, {
  "26000": function () { bot.hunt("Death", "shadowattack"); }, // You Beat Death?!
});

bot.travel("confrontation");
bot.quest(3875, {});

bot.quest(3876, {
  "26875": function () { bot.hunt("*", "finalbattle", 1, "r1", "Left"); }, // Drakath Defeated
});

bot.quest(3877, {
  "26876": function () { bot.hunt("*", "finalbattle", 1, "r4", "Left"); }, // Drakath Defeated
});

bot.quest(3878, {
  "26877": function () { bot.hunt("*", "finalbattle", 1, "r9", "Left"); }, // Drakath Defeated
});

bot.quest(3879, {
  "26879": function () { bot.hunt("Alteon", "chaosrealm", 1, "r24", "Left"); }, // Chaos Lord Alteon Defeated
});

bot.quest(3880, {
  "26880": function () { bot.hunt("*", "chaoslord", 1, "r2", "Left"); }, // 13th Lord of Chaos Defeated
});

bot.quest(3881, {
  "26881": function () { bot.hunt("*", "finalshowdown", 1, "r2", "Left"); }, // Prince Drakath Defeated
});
