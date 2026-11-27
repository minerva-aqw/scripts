/// name: King's Echo
/// desc: Unlock the King's Echo class.
///
/// Skua's chain: level 80, Good and Swordhaven rank 10, Alden's Liberation
/// Armor from the three Bocklin merges, the four accept items of 10439, then
/// 10438 and the class at shop 2630 in Termina Temple.
///
/// Reputation is a guard, not a farm: both factions must already be rank 10,
/// and the bot stops with the rank it found otherwise.
///
/// The three Bocklin repeatables share slot 585 (values 10/20/30), so `done()`
/// turns true after the first turn-in and `questPlan` cannot drive them. They
/// run through `quest.register` plus explicit kill counts, looping on the held
/// reward count instead.

const SANCTUM = "bocklinsanctum";
const GROVE = "bocklingrove";
const BCASTLE = "bocklincastle";
const ALCHEMY = "alchemyacademy";
const TEMPLE = "terminatemple";

const TREASURY_SHOP = 2578;
const GROVE_SHOP = 2576;
const ARMORY_SHOP = 2577;
const VOUCHER_SHOP = 2036;
const CLASS_SHOP = 2630;
const MACE_SHOP = 2631;

const ARMOR = 93592;
const LYNA_ARMOR = 93590;
const VALEN_ARMOR = 93591;
const ORNAMENT = 92886;
const SHARD = 93612;
const RUNE = 92791;
const FRAGMENT = 93763;
const VOUCHER_100K = 62749;
const VOUCHER_500K = 61043;
const SCALE = 93645;
const BLOOD = 44209;
const TRACE = 74259;

const CROWN = 95745;
const REFORGED = 95744;
const SWORD = 95760;
const MACE = 96387;
const CLASS = 95742;

const GOOD = 5;
const SWORDHAVEN = 37;

const Q_ORNAMENT = 10253;
const Q_SHARD = 10240;
const Q_RUNE = 10266;

function fail(message: string): never {
  throw new Error(message);
}

function held(idOrName: number | string): number {
  const item = bot.itemState(idOrName) as { qty: number };
  return item.qty;
}

/// Backpack count, with a banked copy pulled first. A banked crown is still
/// owned; farming it again because the bag reads zero would burn a whole
/// chapter twice.
function owned(id: number, name: string): number {
  const bag = held(id);
  if (bag > 0) return bag;
  bot.ensureItemState(name, 1);
  return held(id);
}

/// One map object or floor drop, item-driven. `qty` comes from the caller
/// because nothing here is a live quest requirement.
function collect(item: number, monster: string, map: string, qty: number, timeout?: number): void {
  if (held(item) >= qty) return;
  const spec: {
    item: number;
    monster: string;
    map: string;
    qty: number;
    timeout?: number;
  } = { item, monster, map, qty };
  if (timeout) spec.timeout = timeout;
  bot.farm(spec);
}

/// Kill `monster` where it is most numerous, then count exactly.
function hunt(map: string, monster: string, count: number): void {
  bot.travel(map);
  const at = bot.locate(monster) as { found: boolean; cell: string };
  if (!at.found) fail("no " + monster + " in " + map);
  bot.kill({ monster, count, map, cell: at.cell });
}

/// A repeatable quest that pays `item`. The sweep is forced on every parked
/// call (`interval: 0`) so a cycle cannot outrun its turn-in.
function repeat(item: number, target: number, quest: number, cycle: () => void): void {
  if (held(item) >= target) return;
  bot.quest.register([quest], { choice: 0, interval: 0 });
  const ceiling = target * 12;
  let rounds = 0;
  while (held(item) < target) {
    cycle();
    rounds += 1;
    if (rounds > ceiling) {
      bot.quest.unregister([quest]);
      fail("item " + item + " stuck at " + held(item) + "/" + target);
    }
  }
  bot.quest.unregister([quest]);
}

