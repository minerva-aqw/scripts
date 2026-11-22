/// name: Evil rep
/// desc: Farms Evil reputation to rank 10: quest 364 Youthanize to rank 4, then 367 Bone-afide (member: 366 Dangerous Decor). Requires Evil alignment.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Ported from Skua `CoreFarms.EvilREP` (rep only — alignment is manual:
// Minerva cannot change alignment, and quest 364 refuses otherwise).
// `bot.quest` accepts, fills via the handlers, and turns in by itself;
// the loops run until the faction reads the next threshold. Handler keys
// are ItemIDs: old definitions can report empty requirement names, and
// IDs win on collision anyway.
const RANK = 10;

const fac = bot.rep("Evil");
if (!fac.found) {
  throw new Error("no faction named Evil (check bot.rep spelling)");
}

while (bot.rep("Evil").rank < 4) {
  bot.quest(364, {
    "1812": function () { bot.hunt("Slime", "swordhavenbridge", 1); }, // Youthanize
  });
}

const member = bot.me().upgraded === true;
while (bot.rep("Evil").rank < RANK) {
  if (member) {
    bot.quest(366, {
      "1815": function () { bot.hunt("Chair", "sleuthhound", 1); },
      "1816": function () { bot.hunt("Table", "sleuthhound", 1); },
      "1817": function () { bot.hunt("Bookcase", "sleuthhound", 1); },
    });
  } else {
    bot.quest(367, {
      "1818": function () { bot.hunt("*", "castleundead", 1, "Enter", "Left"); }, // Replacement Tibia
      "1819": function () { bot.hunt("*", "castleundead", 1, "Enter", "Left"); }, // Phalanges
    });
  }
}
