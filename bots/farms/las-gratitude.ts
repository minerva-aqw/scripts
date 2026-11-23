/// name: La's Gratitude farm
/// desc: Farms La's Gratitude to 300 via repeatable quest 8001 in astravia.

// Ported from Skua CoreDarkon.LasGratitude (default quantity 300).
// Quest 8001 "Let Sleeping Dogs Lie": 20 Broken Dog Tag + 5 Intact
// Dog Tag off Creature 27 in astravia. Repeatables always read
// incomplete, so bot.quest re-runs every loop round; the reward can
// land on the floor, so drain it after every turn-in.

const WANT = 300;

function held() {
  const inv = bot.inventory("La's Gratitude");
  return inv.found ? inv.qty : 0;
}

function drain(before) {
  // The reward drop may not be on the floor yet right after turn-in, and
  // a bare pickup reads a miss without waiting (Skua's Wait.ForPickup
  // does). Each call round-trips to the host, so retrying doubles as the
  // wait: keep claiming until the count grows past what turn-in started
  // with, then clear any remainder on the floor.
  let guard = 0;
  while (held() <= before && guard < 60) {
    bot.pickup("La's Gratitude");
    guard += 1;
  }
  guard = 0;
  while (bot.pickup("La's Gratitude")) {
    guard += 1;
    if (guard >= 500) break;
  }
}

bot.pickup("La's Gratitude");

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
