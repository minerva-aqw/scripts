/// name: SwordMaster dodge DPS
/// desc: Dodge melee rotation: stun and Spinning Dragon on cooldown, Evasion wall upkeep, Sever cripple, Bladefury crit buff.
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
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Nukiuchi: stun plus Spinning Dragon. Premium control, 10s apart.
  skills.push("a4");
  // Evasion wall: dodge and crit for 25s. Never let it lapse.
  if (!me.aura("Evasion")) {
    skills.push("a2");
  }
  // Sever: -70% enemy outgoing plus the Precise Cut lottery.
  skills.push("a3");
  // Bladefury: free crit buff and AoE. Refresh as it fades.
  if (!me.aura("Bladefury")) {
    skills.push("a1");
  }
  // Free spam fallback so the wall and the cripple never wait.
  skills.push("a2");
  skills.push("a1");
  return skills;
}
