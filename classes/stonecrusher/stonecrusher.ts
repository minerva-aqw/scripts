/// name: StoneCrusher support DPS
/// desc: Earth support rotation: shield when exposed, nukes inside Magnitude windows, Stalagmite upkeep, Echoing Earth on cooldown.
/// autoload: StoneCrusher

// StoneCrusher (support defensive caster, same kit as the Merge). Refs,
// costs, and cooldowns from aqwwiki.wikidot.com/stonecrusher-ac:
// aa Auto Attack (0/2s), a1 Stalagmite (15/6s), a2 Echoing Earth (25/18s),
// a3 Land's Embrace (25/12s), a4 Endless Fissure (35/30s).
// - Stalagmite (a1): 130% spell damage. Applies Bruised (+8% damage taken,
//   8s, stacks to 5). 25% Magnitude roll per cast; Magnitude can stun 4s.
// - Echoing Earth (a2): party haste/crit +30% (10s) plus mana flow.
//   Magnitude roll cuts party mana costs 20% (10s).
// - Land's Embrace (a3): Shielded (-50% incoming plus a HoT) on the party.
//   Magnitude roll deepens it to -80% with a bigger HoT.
// - Endless Fissure (a4): 300% spell damage plus Aftershock, a DoT that
//   grows every tick for 30s. Magnitude roll cripples crit/haste 40% (8s).
// - Magnitude (any roll): +275% outgoing magic, 2s. Nuke inside it.
// - Passives: Gaia Knowledge (+20% haste), Shifting Plates (+20% END).
//
// Solaris rates it a support pick (also ultra bosses) with no strict
// combo — "just spam". Getting one: /join gaiazor, Ravinos Brightglade —
// merge Earth's Song Token + Shaman armor (50k gold each); needs rank 10
// Brightoak, Mythsong, and Arcangrove through the /rivensylth storyline.
// (Infinity Titan is a no-farm duplicate.) Enhancements: Wizard class for
// damage, Fighter for heal; Anima helm to heal, Pneuma to damage;
// Absolution cape to heal, Vainglory to damage; Valiance, Arcana's
// Concerto, or Awe Blast weapon. Potions: Malevolent, Sage, or Phonor
// damage.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const resonance = me.aura("Resonance");
  const shielded = me.aura("Shielded");

  // Echoing Earth: 25 mana, 18 s. Applies Resonance and Dissonance to you
  // and 6 allies, +30% Haste and Crit for 10 s and improved mana regain,
  // Dissonance restores 10 mana per ally buffed. Has a 25% chance to apply
  // Magnitude, which adds +275% magical damage for 2 s. Keep it up, it feeds
  // mana and haste.
  if (s.usable("Echoing Earth") && (!resonance || resonance.remainingMs < 3000)) {
    return "Echoing Earth";
  }

  // Land's Embrace: 25 mana, 12 s. Applies Shielded, +50% Damage Resistance
  // for you and 6 allies plus a small HoT for 4 s. With Magnitude DR becomes
  // 80% and the HoT doubles. Use it when hurt, not on a full bar, to save
  // mana for Endless Fissure.
  if (me.hpPct < 75 && s.usable("Land's Embrace") && (!shielded || shielded.remainingMs < 4000)) {
    return "Land's Embrace";
  }

  if (!target) return null;

  const bruised = target.aura("Bruised");
  const aftershock = target.aura("Aftershock");

  // Endless Fissure: 35 mana, 30 s, 300% spell damage. Applies Aftershock, a
  // DoT that grows while it is on the target for 30 s. With Magnitude the
  // target also loses 40% Crit and Haste for 8 s in a sinkhole. This is the
  // main damage and the mana sink, so keep Aftershock up. Shifting Plates
  // and Gaia Knowledge passives are automatic.
  if (s.usable("Endless Fissure") && (!aftershock || aftershock.remainingMs < 4000)) {
    return "Endless Fissure";
  }

  // Stalagmite: 15 mana, 6 s, 130% spell damage. Applies Bruised, +8%
  // incoming damage per stack up to 5 stacks for 8 s. With Magnitude there
  // is a 50% chance to stun for 4 s. Stack it to 5 for the full +40%
  // incoming.
  if (s.usable("Stalagmite") && (!bruised || bruised.stacks < 5 || bruised.remainingMs < 4000)) {
    return "Stalagmite";
  }

  if (s.usable("Endless Fissure")) return "Endless Fissure";
  if (s.usable("Stalagmite")) return "Stalagmite";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
