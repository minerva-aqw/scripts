/// name: Cold Thunder
/// desc: Complete Cold Thunder and Tell-Tale Heart, the tail of the Age of Ruin saga.
///
/// The Storm Queen is the raid-scale boss (1.3M HP) and its sky-rumble
/// mechanic is built for a group with Bananach's Last Will equipped. This bot
/// is one participant in that fight; the Tell-Tale Heart turn-in is back in
/// Termina Temple.

const MAP = "coldthunder";
const TEMPLE = "terminatemple";
const LAST = 9851;

if (!bot.quest(LAST).done()) {
  // 9832 A Friend's Faith
  bot.questPlan(9832, {
    "87422": [{ gather: { id: 13403, map: MAP } }],
  });

  // 9833 The Storm Queen
  bot.questPlan(9833, {
    "87421": [
      {
        farm: {
          item: 87421,
          monster: "Cold Thunder Avatar",
          map: MAP,
          source: "temp",
        },
      },
    ],
  });

  // 9851 Tell-Tale Heart
  bot.questPlan(9851, {
    "87734": [{ gather: { id: 13541, map: TEMPLE } }],
    "87735": [{ gather: { id: 13542, map: TEMPLE } }],
  });

  bot.notify("Cold Thunder complete");
}