/// Stock a shop item by id at its own map, respecting a reported buy limit.
function stock(shop: number, map: string, item: number, target: number): void {
  // A banked stack is still bought gold; withdraw it before paying again.
  bot.ensureItemState(item, target);
  while (held(item) < target) {
    const left = target - held(item);
    bot.travel(map);
    const bought = bot.buyItemState(shop, item, left) as {
      ok: boolean;
      status: string;
      limit: number | null;
    };
    if (bought.ok) continue;
    if (
      bought.status === "gated" &&
      typeof bought.limit === "number" &&
      bought.limit > 0 &&
      bought.limit < left
    ) {
      const part = bot.buyItemState(shop, item, bought.limit) as {
        ok: boolean;
        status: string;
      };
      if (!part.ok) fail("buy " + item + " at shop " + shop + ": " + part.status);
      continue;
    }
    fail("buy " + item + " at shop " + shop + " (" + map + "): " + bought.status);
  }
}

/// One merge purchase. The record carries its own `turnin`, so the client
/// exchanges the materials and the op waits for the grant.
function merge(shop: number, map: string, name: string): void {
  bot.travel(map);
  const bought = bot.buyItemState(shop, name, 1) as { ok: boolean; status: string };
  if (!bought.ok) fail("merge " + name + " at shop " + shop + ": " + bought.status);
}

function armorChain(): void {
  bot.notify("King's Echo: Bocklin materials");

  // 10253 Anjou Fleur — 1 Bocklin Ornament, rolled up to 4.
  repeat(ORNAMENT, 120, Q_ORNAMENT, () => {
    hunt(BCASTLE, "Warped Revenant", 50);
    hunt(BCASTLE, "Faceless Ritualist", 25);
    hunt(BCASTLE, "Headless Knight", 1);
  });

  // 10240 Die Heimkehr — 1 Enthralling Gem Shard.
  repeat(SHARD, 160, Q_SHARD, () => {
    hunt(GROVE, "Undead Garde", 9);
    hunt(GROVE, "Garde Wraith", 6);
    hunt(GROVE, "Elder Necromancer", 1);
  });

  // 10266 Rootless Lilies — 1 Thronekeeper's Rune.
  repeat(RUNE, 100, Q_RUNE, () => {
    hunt(SANCTUM, "Thronekeeper", 1);
  });

  collect(FRAGMENT, "King Alteon", "alteonfight", 20, 1200);
  collect(SCALE, "Victorious", "darkplane", 1, 1200);
  collect(BLOOD, "Dethrix", "ebondungeon", 1, 1200);

  // 20 needs the armor, 8 each need the two nested suits, 8 for Lynaria's.
  stock(VOUCHER_SHOP, ALCHEMY, VOUCHER_100K, 36);

  if (held(LYNA_ARMOR) < 1) merge(GROVE_SHOP, GROVE, "Champion Lynaria Armor");
  if (held(VALEN_ARMOR) < 1) merge(ARMORY_SHOP, BCASTLE, "Valen's Knightly Armor");
  if (held(ARMOR) < 1) merge(TREASURY_SHOP, SANCTUM, "Alden's Liberation Armor");
}

const TRACE_FARM = {
  item: TRACE,
  monster: "Champion of Chaos",
  map: "ultradrakath",
  // 923,300 HP: one fight can outlast the default fight ceiling.
  timeout: 1800,
  // Under 1%: a dry spell must not end the run.
  patience: 0,
  // Thirteen drops, so report each one as it lands.
  notify: "King's Echo: Trace of Chaos {held}/{qty}",
};

/// 10440 Purify The Crown. The Queen of Monsters map expects the QOM story
/// value, which Skua writes client-side; do the same instead of stalling.
function crown(): void {
  bot.notify("King's Echo: King Alteon's Crown");
  const qom = bot.questValue(426) as number;
  if (qom < 33) bot.setQuestValue(426, 33);

  bot.questPlan(
    10440,
    {
      "96121": [{ farm: { item: 96121, monster: "Slugwrath", map: "dreadhaven" } }],
      "96122": [
        {
          farm: {
            item: 96122,
            monster: "Queen of Monsters",
            map: "transformation",
            timeout: 1200,
          },
        },
      ],
      "74259": [{ farm: TRACE_FARM }],
    },
    { choice: 0 }
  );
}

