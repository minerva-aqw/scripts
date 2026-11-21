/// name: King's Echo damage
/// desc: Full-damage loop: Censure upkeep, Bolt to 8 Residual stacks, CORVAK on a full battery, repeat.
/// autoload: King's Echo

// King's Echo (power caster DPS). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/king-s-echo, loop from solarisaqw.lol
// (unconfirmed live — aura names are the wiki's; confirm against the aura
// tracker if a window ever looks off):
// aa Dragon Sword (0/2.5s), a1 Liberation Mace (0/3s), a2 Bolt of Authority
// (25/3s), a3 King's Shield (50/5s), a4 CORVAK! (0/16s).
// - Dragon Sword (aa): 55%-715% magic-as-physical, scaling with Spell
//   Power and the CORVAK infusion. The autos are the payoff.
// - Liberation Mace (a1): 250% magic-as-physical. Applies Censure (-20%
//   enemy DR, crit, and dodge, 10s).
// - Bolt of Authority (a2): 110% magic. Stacks Residual Energy to 8
//   (10s) — the battery CORVAK spends.
// - CORVAK! (a4): unavoidable crit, 300%-1350% off missing mana, refills
//   200 MP, and infuses the Residual stacks into Dragon Sword for 20s.
// - King's Shield (a3): not pressed in the damage loop (see defense.ts).
// - Passives: Royal Armor (+200% END, +20% physical res), Energy Attuned
//   (+25% haste/crit), My Four Dearest (-20% mana costs, +10% hit/magic).
// - Solaris full-damage loop: 2 → 3 (x8) → 5 → repeat.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  const res = target.aura("Residual Energy");
  const stacks = res && res.stacks ? res.stacks : 0;
  // CORVAK on a full battery: unavoidable crit off missing mana, 200 MP
  // back, and the stacks infuse Dragon Sword for 20s.
  if (stacks >= 8) {
    skills.push("a4");
  }
  // Censure upkeep: -20% enemy DR, crit, and dodge for 10s.
  if (target.auraBelow("Censure", 2000)) {
    skills.push("a1");
  }
  // Bolt: the stack builder. 3s cooldown, always worth firing.
  skills.push("a2");
  // Mace fallback keeps Censure from lapsing on slow ticks.
  skills.push("a1");
  // CORVAK fallback so the loop never stalls waiting on the stack read.
  skills.push("a4");
  return skills;
}
