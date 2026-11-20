/// name: Vampire Lord farming
/// desc: AoE farming rotation: Deafened uptime, Gouge/Devour on cooldown, Bat burst window. Needs the classes loader (not wired yet).

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
// Priority order, first match wins. The engine fires an entry only when
// its skill is ready (cooldown + mana, enforced from the live table) and
// its conditions hold; otherwise it keeps falling through to auto attack
// (aa Slash). Conditions cover aura state only — costs and cooldowns are
// the engine's job.
const farming = [
  // Deafened first: everything after hits 30% harder. Recast under 2s left
  // (a1's 10s cooldown already spaces it past the 8s duration).
  {
    skill: "a1",
    when: [{ targetAuraBelowMs: ["Deafened", 2000] }],
    unless: [{ meAura: "Aspect of The Bat" }],
  },
  // Bat window: haste/crit for the whole bar. Debuffs pause while it holds.
  { skill: "a4", when: [] },
  // Gouge: the hardest hit (120%) plus its dot.
  { skill: "a3", when: [] },
  // Devour: damage plus a heal off the damage dealt.
  { skill: "a2", when: [] },
  // While Bat holds, a1 cannot debuff — it buffs hit instead. Keep it up.
  {
    skill: "a1",
    when: [{ meAura: "Aspect of The Bat" }],
  },
];
