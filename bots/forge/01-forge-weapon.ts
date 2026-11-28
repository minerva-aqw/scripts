/// name: Forge weapon enhancement
/// desc: Unlock the Forge weapon enhancement with the four Chaos Lord helms.
///
/// Quest 8738 takes one helm from each of the first four Chaos Lords: Escherion
/// in /escherion behind his Staff of Inversion, Vath in /stalagbite behind
/// Stalagbite, Kitsune in /kitsune, and Wolfwing in /wolfwing. The quest gates
/// on level 30, Blacksmithing rank 4 (10,000 rep) and the finished Escherion
/// chapter (272); all three are guards here, not farms.
///
/// The helms are permanent drops, not quest items, so nothing here depends on
/// the quest staying accepted between maps.

const QUEST = 8738;
const STORY = 272;
const LEVEL = 30;
const RANK = 4;

const HELMS = [1173, 1763, 2242, 4853];

function stop(message: string): never {
  bot.notify(message);
  throw new Error(message);
}

/// A room reads its chapter's quest value slot on the arrival frame and will
/// not serve the Chaos Lord below it. Skua opens the slot on the way in; it is
/// opened here before the plan travels, and never lowered.
function openRoom(slot: number, value: number): void {
  if ((bot.questValue(slot) as number) >= value) return;
  bot.setQuestValue(slot, value);
  const now = bot.questValue(slot) as number;
  if (now < value) {
    stop("forge weapon: room slot " + slot + " reads " + now + " after writing " + value);
  }
}

function guard(): void {
  const level = (bot.me() as { level: number }).level;
  if (level < LEVEL) {
    stop("forge weapon needs level " + LEVEL + ", this character is level " + level);
  }
  const faction = bot.rep("Blacksmithing") as { found: boolean; rank: number };
  if (!faction.found) stop("forge weapon: no Blacksmithing faction on this character");
  if (faction.rank < RANK) {
    stop(
      "forge weapon needs Blacksmithing rank " + RANK + " (10,000 rep), the character is rank " +
        faction.rank + "; run Blacksmithing reputation first"
    );
  }
  if (!bot.quest(STORY).completed()) {
    stop("forge weapon needs the Escherion chapter (272) finished first");
  }
}

/// Move a helm a previous run left in the bank into the backpack: the
/// projection counts the bank, the turn-in takes the bag only. A helm that is
/// not owned yet reads `ok:false` here and is left to the plan.
function bagHelms(): void {
  for (const helm of HELMS) bot.ensureItemState(helm, 1);
}

function unlock(): void {
  bagHelms();
  // Vath, Kitsune and Wolfwing each sit behind their chapter's own value.
  openRoom(22, 35);
  openRoom(25, 22);
  openRoom(26, 23);

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
  guard();
  unlock();
}
