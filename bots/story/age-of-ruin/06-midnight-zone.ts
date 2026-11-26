/// name: Midnight Zone
/// desc: Complete the Midnight Zone chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "midnightzone";
const LAST = 9301;

if (!bot.quest(LAST).done()) {
  // 9292 Motivation Malady
  bot.questPlan(9292, {
    "78628": [{ gather: { id: 11842, map: MAP } }],
    "78629": [{ gather: { id: 11843, map: MAP } }],
    "78630": [{ gather: { id: 11844, map: MAP } }],
  });

  // 9293 Radical Renovation
  bot.questPlan(9293, {
    "78632": [{ gather: { id: 11845, map: MAP } }],
    "78631": [
      { farm: { item: 78631, monster: "Polymelia Lamprey", map: MAP, source: "temp" } },
    ],
  });

  // 9294 Graveyard Shift
  bot.questPlan(9294, {
    "78633": [
      { farm: { item: 78633, monster: "Vowed Shadowslayer", map: MAP, source: "temp" } },
    ],
    "78634": [
      { farm: { item: 78634, monster: "Vowed Shadowslayer", map: MAP, source: "temp" } },
    ],
  });

  // 9295 Educational Execution
  bot.questPlan(9295, {
    "78636": [{ gather: { id: 11846, map: MAP } }],
    "78635": [
      { farm: { item: 78635, monster: "Undead Prisoner", map: MAP, source: "temp" } },
    ],
  });

  // 9296 Vows For Ignorance
  bot.questPlan(9296, {
    "78637": [
      { farm: { item: 78637, monster: "Undead Prisoner", map: MAP, source: "temp" } },
    ],
    "78638": [
      { farm: { item: 78638, monster: "Vowed Shadowslayer", map: MAP, source: "temp" } },
    ],
    "78639": [{ gather: { id: 11847, map: MAP } }],
  });

  // 9297 Protein Shake
  bot.questPlan(9297, {
    "78640": [{ gather: { id: 11848, map: MAP, qty: 3 } }],
    "78641": [
      { farm: { item: 78641, monster: "Shadow Viscera", map: MAP, source: "temp" } },
    ],
  });

  // 9298 Duty Beyond Death
  bot.questPlan(9298, {
    "78642": [
      { farm: { item: 78642, monster: "Venerated Wraith", map: MAP, source: "temp" } },
    ],
  });

  // 9299 Designated Taunters
  bot.questPlan(9299, {
    "78644": [
      { farm: { item: 78644, monster: "Shadow Viscera", map: MAP, source: "temp" } },
    ],
    "78643": [
      { farm: { item: 78643, monster: "Venerated Wraith", map: MAP, source: "temp" } },
    ],
  });

  // 9300 Beloved Simulacrum
  bot.questPlan(9300, {
    "78645": [{ gather: { id: 11849, map: MAP, qty: 4 } }],
    "78646": [{ gather: { id: 11850, map: MAP } }],
  });

  // 9301 Roko's Royal Basilisk
  bot.questPlan(9301, {
    "78647": [
      { farm: { item: 78647, monster: "Sparagmos", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Midnight Zone complete");
}
