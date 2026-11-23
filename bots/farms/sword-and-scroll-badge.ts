/// name: Sword and Scroll Badge farm
/// desc: Farms Sword and Scroll Badge to 100 via repeatable quest 7505 Studying the Rogue in wardwarf.

 // Ported from Skua HallofClassesMerge findIngredients ("Sword and Scroll Badge"
 // case): Poisoned Dagger x4 off Drow Assassin plus Scroll: Opportunity's
 // Strike x1 off D'wain Jonsen, both in wardwarf, one turn-in per badge.

// Declarative form: `bot.quest(id, handlers)` accepts, fills each
// requirement through its handler, then turns in. Handler keys are
// requirement ItemIDs (stable); quantities from quest-data. Repeatables
// always read incomplete, so the call re-runs every loop round.
// IDs, not names, for counting and claiming: id claims work in every UI
// mode, while name matching needs the drop list.

const WANT = 100;
const BADGE = 54680; // Sword and Scroll Badge

function held() {
  const inv = bot.inventory(BADGE);
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
    if (floorHas(BADGE)) bot.pickup(BADGE);
    guard += 1;
  }
  guard = 0;
  while (floorHas(BADGE) && guard < 10) {
    bot.pickup(BADGE);
    guard += 1;
  }
  if (held() <= before) {
    throw new Error(
      "quest 7505 turned in but no Sword and Scroll Badge arrived (" + before + " held): " +
      "reward still on the floor or the quest closed server-side — re-run resumes where it left off"
    );
  }
}

if (floorHas(BADGE)) bot.pickup(BADGE);

let rounds = 0;
while (held() < WANT) {
  if (rounds >= 200) {
    throw new Error("Sword and Scroll Badge stalled at " + held() + "/" + WANT);
  }
  const before = held();
  bot.quest(7505, {
    "54577": function () { bot.hunt("Drow Assassin", "wardwarf", 4); }, // Poisoned Dagger
    "54578": function () { bot.hunt("D'wain Jonsen", "wardwarf"); }, // Scroll: Opportunity's Strike
  });
  drain(before);
  rounds += 1;
}
