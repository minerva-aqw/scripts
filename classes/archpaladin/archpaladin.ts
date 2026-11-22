/// name: ArchPaladin solo support
/// desc: Seal-to-Eden combo rotation: Hymn upkeep and heals, Commandment shred stacks, Eden inside the fading seal.
/// autoload: ArchPaladin

// ArchPaladin (solo/support full hybrid; 0 AC and AC share the kit). Refs,
// costs, and cooldowns from aqwwiki.wikidot.com/archpaladin-0-ac,
// combo from solarisaqw.lol:
// aa Auto Attack (0/2s), a1 Commandment (10/5s), a2 Hymn of Light (40/10s),
// a3 Righteous Seal (20/25s), a4 Sacred Magic: Eden (40/25s).
// - Commandment (a1): 150% weapon to 3 targets (375% vs undead). Stacks
//   Divine, Commandent, and Eminent to 6 (dodge/defense -10% per stack,
//   hit/outgoing/crit -5% per stack, 10s).
// - Hymn of Light (a2): 380% party heal that always crits, plus +20% END
//   and defense on the caster for 15s.
// - Righteous Seal (a3): 135% hybrid. Foe deals -90% damage for 7s (+3s
//   stun vs undead).
// - Sacred Magic: Eden (a4): 550% spell to 3 targets — 1100% inside the
//   seal, consuming it for Broken Seal (-15% enemy outgoing, 25s, to 2).
// - Passives: Restitution (-20% incoming), Blessed by Light (+100% END,
//   +10% hit), Righteous Judgement (+20% outgoing, +15% haste).
//
// Getting one: the /darkthronehub chain (rank 10 Good, rank 8
// SpellCrafting, 13 Lords of Chaos; members also rank 10 Healer and
// Warrior). Enhancements: Luck class; Valiance, Praxis, Awe Blast, or
// Arcana's Concerto weapon; Forge helm; Lament, Vainglory, or Penitence
// cape. Potions: Fate Tonic, Battle Elixir, Felicitous Philtre.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  // Hymn of Light: 40 mana, 10 s, 7 allies. Heals 380% hybrid, always crits,
  // and grants +20% END and Defense for 15 s. A heal first: at full health
  // the buff is not worth the cast or the mana.
  if (me.hpPct < 55 && s.usable("Hymn of Light")) return "Hymn of Light";

  if (!target) return null;

  const seal = target.aura("Righteous Seal");

  // Righteous Seal: 20 mana, 25 s, 135% hybrid. The target deals 90% less
  // damage for 7 s, and undead are stunned for 3 s. The opener against
  // anything that hits back, and the setup for Eden.
  if (!seal && s.usable("Righteous Seal")) return "Righteous Seal";

  // Sacred Magic: Eden: 40 mana, 25 s, 550% spell damage to 3 targets,
  // doubled to 1100% while the target is sealed. It consumes the seal and
  // leaves Broken Seal, -15% outgoing damage for 25 s. Hold it until the seal
  // is about to fade: the seal keeps almost all of its 7 s of mitigation
  // instead of one tick, and the matching 25 s cooldowns stay lined up for
  // the next cycle.
  if (seal && seal.remainingMs < 3000 && s.usable("Sacred Magic: Eden")) {
    return "Sacred Magic: Eden";
  }

  // Commandment: 10 mana, 5 s, 150% weapon damage to 3 targets, 375%
  // against undead. Applies Divine, Commandment and Eminent, -10% Dodge and
  // Defense and -5% Hit, outgoing damage and Crit Chance per stack, six
  // stacks for 10 s. This is the spam skill: even at six stacks a cast beats
  // the auto attack and refreshes the stacks, so it is used on every
  // cooldown, not just to refresh.
  if (s.usable("Commandment")) return "Commandment";

  // Restitution (-20% incoming damage), Blessed by Light (+100% END, +10%
  // Hit) and Righteous Judgement (+20% outgoing damage, +15% Haste) are
  // passive.
  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
