/// name: Cold Thunder
/// desc: Complete Cold Thunder and Tell-Tale Heart, the tail of the Age of Ruin saga.
///
/// The Storm Queen telegraphs `The skies rumble. Prepare yourself!` and the
/// fight expects Bananach's Last Will in slot 5 on that cue. The bot buys and
/// equips it, then lets a combat rule cast it when the message lands. The boss
/// is raid-scale (1.3M HP); this bot is one participant. The Tell-Tale Heart
/// turn-in is back in Termina Temple.

const MAP = "coldthunder";
const TEMPLE = "terminatemple";
const LAST = 9851;

if (!bot.quest(LAST).done()) {
  // 9832 A Friend's Faith
  bot.questPlan(9832, {
    "87422": [{ gather: { id: 13403, map: MAP } }],
  });

  // 9833 The Storm Queen
  if (!bot.quest(9833).done()) {
    const ready = bot.ensureItemState("Bananach's Last Will", 1) as { ok: boolean };
    if (!ready.ok) {
      // Shop 2467 is served in Cold Thunder only.
      bot.travel(MAP);
      const bought = bot.buyItemState(2467, "Bananach's Last Will", 10) as {
        ok: boolean;
        status: string;
      };
      if (!bought.ok) {
        throw new Error("buy Bananach's Last Will from shop 2467: " + bought.status);
      }
    }
    const equipped = bot.equip("Bananach's Last Will") as {
      ok: boolean;
      status: string;
    };
    if (!equipped.ok) {
      throw new Error("equip Bananach's Last Will: " + equipped.status);
    }
  }

  bot.questPlan(9833, {
    "87421": [
      {
        farm: {
          item: 87421,
          monster: "Cold Thunder Avatar",
          map: MAP,
          source: "temp",
          rules: [
            {
              when: { anim: "The skies rumble" },
              use: "potion",
              cooldownMs: 0,
            },
          ],
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
