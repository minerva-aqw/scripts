/// name: Unidentified 13 farm
/// desc: Farms Unidentified 13 to 13 (max stack). Pet/sword paths when held, else the Supplies wheel (Relic of Chaos) with The Assistant (gold) fallback.

// Ported from Skua Nation/Materials/Unidentified13.cs + CoreNation.FarmUni13.
// Handler keys are requirement ItemIDs from quest-data; maps and monster
// names from the same source. Flat sequencing, re-runs resume.

function qty(id) {
  const inv = bot.inventory(id);
  return inv.found ? inv.qty : 0;
}

const WANT = 13;
const UNI13 = 4762;

// Announce each newly granted Uni 13 (quest reward choice), with the stack
// count, so a background run beeps as it fills. Tracks the last announced
// count: re-runs start silent, completion notifies once below.
let announced = 0;
function noteUni13() {
  const have = qty(UNI13);
  if (have > announced) {
    announced = have;
    if (have >= WANT) {
      bot.notify("Unidentified 13 complete: " + have + "/" + WANT);
    } else {
      bot.notify("Unidentified 13 drop: " + have + "/" + WANT);
    }
  }
  return have;
}

if (bot.ensureItem(UNI13, WANT)) {
  // Done: re-run resumes here with no travel.
} else {
  announced = qty(UNI13);

  // Pet/sword paths pay Uni13 directly (choice 4762). Gate items are the
  // quests' own accept requirements: Drone 42573, Gift 46999, swords
  // 38275/38254, all non-member.
  const NEW_WORLDS = {
    "38236": function () { bot.hunt("Slugfit", "mobius", 5, "Slugfit", "Bottom"); }, // Slugfit Horn x5
    "42574": function () { bot.hunt("Cyclops Warlord", "mobius", 3); }, // Cyclops Horn x3
    "38238": function () { bot.hunt("Dark Makai", "tercessuinotlim", 5, "m2", "Top"); }, // Makai Fang x5
    "38239": function () { bot.hunt("Fire Imp", "hydra", 3, "Rune2", "Left"); }, // Imp Flame x3
    "42575": function () { bot.hunt("Big Bad Boar", "greenguardwest", 2, "West12", "Up"); }, // Wereboar Tusk x2
  };
  const VOID_KNIGHT = {
    "38276": function () { bot.hunt("Crystalized Jellyfish", "battleunderc", 3); }, // Aquamarine of Nulgath x3
    "38236": function () { bot.hunt("Slugfit", "mobius", 5, "Slugfit", "Bottom"); }, // Slugfit Horn x5
    "38237": function () { bot.hunt("Aracara", "faerie"); }, // Aracara Silk
    "38238": function () { bot.hunt("*", "tercessuinotlim", 5, "m2", "Left"); }, // Makai Fang x5
    "38239": function () { bot.hunt("Fire Imp", "hydra", 3); }, // Imp Flame x3
  };

  // Converter/wheel cycles (Skua order: Crag path first). The Assistant
  // wheel (2859) and Supplies wheel (2857) IGNORE the reward choice: the
  // server rolls rate-weighted rewards (Uni 13 is rate 1.0 / ~408 weight on
  // 2859, ~509 on 2857), so a spin banks ~3 Diamonds of Nulgath plus lucky
  // direct hits instead of paying Uni 13. The Crag converter (869) is the
  // deterministic leg: 15 banked diamonds + 1 sigil = 1 guaranteed Uni 13.
  // Cycle converter-then-wheel so banked diamonds always feed back into
  // guaranteed turn-ins. No cycle cap: at ~0.3 diamonds/spin, 13 Uni 13 via
  // the converter needs ~650 spins; a fixed cap always looks like a stall.
  // Stall is detected by lack of progress across full cycles instead.
  if (!bot.ensureItem(4845)) {
    bot.notify("Unidentified 13: no Crag & Bamboozle (4845) — wheel luck only, converter idle. Get the pet for guaranteed turn-ins.");
  }
  let stagnant = 0;
  let lastUni = qty(UNI13);
  let lastDia = qty(4771);
  while (qty(UNI13) < WANT) {
    let diamondRounds = 0;
    while (qty(UNI13) < WANT && bot.ensureItem(4845) && qty(4771) >= 15 && diamondRounds < 20) {
      bot.quest(869, {
        "15397": function () { bot.hunt("Dark Makai", "tercessuinotlim", 1, "m1", "Left"); }, // Dark Makai Sigil
      });
      noteUni13();
      diamondRounds += 1;
    }
    let droneRounds = 0;
    while (qty(UNI13) < WANT && bot.ensureItem(42573) && droneRounds < 20) {
      bot.quest(6183, NEW_WORLDS, { choice: UNI13 });
      noteUni13();
      droneRounds += 1;
    }
    let giftRounds = 0;
    while (qty(UNI13) < WANT && bot.ensureItem(46999) && giftRounds < 20) {
      bot.quest(6697, NEW_WORLDS, { choice: UNI13 });
      noteUni13();
      giftRounds += 1;
    }
    let swordRounds = 0;
    while (qty(UNI13) < WANT && bot.ensureItem(38275) && swordRounds < 20) {
      bot.quest(5662, VOID_KNIGHT, { choice: UNI13 });
      noteUni13();
      swordRounds += 1;
    }
    while (qty(UNI13) < WANT && bot.ensureItem(38254) && swordRounds < 20) {
      bot.quest(5659, VOID_KNIGHT, { choice: UNI13 });
      noteUni13();
      swordRounds += 1;
    }
    // Wheel batch: 10 spins to bank diamonds (+ lucky direct Uni 13).
    // Gold-gated: >100k gold stays on yulgar (2859 The Assistant, Memorabilia
    // 100k each from shop 41 — the buy MUST happen from yulgar, a cross-map
    // shop load gets the session kicked, so travel first every round).
    // At/below 100k it runs the free Escherion relic hunt (2857 Supplies).
    // A failed buy with gold held (full bag, capped, lag) skips the spin and
    // retries yulgar next round — it never burns a relic round while gold
    // is up. No buy when one is already held: the turn-in only eats 1, so
    // re-buying on top of a stack just burns 100k and looks like 2x -> 3x.
    const MEMO = 52824;
    let spins = 0;
    while (qty(UNI13) < WANT && spins < 10) {
      const gold = bot.me().gold;
      if (gold > 100000) {
        bot.travel("yulgar");
        if (qty(MEMO) < 1) {
          bot.buyItem(41, MEMO);
        }
        if (qty(MEMO) >= 1) {
          bot.quest(2859, {}, { choice: UNI13, quiet: 20 });
        }
        noteUni13();
        spins += 1;
      } else {
        bot.quest(2857, {
          "67266": function () { bot.hunt("Escherion", "escherion", 1, "Boss", "Left"); }, // Relic of Chaos
        }, { choice: UNI13, quiet: 20 });
        noteUni13();
        spins += 1;
      }
    }
    // Progress guard: a full cycle that moved neither Uni 13 nor Diamonds
    // means both legs are dry (gold dry on 2859 AND relic hunt failing on
    // 2857, or converter gated). Three dry cycles in a row = real stall.
    const uniNow = qty(UNI13);
    const diaNow = qty(4771);
    if (uniNow > lastUni || diaNow > lastDia) {
      stagnant = 0;
    } else {
      stagnant += 1;
    }
    lastUni = uniNow;
    lastDia = diaNow;
    if (stagnant >= 3) {
      throw new Error("Unidentified 13 stalled at " + uniNow + "/" + WANT + " with " + diaNow + " Diamonds banked (no progress for 3 cycles: converter needs Crag & Bamboozle 4845 + 15 diamonds per turn-in; else Escherion Boss/Left for relics, or 100k gold per Memorabilia at yulgar 41)");
    }
  }
}
