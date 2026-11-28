/// name: Forge weapon enhancement
/// desc: Unlock the Forge weapon enhancement with the four Chaos Lord helms.
///
/// Quest 8738 takes one helm from each of the first four Chaos Lords: Escherion
/// in /escherion behind his Staff of Inversion, Vath in /stalagbite behind
/// Stalagbite, Kitsune in /kitsune, and Wolfwing in /wolfwing. The quest data
/// gates it on level 30 and Blacksmithing rank 4 (10,000 rep); both are guards
/// here, and anything else the server wants is left to the accept, which
/// answers with its own refusal.
///
/// The helms are permanent drops, not quest items, so nothing here depends on
/// the quest staying accepted between maps.

const QUEST = 8738;
const LEVEL = 30;
const RANK = 4;

const HELMS = [1173, 1763, 2242, 4853];

/// Move a helm a previous run left in the bank into the backpack: the
/// projection counts the bank, the turn-in takes the bag only. A helm that is
/// not owned yet reads `ok:false` here and is left to the plan.
function bagHelms(): void {
  for (const helm of HELMS) bot.ensureItemState(helm, 1);
}

function unlock(): void {
  bagHelms();
  // Vath, Kitsune and Wolfwing each sit behind their chapter's own value.
  openQuestSlot("forge weapon", 22, 35);
  openQuestSlot("forge weapon", 25, 22);
  openQuestSlot("forge weapon", 26, 23);

  bot.notify("Forge weapon: Kitsune, Vath, Escherion, Wolfwing");
  bot.questPlan(QUEST, {
    "1173": [
      {
        farm: {
          item: 1173,
          monster: "Escherion",
          cell: "Boss",
          map: "escherion",
          blockers: "Staff of Inversion",
          notify: "Forge weapon: 1st Lord of Chaos Helm",
        },
      },
    ],
    "1763": [
      {
        farm: {
          item: 1763,
          monster: "Vath",
          cell: "r2",
          map: "stalagbite",
          blockers: "Stalagbite",
          notify: "Forge weapon: Chaos Dragonlord Helm",
        },
      },
    ],
    // Kitsune is invincible for three seconds every fifth of her health, so the
    // fight has gaps; nothing here has to act on them.
    "2242": [
      {
        farm: {
          item: 2242,
          monster: "Kitsune",
          cell: "Boss",
          map: "kitsune",
          notify: "Forge weapon: Chaos Shogun Helmet",
        },
      },
    ],
    "4853": [
      {
        farm: {
          item: 4853,
          monster: "Wolfwing",
          cell: "Boss",
          map: "wolfwing",
          notify: "Forge weapon: Wolfwing Mask",
        },
      },
    ],
  });
  bot.notify("Forge weapon enhancement unlocked");
}

if (bot.quest(QUEST).done()) {
  bot.notify("Forge weapon enhancement is already unlocked");
} else {
  requireLevel("forge weapon", LEVEL);
  requireRank("forge weapon", "Blacksmithing", RANK);
  unlock();
}
