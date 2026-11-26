/// name: Sunlight Zone
/// desc: Complete the Sunlight Zone chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "sunlightzone";
const LAST = 9251;

if (!bot.quest(LAST).done()) {
  // 9242 Detergent Shortage
  bot.questPlan(9242, {
    "77966": [
      { farm: { item: 77966, monster: "Blighted Water", map: MAP, source: "temp" } },
    ],
  });

  // 9243 Ghost in the Machine
  bot.questPlan(9243, {
    "77967": [
      { farm: { item: 77967, monster: "Spectral Jellyfish", map: MAP, source: "temp" } },
    ],
  });

  // 9244 Efficient Division
  bot.questPlan(9244, {
    "77968": [
      { farm: { item: 77968, monster: "Blighted Water", map: MAP, source: "temp" } },
    ],
    "77969": [{ gather: { id: 11705, map: MAP } }],
    "77970": [{ gather: { id: 11706, map: MAP } }],
  });

  // 9245 Tech Illiterate
  bot.questPlan(9245, {
    "77972": [{ gather: { id: 11707, map: MAP, qty: 3 } }],
    "77971": [
      { farm: { item: 77971, monster: "Spectral Jellyfish", map: MAP, source: "temp" } },
    ],
  });

  // 9246 Plugging Leaks
  bot.questPlan(9246, {
    "77973": [
      { farm: { item: 77973, monster: "Spectral Jellyfish", map: MAP, source: "temp" } },
    ],
    "77974": [
      { farm: { item: 77974, monster: "Blighted Water", map: MAP, source: "temp" } },
    ],
  });

  // 9247 Shared History — the map's own pads pair 11708 with the left path,
  // 11709 with the right path, and 11710 with the torn page. The quest's
  // requirement order is different; the map wins.
  bot.questPlan(9247, {
    "77976": [{ gather: { id: 11709, map: MAP } }],
    "77977": [{ gather: { id: 11710, map: MAP } }],
    "77975": [{ gather: { id: 11708, map: MAP } }],
  });

  // 9248 Flat Scares
  bot.questPlan(9248, {
    "77978": [
      { farm: { item: 77978, monster: "Astravian Illusion", map: MAP, source: "temp" } },
    ],
    "77979": [{ gather: { id: 11711, map: MAP } }],
  });

  // 9249 Fishy Bully
  bot.questPlan(9249, {
    "77980": [
      { farm: { item: 77980, monster: "Infernal Illusion", map: MAP, source: "temp" } },
    ],
    "77981": [{ gather: { id: 11712, map: MAP, qty: 5 } }],
  });

  // 9250 Faint Howls
  bot.questPlan(9250, {
    "77982": [{ gather: { id: 11713, map: MAP } }],
    "77983": [
      { farm: { item: 77983, monster: "Seraphic Illusion", map: MAP, source: "temp" } },
    ],
  });

  // 9251 Down the Digestive Tract
  bot.questPlan(9251, {
    "77984": [
      { farm: { item: 77984, monster: "Marine Snow", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Sunlight Zone complete");
}
