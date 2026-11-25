/// name: Evil rep
/// desc: Farms Evil reputation to rank 10: quest 364 Youthanize to rank 4, then 367 Bone-afide (member: 366 Dangerous Decor). Aligns Evil itself first.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
//
// Ported from Skua `CoreFarms.EvilREP` (rep only). Alignment is automatic
// (`bot.align`, same packet as Skua's `ChangeAlignment`); quest 364
// refuses otherwise, so a failed switch fails the run up front.
// `bot.quest` accepts, fills via the handlers, and turns in by itself;
// the loops run until the faction reads the next threshold. Handler keys
// are ItemIDs: old definitions can report empty requirement names, and
// IDs win on collision anyway.
const RANK = 10;

if (!bot.align("evil")) {
  throw new Error("alignment switch refused (align Evil manually first)");
}

// Fresh accounts have no Evil entry yet: run one cycle first — a real
// turn-in registers the faction. Still missing after that means the
// name (or Evil alignment) is wrong, and we fail instead of farming
// blind into a rank that can never rise.
const youth = {
  "1812": function () { bot.hunt("Slime", "swordhavenbridge", 1); }, // Youthanize
};
bot.quest(364, youth);

let fac = bot.rep("Evil");
if (!fac.found) {
  throw new Error("no Evil faction after a turn-in (check spelling; 364 needs Evil alignment)");
}

while (fac.rank < 4) {
  bot.quest(364, youth);
  fac = bot.rep("Evil");
}

const member = bot.me().upgraded === true;
const chair = {
  "1815": function () { bot.hunt("Chair", "sleuthhound", 1); },
  "1816": function () { bot.hunt("Table", "sleuthhound", 1); },
  "1817": function () { bot.hunt("Bookcase", "sleuthhound", 1); },
};
const bone = {
  "1818": function () { bot.hunt("*", "castleundead", 1, "Enter", "Left"); }, // Replacement Tibia
  "1819": function () { bot.hunt("*", "castleundead", 1, "Enter", "Left"); }, // Phalanges
};
while (fac.rank < RANK) {
  bot.quest(member ? 366 : 367, member ? chair : bone);
  fac = bot.rep("Evil");
}
