/// name: Haku War
/// desc: Complete the Haku War chapter of the Dragons of Yokai saga.
///
/// Every requirement is a temp quest item. Haku Medal is repeatable and has a
/// reward, so its plan takes the first choice.

const MAP = "hakuwar";
const DARK_ZMEY = "Dark Zmey";
const KITSUNE = "Kitsune Spy";
const ONI = "Mountain Oni";
const WARRIOR = "Zmey Warrior";
const ZAKH = "Zakhvatchik";

if (!bot.quest(9607).done()) {
  // 9601 Haku Medal
  bot.questPlan(
    9601,
    {
      "84069": [{ farm: { item: 84069, monster: DARK_ZMEY, map: MAP, source: "temp" } }],
    },
    { choice: 0 }
  );

  // 9603 Tall Tails
  bot.questPlan(9603, {
    "84071": [{ farm: { item: 84071, monster: KITSUNE, map: MAP, source: "temp" } }],
  });

  // 9604 Flightless
  bot.questPlan(9604, {
    "84072": [{ farm: { item: 84072, monster: DARK_ZMEY, map: MAP, source: "temp" } }],
  });

  // 9605 NorthEast Ushitora
  bot.questPlan(9605, {
    "84073": [{ farm: { item: 84073, monster: ONI, map: MAP, source: "temp" } }],
  });

  // 9606 Zmey Gorynich
  bot.questPlan(9606, {
    "84074": [{ farm: { item: 84074, monster: WARRIOR, map: MAP, source: "temp" } }],
  });

  // 9607 Head Kukol'nyy
  bot.questPlan(9607, {
    "84075": [{ farm: { item: 84075, monster: ZAKH, map: MAP, source: "temp" } }],
  });
}
