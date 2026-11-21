/// name: Kitsune farm
/// desc: Travel to kitsune, locate the Kitsune boss cell, kill and claim until Hanzamune Dragon Koi Blade lands.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Flow: travel first (locate only censuses the live room), ask the census
// where the boss stands, go there, then loop kill -> pickup until the
// blade is in the backpack. The loader builds the session drops list on
// the first entered frame, so every kill's drops land where name-pickup
// reads them. `ensureItem` is the loop condition: it
// unbanks first when banked and reads a bare boolean, so it fits `while`
// directly. The round cap keeps a dry streak from running forever.
bot.travel("kitsune");
const spot = bot.locate("Kitsune");
if (!spot.found) {
  throw new Error("no Kitsune in kitsune (saw cells: " + spot.cells.join(",") + ")");
}
bot.cell(spot.cell);

const WANT = "Hanzamune Dragon Koi Blade";
let rounds = 0;
while (!bot.ensureItem(WANT)) {
  if (rounds >= 50) {
    throw new Error("no " + WANT + " after 50 kills");
  }
  bot.kill("Kitsune");
  bot.pickup(WANT);
  rounds += 1;
}
