/// name: Chaos Lords 13 - Alteon
/// desc: Alteon chapter, quests 3077-3160. Completed quests return true without touching anything, so re-runs resume where they left off.

// Ported from Skua Story/LordsofChaos Core13LoC.Alteon.
// Handler keys are requirement ItemIDs (stable); map-item IDs and
// monster names come from the same source, quantities from quest-data.
// 3121 gathers all eight invites under every handler, since the exact
// invite-to-map-item pairing is unverified; the loop converges regardless.

bot.quest(3077, {
  "19185": function () { bot.hunt("Chaos Bandit", "archives", 6); }, // Bandit Mask
});

bot.quest(3078, {
  "19186": function () { bot.hunt("Camouflaged Sp-eye", "archives", 4); }, // Unpopped Eyeball
});

bot.quest(3079, {
  "19190": function () { bot.hunt("Chaos Bandit", "archives", 3); }, // Clump of Tentacles
  "19187": function () { bot.hunt("Camouflaged Sp-eye", "archives", 3); }, // Chaorrupted Humor
});

bot.quest(3080, {
  "19192": function () { bot.gather(1937, "archives"); }, // Dripping Clue
  "19191": function () { bot.hunt("Chaos Bandit", "archives", 6); }, // Reeking Clue
});

bot.quest(3081, {
  "19193": function () { bot.hunt("Chaos Rat", "archives", 7); }, // Infected Rat
});

bot.quest(3082, {
  "19194": function () { bot.hunt("Chaos Spider", "archives", 8); }, // Spider Slain
});

bot.quest(3083, {
  "19196": function () { bot.hunt("Chaos Rat", "archives", 5); }, // Intact Rat Brain
  "19195": function () { bot.hunt("Chaos Spider", "archives", 5); }, // Vial of Ichor
});

bot.quest(3084, {
  "19197": function () { bot.hunt("Sludgelord", "archives"); }, // Sludgy Core
});

bot.quest(3094, {
  "19536": function () { bot.hunt("Chaorrupted Prisoner", "armory", 10); }, // Prisoner Defeated
});

bot.quest(3095, {
  "19537": function () { bot.hunt("Chaorrupted Prisoner", "armory", 4); }, // Weapon Recovered
  "19538": function () { bot.gather(1956, "armory", 4); }, // Peasant Armed
});

bot.quest(3096, {
  "19539": function () { bot.hunt("Chaos Drifter", "armory", 6); }, // Chaos Goo
});

bot.quest(3089, {
  "19418": function () { bot.hunt("Chaorrupted Prisoner", "armory", 3); }, // Sharp Axe
});

bot.quest(3090, {
  "19419": function () { bot.hunt("Chaos Mage", "armory", 3); }, // Frozen Charm
});

bot.quest(3091, {
  "19420": function () { bot.hunt("Chaos Mage", "armory", 3); }, // Flaming Charm
});

bot.quest(3092, {
  "19421": function () { bot.gather(1957, "armory"); }, // Chaos Army Defeated
});

bot.quest(3093, {
  "19422": function () { bot.hunt("Chaos General", "armory"); }, // Chaos General Defeated
});

bot.quest(3120, {
  "20026": function () { bot.hunt("Chaos Invader", "ceremony", 8); }, // Stolen Invitation
});

bot.quest(3121, {
  "20032": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Barber's Invite
  "20033": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Artix's Invite
  "20034": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Robina's Invite
  "20027": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Yulgar's Invite
  "20028": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Hans' Invite
  "20029": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Serenity's Invite
  "20030": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Denara's Invite
  "20031": function () { bot.gather(2108, "yulgar"); bot.gather(2109, "yulgar"); bot.gather(2110, "yulgar"); bot.gather(2111, "archives"); bot.gather(2112, "swordhaven"); bot.gather(2113, "swordhaven"); bot.gather(2114, "swordhaven"); bot.gather(2115, "swordhaven"); }, // Lady Celestia's Invite
});

bot.quest(3122, {
  "20035": function () { bot.gather(2116, "swordhaven", 8); }, // Balloons Placed
});

bot.quest(3123, {
  "20037": function () { bot.hunt("Living Fire", "mafic"); }, // Burning Coal Brazier
});

bot.quest(3124, {
  "20038": function () { bot.hunt("Chaos Invader", "ceremony", 12); }, // Invader Outvited
});

bot.quest(3125, {
  "20039": function () { bot.gather(2118, "ceremony", 6); }, // Chair
});

bot.quest(3126, {
  "20040": function () { bot.gather(2119, "ceremony"); }, // Chapel Sealed
  "20041": function () { bot.hunt("Chaos Invader", "ceremony", 8); }, // Invaders Defeated
});

bot.quest(3127, {
  "20042": function () { bot.hunt("Chaos Justicar", "ceremony"); }, // Justicar Defeated
});

bot.quest(3133, {
  "20303": function () { bot.gather(2127, "chaosaltar", 12); }, // Aisles Cleared
});

bot.quest(3134, {
  "20304": function () { bot.hunt("Princess Thrall", "chaosaltar"); }, // Princess Thrall Defeated
});

bot.quest(3158, {
  "20659": function () { bot.hunt("Chaos Dragon", "castleroof"); }, // Chaos Dragon Slain
});

bot.quest(3159, {
  "20660": function () { bot.gather(2158, "swordhavenfalls"); }, // Cleaned the Streets
});

bot.quest(3160, {
  "20661": function () { bot.hunt("Chaos Lord Alteon", "swordhavenfalls"); }, // Chaos Lord Alteon Slain
});
