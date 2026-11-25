/// name: Arcangrove reputation
/// desc: Farm the Arcangrove repeatable quests until the faction reaches rank 10.
///
/// The eight repeatable quests all accept at rank 0 and share two kill cells:
/// Gorillaphant in LeftBack and Seed Spitter in RightBack. Registering them
/// lets the tick sweep accept and hand in each quest as soon as its drops are
/// ready, so the loop only has to keep both cells cleared.

const MAP = "arcangrove";
const QUESTS = [794, 795, 796, 797, 798, 799, 800, 801];
const TARGET = 10;

let rank = bot.rep("Arcangrove").rank;

if (rank < TARGET) {
  bot.travel(MAP);
  bot.quest.register(QUESTS);
  try {
    while (rank < TARGET) {
      bot.cell("LeftBack", "Left");
      bot.kill({ monster: "*", count: 10 });
      bot.cell("RightBack", "Left");
      bot.kill({ monster: "*", count: 10 });
      rank = bot.rep("Arcangrove").rank;
    }
  } finally {
    bot.quest.unregister(QUESTS);
  }
}

bot.notify("Arcangrove reputation reached rank " + rank);
