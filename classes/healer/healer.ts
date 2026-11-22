/// name: Healer starter
/// desc: Solo rotation: heal under pressure, Energy Flow upkeep for mana and the damage cut, Holy nuke, Heartbeat filler.
/// autoload: Healer

// Healer (starter defensive caster). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/healer:
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
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  if (me.hpPct < 65 && s.usable("Healing Word")) return "Healing Word";
  if (!target) return null;

  const flow = target.aura("Energy Flow");
  if ((!flow || flow.remainingMs < 1800) && s.usable("Energy Flow")) {
    return "Energy Flow";
  }

  // Holy deals 350% damage and 2.5x damage to undead; use it whenever ready.
  if (s.usable("Holy")) return "Holy";

  // Heartbeat scales partly with current HP, so favor the heavier heal spell
  // first when injured and retain Heartbeat as the regular attack.
  if (s.usable("Heartbeat")) return "Heartbeat";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
