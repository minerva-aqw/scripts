/// name: King's Echo damage
/// desc: Full-damage loop: Censure upkeep, Bolt to 8 Residual stacks, CORVAK on a full battery, repeat.
/// autoload: King's Echo

// King's Echo (power caster DPS). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/king-s-echo, loop from solarisaqw.lol:
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
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
//
// Note: Residual Energy stacks on the caster (the battery), not the target.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const energy = me.aura("Residual Energy");
  const stacks = energy ? energy.stacks : 0;

  // King's Shield: 50 mana, 5 s. Two seconds of invulnerability and Focus,
  // then Royal Resolve: 50% Damage Resistance and a HoT for 6 s. The
  // invulnerability cannot repeat until CORVAK! is used, so hold it for
  // when you are hurt, not on a full bar. This is the emergency button.
  if (me.hpPct < 55 && s.usable("King's Shield")) return "King's Shield";

  // CORVAK!: consumes missing mana for 300-1260% magic damage, refills mana
  // completely, and infuses Residual Energy into Dragon Sword for 20 s.
  // Cast it in the high-stack, low-mana window, and whenever mana is too
  // low to keep casting. It re-enables the next Shield's invulnerability.
  if (s.usable("CORVAK!")
      && ((stacks >= 6 && me.mp < 40) || me.mp < 20 || stacks >= 8)) {
    return "CORVAK!";
  }

  if (!target) return null;

  const censure = target.aura("Censure");

  // Liberation Mace: 0 mana, 3 s, 250% magical damage. Applies Censure,
  // -20% Damage Resistance, Crit Chance and Dodge for 10 s. While Royal
  // Resolve is active it applies Overthrown instead, -8% outgoing damage
  // per stack up to 4. Keep Censure up.
  if (s.usable("Liberation Mace") && (!censure || censure.remainingMs < 3000)) {
    return "Liberation Mace";
  }

  // Bolt of Authority: 25 mana, 3 s, 110% magic damage. Applies Residual
  // Energy, stacking to 8 for 10 s. Each stack makes Dragon Sword hit harder,
  // and CORVAK! spends them all at once. Stack it to 8 before spending,
  // unless mana is already low.
  if (s.usable("Bolt of Authority") && stacks < 8) return "Bolt of Authority";

  // Filler: spend stacks first, then damage, then Dragon Sword.
  if (s.usable("CORVAK!")) return "CORVAK!";
  if (s.usable("Liberation Mace")) return "Liberation Mace";
  if (s.usable("Bolt of Authority")) return "Bolt of Authority";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
