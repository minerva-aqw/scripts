/// name: Rogue starter
/// desc: Poison rotation: execute as Viper's Kiss runs out, poison upkeep, Footwork while down, Stiletto for the execute buff.
/// autoload: Rogue

// Rogue (starter dodge melee). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/rogue:
// aa Auto Attack (0/1.5s), a1 Viper's Kiss (10/3s), a2 Footwork (20/16s),
// a3 Stiletto (20/20s), a4 Opportunity's Strike (10/4s).
// - Viper's Kiss (a1): weapon hit plus poison dealing damage over 7s.
// - Footwork (a2): self buff — +30% haste and dodge, 7s. Dodges also feed
//   mana and HP.
// - Stiletto (a3): moderate hit plus Concealed Blade — bonus damage to
//   targets under 40% max HP, growing as they near death.
// - Opportunity's Strike (a4): hits harder the closer Viper's Kiss is to
//   expiring.
// - Passives: Elusive (+15% dodge), Incisive (+10% hit, +15% crit).
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const footwork = me.aura("Footwork");
  if ((!footwork || footwork.remainingMs < 1200) && s.usable("Footwork")) {
    return "Footwork";
  }

  if (!target) return null;

  const poison = target.aura("Viper's Kiss");
  const concealed = me.aura("Concealed Blade");

  // Opportunity's Strike gains damage as Viper's Kiss approaches expiration.
  if (poison && poison.remainingMs < 1600 && s.usable("Opportunity's Strike")) {
    return "Opportunity's Strike";
  }

  if (!poison && s.usable("Viper's Kiss")) return "Viper's Kiss";

  // Stiletto grants Concealed Blade for 12 seconds, increasing damage
  // against targets below 40% health. Keep it up when the target is in
  // execute range.
  if (target.hpPct < 40 && (!concealed || concealed.remainingMs < 1500)
      && s.usable("Stiletto")) return "Stiletto";

  if (s.usable("Viper's Kiss")) return "Viper's Kiss";
  if (s.usable("Stiletto")) return "Stiletto";
  if (s.usable("Opportunity's Strike")) return "Opportunity's Strike";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
