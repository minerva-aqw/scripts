/// name: Sea Voice
/// desc: Complete the Sea Voice chapter of the Age of Ruin saga.
///
/// The Voice in the Sea telegraphs `You will not resist!`; the fight expects
/// the Vigil potion in slot 5 on that cue. The bot buys and equips Vigil, then
/// lets a combat rule cast it when the message lands. The Mopping Up turn-in
/// is back in Termina Temple.

const SEA = "seavoice";
const TEMPLE = "terminatemple";
const LAST = 9351;

if (!bot.quest(LAST).done()) {
  // 9348 Dead Sea
  if (!bot.quest(9348).done()) {
    const ready = bot.ensureItemState("Vigil", 1) as { ok: boolean };
    if (!ready.ok) {
      // Shop 2320 is served in Sea Voice only.
      bot.travel(SEA);
      const bought = bot.buyItemState(2320, "Vigil", 10) as {
        ok: boolean;
        status: string;
      };
      if (!bought.ok) {
        throw new Error("buy Vigil from shop 2320: " + bought.status);
      }
    }
    const equipped = bot.equip("Vigil") as { ok: boolean; status: string };
    if (!equipped.ok) {
      throw new Error("equip Vigil: " + equipped.status);
    }
  }

  bot.questPlan(9348, {
    "79182": [
      {
        farm: {
          item: 79182,
          monster: "Voice in the Sea",
          map: SEA,
          source: "temp",
          rules: [
            {
              when: { anim: "You will not resist" },
              use: "potion",
              cooldownMs: 0,
            },
          ],
        },
      },
    ],
  });

  // 9351 Mopping Up
  bot.questPlan(9351, {
    "56676": [{ gather: { id: 12050, map: TEMPLE } }],
    "54321": [{ gather: { id: 12051, map: TEMPLE } }],
  });

  bot.notify("Sea Voice complete");
}
