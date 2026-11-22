/// name: SwordMaster dodge DPS
/// desc: Dodge melee rotation: Evasion wall upkeep, Nukiuchi nuke, Sever cripple, Bladefury crit buff.
/// autoload: SwordMaster

// SwordMaster (dodge melee; same kit as BladeMaster and the Merge). Refs,
// costs, and cooldowns from aqwwiki.wikidot.com/swordmaster-class-ac
// (unconfirmed live — aura names are the wiki's; confirm against the aura
// tracker if a window ever looks off):
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
// Ported from the Beatrix SwordMaster policy (`modules/bx/classes/`):
// Evasion is the class's mana and healing engine under the Rogue dodge
// model, so the wall goes first — refresh the moment it drops or fades
// inside 3s. Technique applies Vitals (a DoT scaled by skill damage) to
// the next skill to hit every 5s and forces that skill's chance effects
// through, so below the wall the order is strongest-first: the biggest
// ready strike seeds the biggest DoT and keeps its guaranteed proc.
// Bladefury is free damage plus the crit buff and fills every gap.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Uke Negashi: Evasion wall, dodge and crit for 25s on a 25s cooldown.
  // Missing reads as lapsed (`auraBelow` returns true), so the wall is
  // re-raised the moment it drops and refreshed inside 3s. Never lapses.
  if (me.auraBelow("Evasion", 3000)) {
    skills.push("a2");
  }
  // Nukiuchi: the nuke. Stun plus Spinning Dragon both go certain under
  // Technique, so it leads below the wall and seeds the Vitals DoT with
  // the largest strike.
  skills.push("a4");
  // Sever: -70% enemy outgoing plus the Precise Cut lottery. Keep it
  // cycling; the mitigation is worth more than the cooldown it leaves.
  skills.push("a3");
  // Bladefury: free AoE, crit buff for the next window. Refresh as it
  // fades so the buff and the damage never wait on the bigger cooldowns.
  if (!me.aura("Bladefury")) {
    skills.push("a1");
  }
  // Free spam fallback so the wall and the cripple never wait.
  skills.push("a2");
  skills.push("a1");
  return skills;
}
