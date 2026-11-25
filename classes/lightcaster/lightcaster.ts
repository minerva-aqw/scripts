/// name: LightCaster solo
/// desc: Spotlight stack upkeep with guaranteed-hit shred, Illuminate buff upkeep and heals, Burned by Light nuke.
/// autoload: LightCaster

// LightCaster (offensive caster). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/lightcaster-class:
// aa Auto Attack (0/2s), a1 Lingering Light (10/4s), a2 Light Blast
// (15/4s), a3 Illuminate (20/12s), a4 Burned by Light (35/15s).
// - Lingering Light (a1): 100% spell. Applies In The Spotlight (+3% damage
//   taken per stack, 10s, up to 50 stacks). The stack engine: spam to build.
// - Light Blast (a2): 350% spell, guaranteed hit, cannot crit. Applies
//   Blinded by Light (-5% enemy hit per stack, 12s, max 5). Unmissable
//   filler that also softens incoming hits.
// - Illuminate (a3): 300% heal to self plus up to 6 allies. Applies
//   Illuminated (+15% outgoing, crit chance, crit damage, hit, dodge,
//   haste, damage resistance, 12s). Matches its 12s cooldown, so full
//   uptime when cast on time.
// - Burned by Light (a4): 500% spell on impact plus a 350% DoT over 10s.
//   The nuke: fire on cooldown.
// - Passives: Mentally Bright (+15% INT), Speed of Light (+15% haste),
//   Power of the Sun (+15% outgoing).
// - Special: gains mana from landed hits (more on crits), scaled to own
//   HP — the rotation spends freely, the engine holds what is not ready.
//
// Recommended: Wizard enhancement, Health/Mana Vamp weapon.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  // Illuminate: 20 mana, 12 s, 300% party heal. A heal first: at low health
  // the heal is worth it with or without a target.
  if (me.hpPct < 65 && s.usable("Illuminate")) return "Illuminate";

  if (!target) return null;

  // Burned by Light: 35 mana, 15 s. Impact plus a 10 s DoT — the hardest
  // hit in the kit, so it goes the moment it is ready.
  if (s.usable("Burned by Light")) return "Burned by Light";

  // Illuminate upkeep: 12 s buff on a 12 s cooldown. Recast as it fades so
  // the +15% outgoing (plus hit, crit, haste, and resistance) never drops.
  const lit = me.aura("Illuminated");
  if ((!lit || lit.remainingMs < 2000) && s.usable("Illuminate")) {
    return "Illuminate";
  }

  // Light Blast: 15 mana, 4 s, 350% spell that cannot miss or crit. Filler
  // above the stack builder, and its hit debuff softens what hits back.
  if (s.usable("Light Blast")) return "Light Blast";

  // Lingering Light: 10 mana, 4 s, 100% spell. Each cast stacks In The
  // Spotlight (+3% damage taken, 10 s, up to 50) — the spam that makes
  // everything else hit harder, so it runs whenever the bigger hits wait.
  if (s.usable("Lingering Light")) return "Lingering Light";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
