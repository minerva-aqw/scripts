/// name: Warrior starter
/// desc: Single-target rotation: stun nuke on cooldown, Armor Shred upkeep, Prepared crits under guard, guard when hurt.
/// autoload: Warrior

// Warrior (starter tank melee). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/warrior-class:
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
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const guard = me.aura("On Guard");
  const prepared = me.aura("Prepared Strike");

  // On Guard grants 50% damage resistance for five seconds. Keep its
  // defensive window up while engaged, with an early cast when health is
  // already low.
  if ((!guard || guard.remainingMs < (me.hpPct < 55 ? 1500 : 500))
      && s.usable("On Guard")) return "On Guard";

  if (!target) return null;

  const shred = target.aura("Armor Shred");
  if ((!shred || shred.remainingMs < 1200) && s.usable("Decisive Strike")) {
    return "Decisive Strike";
  }

  // Prepared Strike empowers the next two auto attacks. Let the buff be
  // spent before refreshing it; when On Guard is active those attacks deal
  // double.
  if (!prepared && s.usable("Prepared Strike")) return "Prepared Strike";

  if (s.usable("Imbalancing Strike")) return "Imbalancing Strike";

  if (prepared && s.usable("Auto Attack")) return "Auto Attack";
  if (s.usable("Decisive Strike")) return "Decisive Strike";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
