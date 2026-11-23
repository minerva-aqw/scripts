/// name: La's Gratitude farm
/// desc: Farms La's Gratitude to 300 via repeatable quest 8001 in astravia.

// Ported from Skua CoreDarkon.LasGratitude (default quantity 300).
// Quest 8001 "Let Sleeping Dogs Lie": 20 Broken Dog Tag + 5 Intact
// Dog Tag off Creature 27 in astravia.
//
// Declarative form: `bot.quest(id, handlers)` accepts, fills each
// requirement through its handler, then turns in. Handler keys are
// requirement ItemIDs (stable); quantities from quest-data. Repeatables
// always read incomplete, so the call re-runs every loop round.
// IDs, not names, for counting and claiming: id claims work in every UI
// mode, while name matching needs the drop list.

const WANT = 300;
const GRATITUDE = 60198; // La's Gratitude

function held() {
  const inv = bot.inventory(GRATITUDE);
  return inv.found ? inv.qty : 0;
}

function floorHas(id) {
  // Cheap floor check with a fast miss: id pickup sends `getDrop` blind
  // and polls the grant to `op_timeout` (30s) on a miss, so a blind
  // `pickup(id)` on an empty floor idles ~30s. The pending list reads
  // false immediately, so gate the blind send on it. List off (Custom
  // Drops UI) reads as "maybe", falling back to the direct pickup.
  try {
    const d = bot.drops();
    for (const e of d) {
      if (e.id === id) return true;
    }
    return false;
  } catch (err) {
    return true;
  }
}

function drain(before) {
  // The reward drop may not be on the floor yet right after turn-in, and
  // a bare id pickup reads a miss only after polling the grant to the op
  // timeout (Skua's Wait.ForPickup does not exist here). Each call
  // round-trips to the host, so retrying doubles as the wait — but only
  // send when the floor actually lists the reward, so the wait is cheap
  // list reads instead of 30s grant polls. Keep claiming until the count
  // grows past what turn-in started with, then clear any remainder the
  // same gated way.
  let guard = 0;
  while (held() <= before && guard < 60) {
    if (floorHas(GRATITUDE)) bot.pickup(GRATITUDE);
    guard += 1;
  }
  guard = 0;
  while (floorHas(GRATITUDE) && guard < 10) {
    bot.pickup(GRATITUDE);
    guard += 1;
  }
  if (held() <= before) {
    throw new Error(
      "quest 8001 turned in but no La's Gratitude arrived (" + before + " held): " +
      "reward still on the floor or the quest closed server-side — re-run resumes where it left off"
    );
  }
}

if (floorHas(GRATITUDE)) bot.pickup(GRATITUDE);

let rounds = 0;
while (held() < WANT) {
  if (rounds >= 400) {
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
