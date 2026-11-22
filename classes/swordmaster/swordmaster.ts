/// name: SwordMaster dodge DPS
/// desc: Dodge melee rotation: Evasion wall upkeep, Nukiuchi nuke, Sever cripple, Bladefury crit buff.
/// autoload: SwordMaster

// SwordMaster (dodge melee; same kit as BladeMaster and the Merge). Refs,
// costs, and cooldowns from aqwwiki.wikidot.com/swordmaster-class-ac:
// aa Nukitsuke (0/1.75s), a1 Bladefury (0/5s), a2 Uke Negashi (10/25s),
// a3 Sever (15/9s), a4 Nukiuchi (20/10s).
// - Bladefury (a1): free AoE to 4 targets. 25% per target to apply
//   Bladefury (+15% crit chance, +50% crit damage, 5s).
// - Uke Negashi (a2): Evasion (+25% dodge, +15% crit, 25s). 25s duration
//   on a 25s cooldown — a permanent wall when never lapsed. Also resets
//   the Technique cooldown.
// - Sever (a3): moderate damage, -70% enemy outgoing for 5s. 35% Precise
//   Cut (-30% enemy DR, 5s); the Technique passive forces chance-based
//   effects through on its own cooldown.
// - Nukiuchi (a4): 50% stun for 2s plus 50% Spinning Dragon (the target's
//   next attack deals 0).
// - Passives: Keen Reflexes (+20% crit damage, +25% dodge), Technique
//   (Vitals DoT plus forced procs; +20% DEX), Tanden (+20% outgoing).
//
// Technique applies Vitals (a DoT scaled by skill damage) to the next skill
// to hit every 5s and forces that skill's chance effects through, so below
// the wall the order is strongest-first: the biggest ready strike seeds the
// biggest DoT and keeps its guaranteed proc. Evasion is the class's mana and
// healing engine under the dodge model, so the wall goes first — refresh the
// moment it drops or fades inside 3s.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const evasion = me.aura("Evasion");

  // Uke Negashi: 10 mana, 25 s. Grants Evasion, +25% Dodge and +15% Crit
  // Chance for 25 s, and resets Technique. Duration matches the cooldown, so
  // Evasion can be held permanently: refresh it the moment it drops. Dodge
  // is the class's mana and healing engine under the Rogue model, so this
  // goes first.
  if (s.usable("Uke Negashi") && (!evasion || evasion.remainingMs < 3000)) {
    return "Uke Negashi";
  }

  if (!target) return null;

  // Technique is passive: every 5 s the next skill to hit applies Vitals, a
  // DoT scaled by that skill's damage, and lands that skill's chance effects
  // for free. The order below puts the strongest proc first, so whichever
  // skill is ready when Vitals can be applied seeds the biggest DoT and
  // keeps its guaranteed effect.

  // Nukiuchi: 20 mana, 10 s, 500% physical. The nuke. Its 50% stun for 2 s
  // and 50% Spinning Dragon, which zeroes the target's next attack, both
  // become certain under Technique. Cast it on cooldown, ahead of Sever so
  // the Vitals DoT is seeded by the largest strike.
  if (s.usable("Nukiuchi")) return "Nukiuchi";

  // Sever: 15 mana, 9 s, 240% physical. Cuts the target's Outgoing Damage by
  // 70% for 5 s, the class's main mitigation, and has a 35% chance of
  // Precise Cut, -30% Damage Resistance for 5 s. Keep it cycling; the debuff
  // is worth more than the cooldown it leaves.
  if (s.usable("Sever")) return "Sever";

  // Bladefury: 0 mana, 5 s, 60% physical to 4 targets. A 25% chance per
  // target hit to apply Bladefury, +15% Crit Chance and +50% Crit Damage for
  // 5 s. Free damage, the crit buff and the AoE, so it fills every gap the
  // two above leave. Keen Reflexes (+25% Dodge, +20% Crit Damage) and Tanden
  // (+20% Outgoing Damage) are passive and need no casting.
  if (s.usable("Bladefury")) return "Bladefury";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
