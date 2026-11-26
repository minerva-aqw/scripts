/// name: Blacksmithing reputation
/// desc: Farm Blacksmithing reputation to rank 10 with Monster Machining.
///
/// The quest repeats with no rank gate: one stack of hydra scales from the
/// Hydra Challenge, fifteen Monster Trophies from the Tower of Doom, and one
/// Creature Shard from /maul. The hydra heads carry the fight, so the equipped
/// class has to be able to solo one.

const FACTION = "Blacksmithing";
const TARGET = 10;

const MACHINING = 8736;
const SCALE = 43797;
const TROPHY = 23690;
const SHARD = 7990;

function rankNow(): number {
  return bot.rep(FACTION).rank;
}

function machining(): void {
  bot.questPlan(MACHINING, {
    "43797": [{
      farm: { item: SCALE, monster: "Hydra Head 25", map: "hydrachallenge" },
    }],
    // Floor 1 of the tower is the only floor with no quest-value gate, so the
    // trophy farm never has to open slot 159.
    "23690": [{
      farm: { item: TROPHY, monster: "Dread Klunk", map: "towerofdoom" },
    }],
    "7990": [{
      farm: { item: SHARD, monster: "Creature Creation", map: "maul" },
    }],
  });
}

let rank = rankNow();
while (rank < TARGET) {
  machining();
  rank = rankNow();
}

bot.notify("Blacksmithing reputation reached rank " + rank);
