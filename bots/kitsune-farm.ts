/// name: Kitsune farm
/// desc: Travel to kitsune, locate the Kitsune boss cell, kill and claim until Hanzamune Dragon Koi Blade lands.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Flow: locate first (read-only census), pin the cell the census named, then
// let one item-driven farm own the loop. `farm` travels, repeats the kill,
// sweeps its own item id after each fight, and stops on the held-item floor.
// The result is typed: `held` is the backpack count, `claimed` names what the
// floor gave up, and a dry streak fails with the real progress.
bot.travel("kitsune");
const spot = bot.locate("Kitsune");
if (!spot.found) {
  throw new Error("no Kitsune in kitsune (saw cells: " + spot.cells.join(",") + ")");
}
bot.cell(spot.cell);

bot.farm({
  item: 2238, // Hanzamune Dragon Koi Blade
  qty: 1,
  monster: "Kitsune",
  map: "kitsune",
  cell: spot.cell,
});
