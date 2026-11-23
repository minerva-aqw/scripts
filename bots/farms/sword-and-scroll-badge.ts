/// name: Sword and Scroll Badge farm
/// desc: Farms Sword and Scroll Badge to WANT via repeatable quest 7505 Studying the Rogue in wardwarf.

// Ported from Skua HallofClassesMerge findIngredients ("Sword and Scroll Badge"
// case): Poisoned Dagger x4 off Drow Assassin plus Scroll: Opportunity's
// Strike x1 off D'wain Jonsen, both in wardwarf, one turn-in per badge.
// Handler keys are requirement ItemIDs (stable); quantities from quest-data.
// Repeatables always read incomplete, so bot.quest re-runs every loop round.
// IDs, not names, for counting and claiming: id claims work in every UI
// mode, while name matching needs the drop list.

const WANT = 1;
const BADGE = 54680; // Sword and Scroll Badge

function held() {
  const inv = bot.inventory(BADGE);
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
    bot.pickup(BADGE);
    guard += 1;
  }
  guard = 0;
  while (bot.pickup(BADGE)) {
    guard += 1;
    if (guard >= 500) break;
  }
  if (held() <= before) {
    throw new Error(
      "quest 7505 turned in but no Sword and Scroll Badge arrived (" + before + " held): " +
      "reward still on the floor or the quest closed server-side — re-run resumes where it left off"
    );
  }
}

bot.pickup(BADGE);

let rounds = 0;
while (held() < WANT) {
  if (rounds >= 100) {
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
