/// name: Escherion test
/// desc: Travel to Escherion and kill him while prioritizing the Staff of Inversion.
///
/// Steps 1 and 2 of the live soak bot. The map/cell/pad mirror the boss room;
/// `Staff` matches the Staff of Inversion blocker.

const MAP = "escherion";
const CELL = "Boss";
const PAD = "Left";

bot.notify("test: travelling to " + MAP);
bot.travel(MAP, CELL, PAD);

bot.notify("test: killing Escherion");
bot.kill({
  monster: "Escherion",
  blockers: ["Staff"],
  count: 1,
});

bot.notify("test: Escherion kill done");
