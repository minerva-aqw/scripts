/// name: Kitsune farm
/// desc: Travel to kitsune, locate the Kitsune boss cell, kill and claim until Hanzamune Dragon Koi Blade lands.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Flow: travel first (locate only censuses the live room), ask the census
// where the boss stands, go there, then loop kill -> pickup until the
// blade is in the backpack. `ensureItem` is the loop condition: it
// unbanks first when banked and reads a bare boolean, so it fits `while`
// directly. The round cap keeps a dry streak from running forever.
bot.travel("kitsune");
const spot = bot.locate("Kitsune");
if (!spot.found) {
  throw new Error("no Kitsune in kitsune (saw cells: " + spot.cells.join(",") + ")");
}
bot.cell(spot.cell);
// Arm the session drops list BEFORE the first kill. The loader builds the
// custom list on first ensure and only drops arriving after that land in
// it — anything earlier exists solely as yes/no popups, which name-pickup
// cannot see (and a stuck popup blocks later drops). This call is also
// the canary: it errors actionably when the list is unavailable instead
// of failing 50 silent rounds later.
bot.drops();

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
