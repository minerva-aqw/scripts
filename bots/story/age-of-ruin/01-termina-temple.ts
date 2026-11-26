/// name: Termina Temple
/// desc: Complete the Termina Temple chapter of the Age of Ruin saga.
///
/// Skua runs the Mana Cradle chapter first because the temple is its
/// continuation, but 9213 accepts without it on this account, so that Shadows
/// of War chain stays out of this bot.

const MAP = "terminatemple";
const LAST = 9214;

if (!bot.quest(LAST).done()) {
  // 9213 Familiar Faces
  bot.questPlan(9213, {
    "77584": [
      { farm: { item: 77584, monster: "Termina Defender", map: MAP, source: "temp" } },
    ],
    "77585": [{ gather: { id: 11625, map: MAP } }],
    "77586": [{ gather: { id: 11626, map: MAP } }],
    "77587": [{ gather: { id: 11627, map: MAP } }],
  });

  // 9214 Loaded Resume
  bot.questPlan(9214, {
    "77588": [
      { farm: { item: 77588, monster: "Clandestine Guard", map: MAP, source: "temp" } },
    ],
    "77589": [{ gather: { id: 11628, map: MAP } }],
    "77590": [{ gather: { id: 11629, map: MAP } }],
    "77591": [{ gather: { id: 11630, map: MAP } }],
  });

  bot.notify("Termina Temple complete");
}
