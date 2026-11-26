/// name: Shadowfall's Rise
/// desc: Complete the Shadowfall's Rise chapter, from Noxus Tower to Luma Fortress.
///
/// Every requirement is a temp quest item and the chapter spans three maps, so
/// the farms count temp inventory and the bot travels once per map. Quests run
/// in slot order; a finished chapter is a no-op.

const NOXUS = "noxustower";
const WAR = "lightguardwar";
const LUMA = "lumafortress";

const LAST = 6592;

let activeQuest = 0;

function drop(item: number, monster: string, map: string, qty: number): void {
  bot.farm({ item, monster, map, qty, source: "temp" });
}

function gather(item: number, map: string, qty: number): void {
  const got = bot.gatherState(item, map, qty, activeQuest) as {
    gathered: boolean;
    held: number;
  };
  if (!got.gathered) {
    throw new Error(
      "gather " + item + " x" + qty + " in " + map + " stopped at " + got.held
    );
  }
}

function complete(id: number, fill: () => void, choice?: number): void {
  activeQuest = id;
  const quest = bot.quest(id);
  if (quest.done()) return;
  if (!quest.active()) quest.accept();
  fill();
  quest.turnIn(choice);
}

if (!bot.quest(LAST).done()) {
  bot.travel(NOXUS);

  complete(6539, () => drop(45261, "Slimeskull", NOXUS, 8));
  complete(6540, () => drop(45262, "Doomwood Treeant", NOXUS, 6));
  complete(6541, () => drop(45263, "Sanguine Souleater", NOXUS, 1));
  complete(6542, () => drop(45264, "Lightguard Caster", NOXUS, 10));
  complete(6543, () => drop(45265, "Lightguard Caster", NOXUS, 6));

  complete(6544, () => {
    drop(45266, "Lightguard Caster", NOXUS, 4);
    gather(6018, NOXUS, 4);
  });

  complete(6545, () => drop(45268, "Lightguard Wolf", NOXUS, 6));
  complete(6546, () => drop(45269, "Lightguard Paladin", NOXUS, 3));

  complete(6547, () => {
    drop(45272, "Slimeskull", NOXUS, 3);
    drop(45270, "Lightguard Caster", NOXUS, 4);
    drop(45271, "Doomwood Treeant", NOXUS, 3);
  });

  complete(6548, () => gather(6019, NOXUS, 1));
  complete(6549, () => gather(6020, NOXUS, 1));
  complete(6550, () => drop(45275, "General Goldhammer", NOXUS, 1));

  bot.travel(WAR);

  complete(6560, () => drop(45379, "Citadel Crusader", WAR, 5), 0);
  complete(6562, () => drop(45381, "Citadel Crusader", WAR, 3), 0);
  complete(6564, () => drop(45383, "Lightguard Engine", WAR, 1), 0);
  complete(6565, () => drop(45384, "Scorching Flame", WAR, 5), 0);
  complete(6566, () => drop(45385, "Citadel Crusader", WAR, 3), 0);
  complete(6567, () => drop(45386, "Sigrid Sunshield", WAR, 1));

  bot.travel(LUMA);

  complete(6581, () => {
    gather(6098, LUMA, 8);
    drop(45723, "Invasive Shadow", LUMA, 8);
  });

  complete(6582, () => {
    drop(45724, "Light Treeant", LUMA, 6);
    gather(6099, LUMA, 7);
  });

  complete(6583, () => drop(45726, "Light Elemental", LUMA, 6));
  complete(6584, () => drop(45727, "Hapless Skeleton", LUMA, 1));
  complete(6585, () => drop(45728, "Light Treeant", LUMA, 6));

  complete(6586, () => {
    gather(6100, LUMA, 1);
    drop(45730, "Lightwing", LUMA, 1);
  });

  complete(6587, () => gather(6101, LUMA, 1));
  complete(6588, () => drop(45732, "Light Elemental", LUMA, 10));
  complete(6589, () => drop(45733, "Living Shadow", LUMA, 10));
  complete(6590, () => drop(45734, "Skeleton Minion", LUMA, 10));
  complete(6591, () => drop(45735, "Corrupted Luma", LUMA, 1));
  complete(6592, () => drop(45736, "Light Elemental", LUMA, 5), 0);

  bot.notify("Shadowfall's Rise complete");
}
