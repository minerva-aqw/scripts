/// name: Celestial Realm
/// desc: Complete A Theft of Light, the opening chapter of the Queen of Monsters saga.
///
/// Holy Oil is sold at Fishing rank 2, so that rank is a hard prerequisite and
/// the bot stops with the current rank when it is missing. The Dwakel Decoder
/// in Crash Site is a floor drop from a map object, not a temp item, so the
/// click and the claim sit outside the quest plan that turns 4498 in.

const CR = "celestialrealm";
const RUINS = "lostruins";
const WAR = "lostruinswar";
const SPIRE = "infernalspire";
const CRASH = "crashsite";

const EMBERSEA_SHOP = 1100;
const FISHING_SHOP = 356;

const LAST = 5387;

function buy(map: string, shop: number, name: string, qty: number): void {
  const held = bot.itemState(name) as { qty: number };
  if (held.qty >= qty) return;
  // A shop is only served in its own map, so stand there first.
  bot.travel(map);
  const bought = bot.buyItemState(shop, name, qty - held.qty) as {
    ok: boolean;
    status: string;
    after: number;
  };
  if (!bought.ok || bought.after < qty) {
    throw new Error("buy " + name + " x" + qty + " from shop " + shop + ": " + bought.status);
  }
}

if (!bot.quest(LAST).done()) {
  if (!bot.quest(4503).done()) {
    const oil = bot.itemState("Holy Oil") as { qty: number };
    if (oil.qty < 1) {
      const fishing = bot.rep("Fishing") as { found: boolean; rank: number };
      if (!fishing.found || fishing.rank < 2) {
        throw new Error(
          "Holy Oil needs Fishing rank 2 (current " +
            (fishing.found ? fishing.rank : "none") +
            ")"
        );
      }
    }
  }

  // 4495 Summon Help
  bot.questPlan(4495, {
    "30992": [
      {
        farm: {
          item: 30992,
          monster: "Celestial Bird of Paradise",
          map: CR,
          source: "temp",
        },
      },
    ],
    "30990": [{ gather: { id: 3698, map: CR } }],
    "30991": [
      { farm: { item: 30991, monster: "Fallen Knight", map: CR, source: "temp" } },
    ],
  });

  // 4496 Power Up!
  buy("embersea", EMBERSEA_SHOP, "Basic Guard Potion", 10);
  bot.questPlan(4496, {
    "30993": [
      {
        farm: {
          item: 30993,
          monster: "Celestial Bird of Paradise",
          map: CR,
          source: "temp",
        },
      },
    ],
    "30994": [
      { farm: { item: 30994, monster: "Fallen Knight", map: CR, source: "temp" } },
    ],
  });

  // 4497 The Final Spell Fragment
  bot.questPlan(4497, {
    "31048": [{ gather: { id: 3696, map: CR } }],
  });

  // 4498 Find the Map
  if (!bot.quest(4498).done()) {
    const quest = bot.quest(4498);
    if (!quest.active()) quest.accept();
    const decoder = (quest.info().turnin || []).find((req) => req.id === 4733);
    if (!decoder || (decoder.have ?? 0) < decoder.need) {
      bot.farm({ item: 30995, monster: "Infernal Knight", map: CR, qty: 1, source: "temp" });
      bot.gatherState(106, CRASH, 1, 4498);
      const claimed = bot.pickupNow(4733) as { reason: string };
      const held = bot.itemState(4733) as { presence: string };
      if (held.presence !== "present") {
        throw new Error("Dwakel Decoder not claimed: " + claimed.reason);
      }
    }
    bot.questPlan(4498, {
      "30995": [
        { farm: { item: 30995, monster: "Infernal Knight", map: CR, source: "temp" } },
      ],
    });
  }

  // 4499 Reveal the Portal!
  bot.questPlan(4499, {
    "30996": [{ gather: { id: 3693, map: CR } }],
  });

  // 4500 Investigate the Ruins
  bot.questPlan(4500, {
    "30997": [{ gather: { id: 3694, map: RUINS, qty: 3 } }],
    "30998": [
      { farm: { item: 30998, monster: "Underworld Hound", map: RUINS, source: "temp" } },
    ],
  });

  // 4501 Take out the Knights
  bot.questPlan(4501, {
    "30999": [
      { farm: { item: 30999, monster: "Fallen Knight", map: RUINS, source: "temp" } },
    ],
  });

  // 4502 Find the Clues
  bot.questPlan(4502, {
    "31000": [
      { farm: { item: 31000, monster: "Underworld Hound", map: RUINS, source: "temp" } },
    ],
    "31001": [
      { farm: { item: 31001, monster: "Infernal Imp", map: RUINS, source: "temp" } },
    ],
    "31002": [
      { farm: { item: 31002, monster: "Fallen Knight", map: RUINS, source: "temp" } },
    ],
    "31003": [
      { farm: { item: 31003, monster: "Infernal Knight", map: RUINS, source: "temp" } },
    ],
  });

  // 4503 Recover the Cage Key!
  buy("fishing", FISHING_SHOP, "Holy Oil", 1);
  bot.questPlan(
    4503,
    {
      "31004": [
        {
          farm: {
            item: 31004,
            id: 8,
            monster: "Fallen Knight",
            map: RUINS,
            source: "temp",
            pickup: 31004,
          },
        },
      ],
    },
    { choice: 0 }
  );

  // 4504 Protect Them
  buy("embersea", EMBERSEA_SHOP, "Potent Guard Potion", 10);
  bot.questPlan(4504, {
    "31006": [
      { farm: { item: 31006, monster: "Fallen Knight", map: RUINS, source: "temp" } },
    ],
  });

  // 4505 Break the Spell
  bot.questPlan(4505, {
    "31049": [
      { farm: { item: 31049, monster: "Fallen Knight", map: RUINS, source: "temp" } },
    ],
    "31050": [
      { farm: { item: 31050, monster: "Underworld Hound", map: RUINS, source: "temp" } },
    ],
    "31051": [{ gather: { id: 3697, map: RUINS, qty: 5 } }],
  });

  // 4506 Open the Cage
  bot.questPlan(4506, {
    "31010": [{ gather: { id: 3695, map: RUINS } }],
  });

  // 4507 Defeat the Infernal Warlord
  bot.questPlan(4507, {
    "31011": [
      { farm: { item: 31011, monster: "Infernal Warlord", map: RUINS, source: "temp" } },
    ],
  });

  // 4509 Celestial Realm at War
  bot.questPlan(4509, {
    "31054": [{ farm: { item: 31054, monster: "*", map: WAR, source: "temp" } }],
  });

  // 4508 Defeat the Diabolical Warlord!
  bot.questPlan(
    4508,
    {
      "31012": [
        {
          farm: {
            item: 31012,
            monster: "Diabolical Warlord",
            map: WAR,
            source: "temp",
          },
        },
      ],
    },
    { choice: 0 }
  );

  // 5374 Infernal Destruction
  bot.questPlan(5374, {
    "36414": [
      { farm: { item: 36414, monster: "Fallen Knight", map: SPIRE, source: "temp" } },
    ],
    "36415": [
      { farm: { item: 36415, monster: "Underworld Hound", map: SPIRE, source: "temp" } },
    ],
  });

  // 5375 Gone Without A Trace
  bot.questPlan(5375, {
    "36416": [
      { farm: { item: 36416, monster: "Fallen Knight", map: SPIRE, source: "temp" } },
    ],
    "36417": [
      { farm: { item: 36417, monster: "Underworld Hound", map: SPIRE, source: "temp" } },
    ],
    "36418": [{ gather: { id: 4729, map: SPIRE } }],
    "36419": [{ gather: { id: 4730, map: SPIRE } }],
  });

  // 5376 Helzekiel
  bot.questPlan(5376, {
    "36420": [
      { farm: { item: 36420, monster: "Helzekiel", map: SPIRE, source: "temp" } },
    ],
  });

  // 5377 Get the Keys
  bot.questPlan(5377, {
    "36421": [
      { farm: { item: 36421, monster: "Dungeon Fiend", map: SPIRE, source: "temp" } },
    ],
    "36422": [
      { farm: { item: 36422, monster: "Dungeon Fiend", map: SPIRE, source: "temp" } },
    ],
    "36423": [
      { farm: { item: 36423, monster: "Infernal Hound", map: SPIRE, source: "temp" } },
    ],
  });

  // 5378 Free the Captives
  bot.questPlan(5378, {
    "36424": [{ gather: { id: 4731, map: SPIRE, qty: 6 } }],
  });

  // 5379 Energy Needed
  bot.questPlan(5379, {
    "36425": [
      { farm: { item: 36425, monster: "Dungeon Fiend", map: SPIRE, source: "temp" } },
    ],
    "36426": [{ gather: { id: 4732, map: SPIRE, qty: 6 } }],
  });

  // 5380 Interrogate the Jailer
  bot.questPlan(5380, {
    "36427": [
      { farm: { item: 36427, monster: "Garvodeus", map: SPIRE, source: "temp" } },
    ],
  });

  // 5381 Get the Code
  bot.questPlan(5381, {
    "36428": [
      { farm: { item: 36428, monster: "Fallen Knight", map: SPIRE, source: "temp" } },
    ],
    "36429": [
      { farm: { item: 36429, monster: "Fallen Knight", map: SPIRE, source: "temp" } },
    ],
    "36430": [
      { farm: { item: 36430, monster: "Infernal Imp", map: SPIRE, source: "temp" } },
    ],
  });

  // 5382 Enter the Code
  bot.questPlan(5382, {
    "36431": [{ gather: { id: 4733, map: SPIRE } }],
  });

  // 5383 Smash it Up
  bot.questPlan(5383, {
    "36432": [{ gather: { id: 4734, map: SPIRE, qty: 4 } }],
  });

  // 5384 Take out the Overseer
  bot.questPlan(5384, {
    "36433": [
      { farm: { item: 36433, monster: "Azkorath", map: SPIRE, source: "temp" } },
    ],
  });

  // 5385 Clear the Invaders
  bot.questPlan(5385, {
    "36434": [
      { farm: { item: 36434, monster: "Infernal Knight", map: SPIRE, source: "temp" } },
    ],
    "36435": [
      { farm: { item: 36435, monster: "Grievous Fiend", map: SPIRE, source: "temp" } },
    ],
  });

  // 5386 Find the Weapon
  bot.questPlan(5386, {
    "36436": [{ gather: { id: 4735, map: SPIRE } }],
  });

  // 5387 What is THAT?
  bot.questPlan(5387, {
    "36437": [
      { farm: { item: 36437, monster: "Malxas", map: SPIRE, source: "temp" } },
    ],
  });

  bot.notify("Celestial Realm complete");
}
