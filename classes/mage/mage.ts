/// name: Mage starter
/// desc: Elemental combo rotation: Ice Shard sets Frozen Blood, Fireball spends it doubled, Explosion detonates Scorched, shield when hurt.
/// autoload: Mage

// Mage (starter offensive caster). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/mage:
// aa Auto Attack (0/2s), a1 Fireball (20/6s), a2 Ice Shard (15/6s),
// a3 Explosion (10/3s), a4 Arcane Shield (0/20s).
// - Fireball (a1): damage plus Scorched (DoT). Consumes Frozen Blood for
//   double damage.
// - Ice Shard (a2): damage plus Frozen Blood (-20% haste and outgoing,
//   10s). Never lands over Scorched.
// - Explosion (a3): hits the target plus up to 3 more. Detonates Scorched
//   (consumes it for delayed damage).
// - Arcane Shield (a4): self buff — damage goes to mana instead of HP,
//   10s. Free to cast.
// - Passives: Hot Headed (+10% magic out, +10% hit), Chilled Out (-10%
//   damage taken).
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const shield = me.aura("Arcane Shield");
  if (me.hpPct < 70 && (!shield || shield.remainingMs < 1500)
      && s.usable("Arcane Shield")) return "Arcane Shield";

  if (!target) return null;

  const scorched = target.aura("Scorched");
  const frozen = target.aura("Frozen Blood");

  // Explosion detonates and consumes Scorched, so spend it near the end of
  // its duration rather than applying Fireball and immediately consuming
  // the DoT.
  if (scorched && scorched.remainingMs < 1800 && s.usable("Explosion")) {
    return "Explosion";
  }

  if (!scorched && !frozen && s.usable("Ice Shard")) return "Ice Shard";
  if (!scorched && s.usable("Fireball")) return "Fireball";

  if (s.usable("Explosion")) return "Explosion";
  if (s.usable("Fireball")) return "Fireball";
  if (s.usable("Ice Shard")) return "Ice Shard";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
