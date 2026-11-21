/// name: Rogue starter
/// desc: Poison rotation: execute as Viper's Kiss runs out, poison upkeep, Footwork while down, Stiletto for the execute buff.
/// autoload: Rogue

// Rogue (starter dodge melee). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/rogue (unconfirmed live — aura names are the wiki's;
// confirm against the aura tracker if a window ever looks off):
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
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  const poison = target.aura("Viper's Kiss");
  // Execute first: Opportunity's Strike scales as the poison runs out.
  if (poison && target.auraBelow("Viper's Kiss", 1500)) {
    skills.push("a4");
  }
  // Poison upkeep: weapon hit plus the 7s DoT.
  if (target.auraBelow("Viper's Kiss", 1500)) {
    skills.push("a1");
  }
  // Footwork whenever down: haste and dodge feed mana, HP, and crits.
  if (!me.aura("Footwork")) {
    skills.push("a2");
  }
  // Stiletto: moderate hit plus the sub-40% execute buff for everything
  // after it.
  skills.push("a3");
  // Fallbacks keep the poison and the execute cycling on slow ticks.
  skills.push("a1");
  skills.push("a4");
  return skills;
}
