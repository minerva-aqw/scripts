/// name: Warrior starter
/// desc: Single-target rotation: stun nuke on cooldown, Armor Shred upkeep, Prepared crits under guard, guard when hurt.
/// autoload: Warrior

// Warrior (starter tank melee). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/warrior-class (unconfirmed live — aura names are the
// wiki's; confirm against the aura tracker if a window ever looks off):
// aa Auto Attack (0/2s), a1 Decisive Strike (5/2s), a2 Imbalancing Strike
// (20/10s), a3 Prepared Strike (10/12s), a4 On Guard (15/10s).
// - Decisive Strike (a1): 130% weapon damage. Applies Armor Shred: -10%
//   damage resistance, 5s.
// - Imbalancing Strike (a2): 240% weapon damage, stuns 3s. Hardest hit.
// - Prepared Strike (a3): self buff — next 2 autos are unavoidable crits,
//   double damage when On Guard is up at application.
// - On Guard (a4): self buff — +50% damage resistance, 5s.
// - Passives: Aggression (+10% hit, +10% physical out), Resolute (+10% DR).
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Nuke: 240% plus a 3s stun. Highest damage in the kit — fire whenever
  // the engine says ready.
  skills.push("a2");
  // Shred upkeep: -10% enemy DR for 5s. Reapply as it fades.
  if (target.auraBelow("Armor Shred", 2000)) {
    skills.push("a1");
  }
  // Prepared while guarded: the next 2 autos crit unavoidably for double.
  if (me.aura("On Guard")) {
    skills.push("a3");
  }
  // Guard when hurt: +50% DR for 5s.
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.5;
  if (lowHp) {
    skills.push("a4");
  }
  // Crit-auto setup when nothing bigger is ready.
  skills.push("a3");
  // Shred fallback so the debuff never lapses on a slow tick.
  skills.push("a1");
  return skills;
}
