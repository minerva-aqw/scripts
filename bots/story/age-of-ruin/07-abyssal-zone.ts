/// name: Abyssal Zone
/// desc: Complete the Abyssal Zone chapter of the Age of Ruin saga.
///
/// Every requirement is a temp quest item; the farms count temp inventory.

const MAP = "abyssalzone";
const LAST = 9315;

if (!bot.quest(LAST).done()) {
  // 9306 Shark Kiting
  bot.questPlan(9306, {
    "78810": [
      { farm: { item: 78810, monster: "Kitefin Shark Bait", map: MAP, source: "temp" } },
    ],
    "78811": [{ gather: { id: 11914, map: MAP } }],
  });

  // 9307 Suckered Blockade
  bot.questPlan(9307, {
    "78812": [{ gather: { id: 11893, map: MAP, qty: 6 } }],
    "78813": [{ gather: { id: 11894, map: MAP } }],
  });

  // 9308 Digestive Fluids
  bot.questPlan(9308, {
    "78814": [
      { farm: { item: 78814, monster: "Blighted Water", map: MAP, source: "temp" } },
    ],
  });

  // 9309 Sodden Secrets
  bot.questPlan(9309, {
    "78816": [{ gather: { id: 11895, map: MAP, qty: 3 } }],
    "78815": [
      { farm: { item: 78815, monster: "Shadow Viscera", map: MAP, source: "temp" } },
    ],
  });

  // 9310 The Hidden Corpse
  bot.questPlan(9310, {
    "78817": [
      { farm: { item: 78817, monster: "Shadow Viscera", map: MAP, source: "temp" } },
    ],
    "78818": [
      { farm: { item: 78818, monster: "Blighted Water", map: MAP, source: "temp" } },
    ],
  });

  // 9311 Octo-Flake Fish Feed
  bot.questPlan(9311, {
    "78820": [{ gather: { id: 11896, map: MAP } }],
    "78819": [
      { farm: { item: 78819, monster: "Foam Scavenger", map: MAP, source: "temp" } },
    ],
  });

  // 9312 Completely Surrounded
  bot.questPlan(9312, {
    "78821": [{ gather: { id: 11897, map: MAP, qty: 6 } }],
    "78822": [{ gather: { id: 11898, map: MAP } }],
  });

  // 9313 Sea Salt Soap
  bot.questPlan(9313, {
    "78823": [
      { farm: { item: 78823, monster: "Necro Adipocere", map: MAP, source: "temp" } },
    ],
  });

  // 9314 In the Grip of Justice
  bot.questPlan(9314, {
    "78824": [
      { farm: { item: 78824, monster: "Necro Adipocere", map: MAP, source: "temp" } },
    ],
    "78825": [
      { farm: { item: 78825, monster: "Foam Scavenger", map: MAP, source: "temp" } },
    ],
    "78826": [{ gather: { id: 11899, map: MAP } }],
  });

  // 9315 Together as One
  bot.questPlan(9315, {
    "78827": [
      { farm: { item: 78827, monster: "The Ashray", map: MAP, source: "temp" } },
    ],
  });

  bot.notify("Abyssal Zone complete");
}
