/// name: Forge helmet enhancement
/// desc: Unlock the Forge helmet enhancement with the four Chaos Lord weapons.
///
/// Quest 8828 asks the same first four Chaos Lords for their weapons instead of
/// their helms: Escherion in /escherion behind his Staff of Inversion, Vath in
/// /stalagbite behind Stalagbite, Kitsune in /kitsune, and Wolfwing in
/// /wolfwing. The data gates it on level 30 and Blacksmithing rank 4 (10,000
/// rep); anything else the server wants is left to the accept.

const QUEST = 8828;
const LEVEL = 30;
const RANK = 4;

const WEAPONS = [1174, 1766, 2238, 4849];

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
    stop("forge helmet: room slot " + slot + " reads " + now + " after writing " + value);
  }
}

function guard(): void {
  const level = (bot.me() as { level: number }).level;
  if (level < LEVEL) {
    stop("forge helmet needs level " + LEVEL + ", this character is level " + level);
  }
  const faction = bot.rep("Blacksmithing") as { found: boolean; rank: number };
  if (!faction.found) stop("forge helmet: no Blacksmithing faction on this character");
  if (faction.rank < RANK) {
    stop(
      "forge helmet needs Blacksmithing rank " + RANK + " (10,000 rep), the character is rank " +
        faction.rank + "; run Blacksmithing reputation first"
    );
  }
}

/// Move a weapon a previous run left in the bank into the backpack: the
/// projection counts the bank, the turn-in takes the bag only. A weapon that is
/// not owned yet reads `ok:false` here and is left to the plan.
function bagWeapons(): void {
  for (const weapon of WEAPONS) bot.ensureItemState(weapon, 1);
}

function unlock(): void {
  bagWeapons();
  // Vath, Kitsune and Wolfwing each sit behind their chapter's own value.
  openRoom(22, 35);
  openRoom(25, 22);
  openRoom(26, 23);

  bot.notify("Forge helmet: Vath, Wolfwing, Kitsune, Escherion");
  bot.questPlan(QUEST, {
    "1174": [
      {
        farm: {
          item: 1174,
          monster: "Escherion",
          cell: "Boss",
          map: "escherion",
          blockers: "Staff of Inversion",
          notify: "Forge helmet: 1st Lord of Chaos Staff",
        },
      },
    ],
    "1766": [
      {
        farm: {
          item: 1766,
          monster: "Vath",
          cell: "r2",
          map: "stalagbite",
          blockers: "Stalagbite",
          notify: "Forge helmet: Chaos Dragonlord Axe",
        },
      },
    ],
    // Kitsune is invincible for three seconds every fifth of her health, so the
    // fight has gaps; nothing here has to act on them.
    "2238": [
      {
        farm: {
          item: 2238,
          monster: "Kitsune",
          cell: "Boss",
          map: "kitsune",
          notify: "Forge helmet: Hanzamune Dragon Koi Blade",
        },
      },
    ],
    "4849": [
      {
        farm: {
          item: 4849,
          monster: "Wolfwing",
          cell: "Boss",
          map: "wolfwing",
          notify: "Forge helmet: Wrath of the Werepyre",
        },
      },
    ],
  });
  bot.notify("Forge helmet enhancement unlocked");
}

if (bot.quest(QUEST).done()) {
  bot.notify("Forge helmet enhancement is already unlocked");
} else {
  guard();
  unlock();
}
