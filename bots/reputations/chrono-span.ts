/// name: ChronoSpan rep
/// desc: Farms ChronoSpan reputation to rank 10 via quest 2204 Do the 'do in thespan (r6 + r4). Notifies on every rank-up.

// Ported from Skua `CoreFarms.ChronoSpanREP`: quest 2204 wants Tin of
// Ghost Dust x2 (Moglin Ghost, r6), 8 oz Fairy Glitter x3 (Minx Fairy,
// r4), and Tog Fang x4 (Tog, r4). `bot.quest` accepts, fills via the
// handlers, and turns in by itself; the outer loop runs that cycle until
// rank 10. All requirements are temp drops (auto-loot). Handler keys are
// ItemIDs.

const RANK = 10;

const dododo = {
  "12784": function () { bot.hunt("Moglin Ghost", "thespan", 1, "r6", "Left"); }, // Tin of Ghost Dust
  "12782": function () { bot.hunt("Minx Fairy", "thespan", 1, "r4", "Left"); }, // 8 oz Fairy Glitter
  "12783": function () { bot.hunt("Tog", "thespan", 1, "r4", "Left"); }, // Tog Fang
};
bot.quest(2204, dododo);

let fac = bot.rep("ChronoSpan");
if (!fac.found) {
  throw new Error("no ChronoSpan faction after a turn-in (quest 2204 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(2204, dododo);
  fac = bot.rep("ChronoSpan");
  if (fac.rank > last) {
    bot.notify("ChronoSpan rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
