/// name: Ninja survival
/// desc: Vanish upkeep for +100% dodge, Smoke Bomb hit-down on target, Sharpened Edge for crit mana economy, Shuriken filler.
/// autoload: Ninja

// Ninja (dodge melee). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/ninja-class:
// aa Auto Attack (0/1.5s), a1 Shuriken (8/1.5s), a2 Shadowblade (15/6s),
// a3 Smoke Bomb (20/10s), Thin Air (0/15s). Passives: Elusive (+15% dodge),
// Incisive (+10% hit, +15% crit).
// - Thin Air: self Vanish — +100% haste and dodge, +20 mana, Concealed Blade
//   (execute bonus under 25% HP), 5s. The survival core: never spend it.
// - Shadowblade: applies Sharpened Edge (+10% crit, +25% crit damage, 10s);
//   with Vanish active it burns Vanish for damage — skipped while Vanished.
// - Smoke Bomb: target -15% hit (-35% more with Vanish, but burns it) and
//   -15% dodge, 6s. Cast only un-Vanished so the dodge wall survives.
// - Shuriken: bleed upkeep filler.
// Mana comes from strikes (more on crits) and dodges, so keeping Sharpened
// Edge and Vanish up is the whole economy. Aura names follow the skill they
// come from; a renamed aura just reads absent and the upkeep casts anyway.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const vanish = me.aura("Vanish");

  // Vanish is the dodge wall: refresh it whenever it is down or fading.
  if ((!vanish || vanish.remainingMs < 1200) && s.usable("Thin Air")) {
    return "Thin Air";
  }

  if (!target) return null;

  const vanished = !!vanish;

  if (!vanished) {
    // Hit-down on the target, but never at the cost of the dodge wall.
    const smoke = target.aura("Smoke Bomb");
    if ((!smoke || smoke.remainingMs < 1500) && s.usable("Smoke Bomb")) {
      return "Smoke Bomb";
    }

    // Crit upkeep feeds mana-on-crit; same no-burn rule as above.
    const edge = me.aura("Sharpened Edge");
    if ((!edge || edge.remainingMs < 1500) && s.usable("Shadowblade")) {
      return "Shadowblade";
    }

    if (s.usable("Shadowblade")) return "Shadowblade";
    if (s.usable("Smoke Bomb")) return "Smoke Bomb";
  }

  if (s.usable("Shuriken")) return "Shuriken";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
