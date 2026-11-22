/// name: Vampire Lord farming
/// desc: AoE farming rotation: Deafened uptime, Gouge/Devour on cooldown, Bat burst window.

// Vampire Lord (AC). Refs, costs, and cooldowns verified live on device
// (`actions.active`): aa Slash (0/2.5s), a1 Sonar Scream (0/10s),
// a2 Devour Blood (25/5s), a3 Ghoul Gouge (25/8s), a4 Aspect of The Bat
// (25/15s). Effects from aqwwiki.wikidot.com/vampire-lord-class-ac.
//
// Auras that drive the order:
// - target "Deafened": +30% damage taken, 8s (a1). Blocked while Bat holds.
// - target "Blood Loss": enemy damage -50%, 5s (a2). Blocked while Bat holds.
// - target "Gouged": damage over 12s (a3). Blocked while Bat holds.
// - me "Aspect of The Bat": +500% haste/crit, 15s; -45% outgoing,
//   +50% incoming, and no debuffs land while it holds.
// - me "Sonar Senses": +50% hit, 8s (a1 cast while Bat holds).
// Passives, always on: Sanguine Lord (+15% damage), Ageless (+30% INT,
// -20% crit), Pure Blood (+15% damage).
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;
  if (!target) return null;

  const bat = me.aura("Aspect of The Bat");

  // Deafened first: everything after hits 30% harder. Recast under 2s left
  // (a1's 10s cooldown already spaces it past the 8s duration). Never lands
  // while Bat holds, so skip it then.
  if (!bat) {
    const deafened = target.aura("Deafened");
    if ((!deafened || deafened.remainingMs < 2000) && s.usable("Sonar Scream")) {
      return "Sonar Scream";
    }
  }

  // Bat window: haste/crit for the whole bar. Debuffs pause while it holds.
  if (s.usable("Aspect of The Bat")) return "Aspect of The Bat";

  // Gouge: the hardest hit (120%) plus its dot.
  if (s.usable("Ghoul Gouge")) return "Ghoul Gouge";

  // Devour: damage plus a heal off the damage dealt.
  if (s.usable("Devour Blood")) return "Devour Blood";

  // While Bat holds, a1 cannot debuff — it buffs hit instead. Keep it up.
  if (bat && s.usable("Sonar Scream")) return "Sonar Scream";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
