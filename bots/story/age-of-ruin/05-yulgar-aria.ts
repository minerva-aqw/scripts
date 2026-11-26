/// name: Yulgar Aria
/// desc: Complete the Yulgar Aria chapter of the Age of Ruin saga.
///
/// Each quest pays a Venomous Rose, so every turn-in takes reward index 0.

const MAP = "twilightzone";
const SUN = "sunlightzone";
const LAST = 9274;

if (!bot.quest(LAST).done()) {
  // 9270 Octotree
  bot.questPlan(
    9270,
    {
      "78261": [
        { farm: { item: 78261, monster: "Polymelia Lamprey", map: MAP, source: "temp" } },
      ],
    },
    { choice: 0 }
  );

  // 9271 Thirsty Roots
  bot.questPlan(
    9271,
    {
      "78262": [
        { farm: { item: 78262, monster: "Blighted Water", map: SUN, source: "temp" } },
      ],
    },
    { choice: 0 }
  );

  // 9272 Dollar Store Mogloween Costume
  bot.questPlan(
    9272,
    {
      "78264": [
        { farm: { item: 78264, monster: "Infernal Illusion", map: SUN, source: "temp" } },
      ],
      "78263": [
        { farm: { item: 78263, monster: "Astravian Illusion", map: SUN, source: "temp" } },
      ],
    },
    { choice: 0 }
  );

  // 9273 Sea Snow Angels
  bot.questPlan(
    9273,
    {
      "78265": [
        { farm: { item: 78265, monster: "Marine Snow", map: SUN, source: "temp" } },
      ],
    },
    { choice: 0 }
  );

  // 9274 Ten Klicks
  bot.questPlan(
    9274,
    {
      "78266": [
        { farm: { item: 78266, monster: "Leviathan", map: MAP, source: "temp" } },
      ],
    },
    { choice: 0 }
  );

  bot.notify("Yulgar Aria complete");
}
