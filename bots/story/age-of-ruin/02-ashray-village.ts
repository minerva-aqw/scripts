/// name: Ashray Village
/// desc: Complete the Ashray Village chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "ashray";
const LAST = 9234;

if (!bot.quest(LAST).done()) {
  // 9225 Big ol' Eyes
  bot.questPlan(9225, {
    "77862": [
      { farm: { item: 77862, monster: "Kitefin Shark Bait", map: MAP, source: "temp" } },
    ],
  });

  // 9226 Angler Anger
  bot.questPlan(9226, {
    "77864": [{ gather: { id: 11663, map: MAP } }],
    "77865": [{ gather: { id: 11664, map: MAP } }],
    "77863": [
      { farm: { item: 77863, monster: "Ashray Fisherman", map: MAP, source: "temp" } },
    ],
  });

  // 9227 Slimy Scavenger
  bot.questPlan(9227, {
    "77866": [
      { farm: { item: 77866, monster: "Ghostly Eel", map: MAP, source: "temp" } },
    ],
  });

  // 9228 Troubled Waters
  bot.questPlan(9228, {
    "77868": [{ gather: { id: 11665, map: MAP } }],
    "77867": [
      { farm: { item: 77867, monster: "Stagnant Water", map: MAP, source: "temp" } },
    ],
  });

  // 9229 Washed Ink
  bot.questPlan(9229, {
    "77869": [
      { farm: { item: 77869, monster: "Ashray Fisherman", map: MAP, source: "temp" } },
    ],
    "77870": [{ gather: { id: 11666, map: MAP } }],
  });

  // 9230 Fishy Hospitality
  bot.questPlan(9230, {
    "77871": [
      { farm: { item: 77871, monster: "Kitefin Shark Bait", map: MAP, source: "temp" } },
    ],
  });

  // 9231 Doctoring Papers
  bot.questPlan(9231, {
    "77872": [
      { farm: { item: 77872, monster: "Ghostly Eel", map: MAP, source: "temp" } },
    ],
    "77873": [{ gather: { id: 11667, map: MAP } }],
  });

  // 9232 Psychic Pollution
  bot.questPlan(9232, {
    "77874": [
      { farm: { item: 77874, monster: "Stagnant Water", map: MAP, source: "temp" } },
    ],
    "77875": [{ gather: { id: 11668, map: MAP } }],
  });

  // 9233 Duck Dive
  bot.questPlan(9233, {
    "77876": [{ gather: { id: 11669, map: MAP } }],
    "77877": [{ gather: { id: 11670, map: MAP } }],
  });

  // 9234 Faces in the Foam
  bot.questPlan(9234, {
    "77878": [
      { farm: { item: 77878, monster: "Seafoam Elemental", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Ashray Village complete");
}
