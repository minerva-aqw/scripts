/// name: Blacksmithing reputation
/// desc: Buy Gold Voucher 500k at the Alchemy Academy and turn in Intrepid Investing to reach Blacksmithing rank 10.
///
/// This is the gold route: quest 8737 takes one voucher per turn-in and gives
/// 1000 reputation, so it needs no Tower of Doom access. The normal route
/// through quest 8736 needs 15 Monster Trophies from Dread Klunk in the tower.

const TARGET = 10;
const QUEST = 8737;
const SHOP = 2036;
const VOUCHER = 61043; // Gold Voucher 500k
const VOUCHER_GOLD = 500000;

let rank = bot.rep("Blacksmithing").rank;
bot.notify("Blacksmithing reputation: rank " + rank + " -> " + TARGET);

if (rank < TARGET) {
  bot.travel("alchemyacademy");

  while (rank < TARGET) {
    let held = bot.itemState(VOUCHER).qty;

    if (held < 1) {
      const affordable = Math.floor(bot.me().gold / VOUCHER_GOLD);
      if (affordable < 1) {
        throw new Error(
          "Blacksmithing needs " +
            VOUCHER_GOLD +
            " gold for a Gold Voucher 500k and the character cannot afford one"
        );
      }

      // The voucher stack is capped at 300. Ask for what the gold covers,
      // then retry with the client's own limit if the gate is lower.
      let bought = bot.buyItemState(SHOP, VOUCHER, Math.min(300, affordable));
      if (!bought.ok && bought.status === "gated" && bought.limit > 0) {
        bought = bot.buyItemState(SHOP, VOUCHER, bought.limit);
      }
      if (!bought.ok) {
        throw new Error(
          "Blacksmithing could not buy Gold Voucher 500k (" + bought.status + ")"
        );
      }
      held = bot.itemState(VOUCHER).qty;
    }

    const quest = bot.quest(QUEST);
    if (!quest.active()) quest.accept();
    quest.turnIn(-1, held);
    rank = bot.rep("Blacksmithing").rank;
  }
}

bot.notify("Blacksmithing reputation reached rank " + rank);
