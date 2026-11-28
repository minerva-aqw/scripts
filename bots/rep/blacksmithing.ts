/// name: Blacksmithing reputation
/// desc: Farm Blacksmithing reputation to rank 10 with Monster Machining.
///
/// Monster Machining pays 2,500 rep and repeats with no rank gate: fifteen
/// Monster Trophies from the Tower of Doom, seventy-five Hydra Scale Pieces
/// from the Hydra Challenge, and one Creature Shard from /maul. Rank 10 is
/// 302,500 rep, so a cycle is a long farm and the rank is the only progress
/// worth reporting between turn-ins. The hydra heads carry the fight, so the
/// equipped class has to be able to solo one.

const FACTION = "Blacksmithing";
const TARGET = 10;
const REP_PER_TURN_IN = 2500;
/// `arrRanks[10]`, the whole ladder in reputation.
const REP_TO_TARGET = 302500;

const MACHINING = 8736;
const SCALE = 43797;
const TROPHY = 23690;
const SHARD = 7990;

function fail(message: string): never {
  throw new Error(message);
}

/// The faction's rank, or a stop: a name that does not resolve reads rank 0
/// forever, and the loop below would keep farming a quest that cannot pay it.
function rankNow(): number {
  const faction = bot.rep(FACTION) as { found: boolean; rank: number };
  if (!faction.found) fail("no " + FACTION + " faction on this character");
  return faction.rank;
}

/// One turn-in: fill the three requirements, hand in, take the 2,500 rep.
function machining(): void {
  bot.questPlan(MACHINING, {
    "43797": [{ farm: { item: SCALE, monster: "Hydra Head 25", map: "hydrachallenge" } }],
    // Floor one of the tower is the only floor with no quest-value gate, so
    // the trophy farm never has to open slot 159.
    "23690": [{ farm: { item: TROPHY, monster: "Dread Klunk", map: "towerofdoom" } }],
    "7990": [{ farm: { item: SHARD, monster: "Creature Creation", map: "maul" } }],
  });
}

let rank = rankNow();
if (rank >= TARGET) {
  bot.notify("Blacksmithing is already rank " + rank);
} else {
  bot.notify("Blacksmithing: rank " + rank + ", farming to " + TARGET);
  // The ladder in turn-ins, with room for a refused hand-in or two rather than
  // an unbounded loop if the quest ever stops paying.
  const ceiling = Math.ceil(REP_TO_TARGET / REP_PER_TURN_IN) * 3;
  let turnIns = 0;
  while (rank < TARGET) {
    machining();
    turnIns += 1;
    const next = rankNow();
    if (next > rank) {
      rank = next;
      bot.notify("Blacksmithing: rank " + rank + "/" + TARGET);
    } else if (turnIns % 10 === 0) {
      bot.notify("Blacksmithing: " + turnIns + " turn-ins, rank " + rank);
    }
    if (turnIns > ceiling) {
      fail("Blacksmithing stuck at rank " + rank + " after " + turnIns + " turn-ins");
    }
  }
  bot.notify("Blacksmithing reached rank " + rank);
}
