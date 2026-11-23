/// name: La's Gratitude farm
/// desc: Farms La's Gratitude to 300 via repeatable quest 8001 in astravia.

// Ported from Skua CoreDarkon.LasGratitude (default quantity 300).
// Quest 8001 "Let Sleeping Dogs Lie": 20 Broken Dog Tag + 5 Intact
// Dog Tag off Creature 27 in astravia. Repeatables always read
// incomplete, so bot.quest re-runs every loop round; the quest stays
// accepted across turn-ins, so round 2+ skips the accept send by design
// (same as Skua's RegisterQuests loop) — a missing accept line after
// the first round is normal.
// IDs, not names, for counting and claiming: id claims work in every UI
// mode, while name matching needs the drop list.

const WANT = 300;
const GRATITUDE = 60198; // La's Gratitude
const BROKEN = 60196; // Broken Dog Tag
const INTACT = 60197; // Intact Dog Tag

function held() {
  const inv = bot.inventory(GRATITUDE);
  return inv.found ? inv.qty : 0;
}

function drain(before) {
  // The reward drop may not be on the floor yet right after turn-in, and
  // a bare pickup reads a miss without waiting (Skua's Wait.ForPickup
  // does). Each call round-trips to the host, so retrying doubles as the
  // wait: keep claiming until the count grows past what turn-in started
  // with, then clear any remainder on the floor.
  let guard = 0;
  while (held() <= before && guard < 20) {
    bot.pickup(GRATITUDE);
    guard += 1;
  }
  guard = 0;
  while (bot.pickup(GRATITUDE)) {
    guard += 1;
    if (guard >= 500) break;
  }
  if (held() <= before) {
    throw new Error(
      "quest 8001 turned in but no La's Gratitude arrived (" + before + " held): " +
      "reward still on the floor or the quest closed server-side — re-run resumes where it left off"
    );
  }
}

bot.pickup(GRATITUDE);

let rounds = 0;
while (held() < WANT) {
  if (rounds >= 300) {
    throw new Error("La's Gratitude stalled at " + held() + "/" + WANT);
  }
  const before = held();
  bot.quest(8001, {
    "60196": function () { bot.hunt("Creature 27", "astravia", 20); }, // Broken Dog Tag
    "60197": function () { bot.hunt("Creature 27", "astravia", 5); }, // Intact Dog Tag
  });
  drain(before);
  rounds += 1;
}
