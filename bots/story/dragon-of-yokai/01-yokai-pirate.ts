/// name: Yokai Pirate
/// desc: Complete the Yokai Pirate chapter of the Dragons of Yokai saga.
///
/// Every requirement is a temp quest item. Some are map objects, and two are
/// granted by a single fixed map-id spawn instead of a named monster.

const MAP = "yokaipirate";
const DISGUISED = "Disguised Pirate";
const SERPENT = "Serpent Warrior";
const OWL = "Noble Owl";

if (!bot.quest(9387).done()) {
  // 9378 Wokou
  bot.questPlan(9378, {
    "79844": [{ gather: { id: 12133, map: MAP } }],
    "79845": [{ gather: { id: 12134, map: MAP } }],
    "79846": [{ gather: { id: 12135, map: MAP } }],
  });

  // 9379 Shanty Sha-N-Ti
  bot.questPlan(9379, {
    "79847": [{ farm: { item: 79847, monster: DISGUISED, map: MAP, source: "temp" } }],
  });

  // 9380 Yokai's Ark
  bot.questPlan(9380, {
    "79848": [{ gather: { id: 12136, map: MAP } }],
    "79849": [{ gather: { id: 12137, map: MAP } }],
    "79850": [{ farm: { item: 79850, monster: SERPENT, map: MAP, source: "temp" } }],
  });

  // 9381 Fashion Fathoms
  bot.questPlan(9381, {
    "79851": [{ farm: { item: 79851, monster: DISGUISED, map: MAP, source: "temp" } }],
  });

  // 9382 Hoo Wants a Cracker
  bot.questPlan(9382, {
    "79852": [{ farm: { item: 79852, monster: OWL, map: MAP, source: "temp" } }],
  });

  // 9383 Papers Please
  bot.questPlan(9383, {
    "79853": [{ gather: { id: 12138, map: MAP, qty: 7 } }],
  });

  // 9384 King and Coral Snakes
  bot.questPlan(9384, {
    "79856": [{ farm: { item: 79856, monster: SERPENT, map: MAP, source: "temp" } }],
    "79854": [{ gather: { id: 12139, map: MAP } }],
    "79855": [{ farm: { item: 79855, monster: DISGUISED, map: MAP, source: "temp" } }],
  });

  // 9385 Horizon's Green Flash
  bot.questPlan(9385, {
    "79857": [{ farm: { item: 79857, monster: OWL, map: MAP, source: "temp" } }],
  });

  // 9386 Highly Buoyant Metal Armor
  bot.questPlan(9386, {
    "79858": [{ farm: { item: 79858, id: 1, monster: "Neverglades Knight", map: MAP, source: "temp" } }],
  });

  // 9387 Salty Roots
  bot.questPlan(9387, {
    "79859": [{ farm: { item: 79859, id: 11, monster: "Lord Brentan", map: MAP, source: "temp" } }],
  });
}
