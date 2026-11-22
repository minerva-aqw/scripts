/// name: Legion Revenant DPS
/// desc: Buff-first caster rotation: Depravity upkeep, Purgatory/Shade on cooldown to seed Infinita Nox, Anathema nuke, Malevolent Burst battery.
/// autoload: Legion Revenant

// Legion Revenant (offensive caster). Order ported from beatrix-native
// (`modules/bx/classes/LegionRevenant.js`); mana costs and cooldowns are the
// Beatrix author's (unconfirmed live — confirm against the skill bar and the
// aura tracker if a window ever looks off):
// Depraved Empowerment (15/6s), Wicked Purgatory (15/6s),
// Atramentous Shade (10/6s), Anathema (20/12s), Malevolent Burst (0/1.5s).
// - Depraved Empowerment: you and 6 allies. Applies Depravity (+30% dodge,
//   crit chance, and outgoing, 12s) plus Immorality (+20% haste, +30% crit
//   damage, a HoT every 1s, 12s) and Arcane Shield (absorbs 30% of Spell
//   Power from non-True damage, drains 8 mana per hit).
// - Wicked Purgatory: 100% spell to 3 targets. Applies Seared (-15% crit
//   chance, -3% more per stack) and self Enveloped (-20% incoming, -4% more
//   per stack), both 12s to 5 stacks. The mitigation half is why it goes
//   before the nuke.
// - Atramentous Shade: 85% spell to 3 targets, always crits, cannot miss.
//   Applies Decay (2s) and Atramentous Shade (-25% dodge plus a DoT every
//   1s, 12s).
// - Anathema: 300% spell to 3 targets. The nuke.
// - Purgatory, Shade, and Anathema each roll 50% for Infinita Nox (+7%
//   incoming damage, 15 stacks, 30s) — the order seeds it before the nuke.
// - Malevolent Burst: 57% spell to 3 targets plus 15 mana back on hit.
//   Rank 0, so it replaces the auto attack and pays for everything above.
// - Passives, always on: Shadow Step (+20% Wisdom), Dark Scholar (+40%
//   outgoing magic).
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const depravity = me.aura("Depravity");

  // Depraved Empowerment: nothing else multiplies this hard, so it is
  // refreshed ahead of any damage.
  if (s.usable("Depraved Empowerment") && (!depravity || depravity.remainingMs < 3000)) {
    return "Depraved Empowerment";
  }

  if (!target) return null;

  // No combo: every skill wants to be cast as soon as it is ready, and the
  // two 12s auras sit on 6s cooldowns, so cooldown play keeps them up
  // without a timer. The order seeds Infinita Nox before the nuke; Anathema
  // loses no casts to a two tick delay, so the nuke lands into whatever is
  // already there.

  // Wicked Purgatory: the mitigation half is why it goes before the nuke.
  if (s.usable("Wicked Purgatory")) return "Wicked Purgatory";

  // Atramentous Shade: the recast is both the hit and the refresh.
  if (s.usable("Atramentous Shade")) return "Atramentous Shade";

  // Anathema: the nuke, and the third Infinita Nox roll. Spend it on
  // cooldown into the debuffs above.
  if (s.usable("Anathema")) return "Anathema";

  // Malevolent Burst: the mana battery that pays for everything above.
  if (s.usable("Malevolent Burst")) return "Malevolent Burst";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
