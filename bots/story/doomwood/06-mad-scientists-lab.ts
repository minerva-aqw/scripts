/// name: Mad Scientists Lab
/// desc: Complete the Mad Scientist's Lab chapter, the last part of the Doomwood saga.
///
/// Eleven quests on slot 50, values 1 through 11, in /lab and then /mountain.
/// Five of them are a single map object, five are Ant Giant or Scorpion drops,
/// and two pair both kinds. The saga script pins no cells here, so neither does
/// this file: every farm picks its own source cell.
///
/// 1161 lists two spools and only one monster: the map object pays the red
/// wire, because the blue wire is named as the Giant Scorpion's. That is the
/// only pairing the data forces; the rest are one object per quest.
///
/// 1164 and 1169 are map-object only and happen on the mountain, after the lab
/// is finished. 1169 closes the chapter and is the guard.

const LAB = "lab";
const MOUNTAIN = "mountain";
const LAST = 1169;

if (!bot.quest(LAST).done()) {
  // 1155 CastleMania: Disharmony and Despair
  bot.questPlan(1155, {
    "8615": [{ gather: { id: 488, map: LAB } }],
  });

  // 1156 Stringing Your Enemies Along
  bot.questPlan(1156, {
    "8616": [{ farm: { item: 8616, monster: "Ant Giant", map: LAB, source: "temp", pickup: 8616 } }],
  });

  // 1157 Out of Tune(ing Knobs)
  bot.questPlan(1157, {
    "8617": [{ farm: { item: 8617, monster: "Ant Giant", map: LAB, source: "temp", pickup: 8617 } }],
    "8618": [{ gather: { id: 489, map: LAB } }],
  });

  // 1158 Code of Conduct-or
  bot.questPlan(1158, {
    "8619": [{ farm: { item: 8619, monster: "Ant Giant", map: LAB, source: "temp", pickup: 8619 } }],
  });

  // 1159 Sending Out an SOS to the World
  bot.questPlan(1159, {
    "8620": [{ farm: { item: 8620, monster: "Ant Giant", map: LAB, source: "temp", pickup: 8620 } }],
  });

  // 1160 This is FINAL ZAP!
  bot.questPlan(1160, {
    "8621": [{ gather: { id: 490, map: LAB } }],
  });

  // 1161 Wire You Doing This Again?
  bot.questPlan(1161, {
    "8622": [{ gather: { id: 491, map: LAB } }],
    "8623": [{ farm: { item: 8623, monster: "Giant Scorpion", map: LAB, source: "temp", pickup: 8623 } }],
  });

  // 1162 Die, All of You!
  bot.questPlan(1162, {
    "8624": [{ farm: { item: 8624, monster: "Ant Giant", map: LAB, source: "temp", pickup: 8624 } }],
  });

  // 1163 Ample Amps Required
  bot.questPlan(1163, {
    "8625": [{ gather: { id: 492, map: LAB } }],
  });

  // 1164 Upward Over the Mountain
  bot.questPlan(1164, {
    "8626": [{ gather: { id: 493, map: MOUNTAIN } }],
  });

  // 1169 Charging Up!
  bot.questPlan(1169, {
    "8627": [{ gather: { id: 494, map: MOUNTAIN } }],
  });

  bot.notify("Mad Scientists Lab complete");
}