/// 10441 The King's Armor. The gold pieces are `*` drops from one cell each,
/// so every handler pins the cell Skua uses.
function reforged(): void {
  bot.notify("King's Echo: Alteon's Reforged Armor");
  if (held(ARMOR) < 1) armorChain();

  stock(VOUCHER_SHOP, ALCHEMY, VOUCHER_500K, 100);

  bot.questPlan(
    10441,
    {
      "94980": [{ farm: { item: 94980, monster: "*", cell: "r5", map: "thelimacity" } }],
      "96124": [{ farm: { item: 96124, monster: "*", cell: "r9", map: "liatarahill" } }],
      "96123": [{ farm: { item: 96123, monster: "*", cell: "r2", map: "atlaskingdom" } }],
      "96125": [{ farm: { item: 96125, monster: "*", cell: "r9", map: "camlan" } }],
    },
    { choice: 0 }
  );
}

/// 10442 The Path of the King.
function dragonSword(): void {
  bot.notify("King's Echo: Royal Dragon Sword");
  const me = bot.me() as { access: number };
  const member = me.access > 0;
  const defilerMap = member ? "shattersword" : "infernalarena";
  const defilerName = member ? "Graveclaw the Defiler" : "Destructive Defiler";

  bot.questPlan(
    10442,
    {
      "96129": [{ farm: { item: 96129, monster: "*", cell: "r9", map: "chaoswar" } }],
      "96128": [
        { farm: { item: 96128, monster: "Sepulchre", map: "falcontower", timeout: 1200 } },
      ],
      "96130": [
        { farm: { item: 96130, monster: "Volgritian", map: "naoisegrave", timeout: 1200 } },
      ],
      "96126": [
        {
          farm: {
            item: 96126,
            monster: defilerName,
            map: defilerMap,
            timeout: 1200,
          },
        },
      ],
      "96127": [
        { farm: { item: 96127, monster: "Dethrix", map: "ebondungeon", timeout: 1200 } },
      ],
    },
    { choice: 0 }
  );
}

if (owned(CLASS, "King's Echo") < 1) {
  const me = bot.me() as { level: number };
  if (me.level < 80) fail("level " + me.level + ", need 80");

  const good = bot.rep(GOOD) as { found: boolean; rank: number };
  const swordhaven = bot.rep(SWORDHAVEN) as { found: boolean; rank: number };
  if (!good.found || good.rank < 10) {
    fail("Good is rank " + (good.found ? good.rank : 0) + ", need 10");
  }
  if (!swordhaven.found || swordhaven.rank < 10) {
    fail("Swordhaven is rank " + (swordhaven.found ? swordhaven.rank : 0) + ", need 10");
  }

  const shadowfall = bot.questValue(283) as number;
  if (shadowfall < 29) {
    fail("Shadowfall's Rise is not finished (slot 283 = " + shadowfall + ")");
  }
  const aor = bot.questValue(557) as number;
  if (aor < 33) fail("Age of Ruin is not finished (slot 557 = " + aor + ")");
  if (!bot.quest(3881).done()) fail("13 Lords of Chaos is not finished");

  const finale = bot.quest(10439);
  if (!finale.done()) {
    // Inside this branch nothing has been consumed yet, so a missing accept
    // item really is unfarmed. An active 10439 has already eaten them.
    if (!finale.active()) {
      if (owned(MACE, "Alden's Mace") < 1) {
        bot.notify("King's Echo: Alden's Mace");
        stock(MACE_SHOP, "castle", MACE, 1);
      }
      if (owned(CROWN, "King Alteon's Crown") < 1) crown();
      if (owned(REFORGED, "Alteon's Reforged Armor") < 1) reforged();
      if (owned(SWORD, "Royal Dragon Sword") < 1) dragonSword();
    }

    if (!bot.quest(10438).done()) {
      bot.questPlan(10438, {
        "96120": [{ gather: { id: 15048, map: TEMPLE } }],
      });
    }

    bot.notify("King's Echo: Echo of the King");
    bot.questPlan(10439, {});
  }

  bot.travel(TEMPLE);
  const bought = bot.buyItemState(CLASS_SHOP, CLASS, 1) as { ok: boolean; status: string };
  if (!bought.ok) fail("buy King's Echo at shop " + CLASS_SHOP + ": " + bought.status);
  bot.notify("King's Echo unlocked");
} else {
  bot.notify("King's Echo already owned");
}
