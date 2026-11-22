/// name: Yami no Ronin dodge DPS
/// desc: Guide DPS rotation: Tachi/Kettou spam, Maku upkeep for Spinning Dragon, Jigen on the fading Yami. The nuke consumes Flash/Revealed — the dodge reset.
/// autoload: Yami no Ronin

// Yami no Ronin (dodge melee). Refs from the live skill table
// (`actions.active`): aa Batto, a1 Tachi, a2 Yami no Maku, a3 Kettou,
// a4 Jigen Kogeki.
// - Batto (aa, 0/2s): +8% out/hit/crit, -7% dodge (Flash/Revealed, 15s,
//   stacks to 10). The autos already cast it.
// - Tachi (a1, 3/3s): always hits, never crits, no Flash. Builds Ichi
//   (+20% out, 10s), Ni (+20% physical, 8s), San (+150% crit dmg, 6s).
// - Yami no Maku (a2, 20/8s): always hits. DoT grows over 10s (5 ticks)
//   plus Spinning Dragon (target's next attack deals 0).
// - Kettou (a3, 3/3s): strong hit + heal, plus 1 Flash/Revealed. The DPS
//   spam half of the guide 2-4 combo; the nuke consumes the stacks.
// - Jigen Kogeki (a4, 20/6s): nuke, biggest as Yami fades; consumes
//   Flash/Revealed/Ichi/Ni/San — the dodge reset.
// - Passives: Hisome (+80% dodge), Gouyuu (+35% out), Sokudo (+15%
//   haste/crit).
//
// Combos (vanaheim guide + wikidot skills, post-rework): DPS is 2-4 spam
// with 3 for the DoT/shield and 5 on the fading Yami; the dodge combo
// drops 4. This file runs the DPS shape — survival comes from the
// Spinning Dragon windows plus Kettou lifesteal, not from holding dodge.
// Aura names are the wiki's; confirm against the aura tracker if the nuke
// timing ever looks off.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const flash = me.aura("Flash");
  const ichi = me.aura("Ichi");
  const ni = me.aura("Ni");
  const san = me.aura("San");

  if (!target) return null;

  const yami = target.aura("Yami") || target.aura("Yami no Maku");

  const flashStacks = flash ? flash.stacks : 0;

  // Jigen scales up as Yami's DoT expires and consumes the accumulated class
  // buffs. Don't require all three short-lived Tachi effects: that can make
  // the policy miss the Yami window. Three Flash stacks give a useful damage
  // boost without letting Revealed's dodge penalty grow unchecked.
  if (yami && yami.remainingMs <= 2000 && flashStacks >= 3
      && s.usable("Jigen Kogeki")) {
    return "Jigen Kogeki";
  }

  // Refresh Yami only after its damage window has been used or has expired.
  if ((!yami || yami.remainingMs < 700) && s.usable("Yami no Maku")) {
    return "Yami no Maku";
  }

  // Tachi's three strikes grant the short-lived Ichi, Ni, and San damage
  // buffs. Use it to set up Jigen, but don't make those auras a hard
  // requirement.
  if ((!ichi || !ni || !san) && s.usable("Tachi")) return "Tachi";

  // Kettou deals strong damage, heals, and builds Flash/Revealed. Spend it
  // when sustain is needed; otherwise cap the dodge-costly Flash buildup at
  // five.
  if (me.hpPct < 55 && s.usable("Kettou")) return "Kettou";

  // Batto builds Flash/Revealed. Hisome gives +80% Dodge, Gouyuu +35%
  // damage, and Sokudo +15% Haste/Crit. Once five Flash stacks are banked,
  // avoid adding more while waiting for the Yami/Jigen window so dodge does
  // not keep falling.
  if (s.usable("Kettou") && flashStacks < 5) return "Kettou";
  if (s.usable("Tachi")) return "Tachi";

  if (flashStacks < 5 && s.usable("Auto Attack")) return "Auto Attack";
  return null;
}
