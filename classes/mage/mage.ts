/// name: Mage starter
/// desc: Elemental combo rotation: Ice Shard sets Frozen Blood, Fireball spends it doubled, Explosion detonates Scorched, shield when hurt.
/// autoload: Mage

// Mage (starter offensive caster). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/mage (unconfirmed live — aura names are the wiki's;
// confirm against the aura tracker if a window ever looks off):
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
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Spend the combo first: Frozen Blood plus Fireball is double damage.
  if (target.aura("Frozen Blood")) {
    skills.push("a1");
  }
  // Scorched detonates through Explosion — also the multi-target button.
  if (target.aura("Scorched")) {
    skills.push("a3");
  }
  // Set Frozen Blood only while Scorched is down: the shard cannot land it
  // over Scorched, so firing blind here just re-applies the block.
  if (!target.aura("Scorched")) {
    skills.push("a2");
  }
  // Shield when hurt: 10s of damage-to-mana, free and 20s apart.
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.5;
  if (lowHp) {
    skills.push("a4");
  }
  // Fallbacks keep the elements cycling on slow ticks.
  skills.push("a1");
  skills.push("a2");
  skills.push("a3");
  return skills;
}
