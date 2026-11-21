/// name: Healer starter
/// desc: Solo rotation: heal under pressure, Energy Flow upkeep for mana and the damage cut, Holy nuke, Heartbeat filler.
/// autoload: Healer

// Healer (starter defensive caster). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/healer (unconfirmed live — aura names are the wiki's;
// confirm against the aura tracker if a window ever looks off):
// aa Auto Attack (0/2s), a1 Heartbeat (15/2s), a2 Healing Word (20/8s),
// a3 Energy Flow (5/12s), a4 Holy (20/8s).
// - Heartbeat (a1): damage from current health (15% current HP plus
//   moderate magic). Hits hardest at full HP.
// - Healing Word (a2): big heal on the first target plus smaller heals on
//   up to 6 more; applies Radiance (heal over time, 16s) to the first.
// - Energy Flow (a3): 12s mana engine (mana as the target takes damage)
//   plus Inhibition (-30% enemy outgoing, 8s).
// - Holy (a4): 350% light damage, deeper against undead. Hardest hit.
// - Passives: Pure Hearted (+10% hit, +10% heal power), Resolute (+10% DR).
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.6;
  // Survival first: big heal plus the 16s Radiance HoT on the first target.
  if (lowHp) {
    skills.push("a2");
  }
  // Mana engine plus a 30% enemy damage cut. 12s duration on a 12s
  // cooldown — reapply as it fades, never let it lapse.
  if (target.auraBelow("Energy Flow", 2000)) {
    skills.push("a3");
  }
  // Holy: 350% light damage, the hardest hit in the kit.
  skills.push("a4");
  // Heartbeat scales off current HP — filler while healthy.
  skills.push("a1");
  // Heal fallback so recovery never waits on the hurt check.
  skills.push("a2");
  return skills;
}
