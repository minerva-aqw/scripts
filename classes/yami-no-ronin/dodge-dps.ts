/// name: Yami no Ronin dodge DPS
/// desc: Guide DPS rotation: Tachi/Kettou spam, Maku upkeep for Spinning Dragon, Jigen on the fading Yami. The nuke consumes Flash/Revealed — the dodge reset.
/// autoload: Yami no Ronin

// Yami no Ronin (dodge melee). Refs follow the standard table layout
// (`actions.active`): aa Batto, a1 Tachi, a2 Yami no Maku, a3 Kettou,
// a4 Jigen Kogeki — costs and cooldowns below from the wiki, enforced by
// the engine, so this file ranks by aura state only:
// - Batto (aa, 0/2s): +8% out/hit/crit, -7% dodge (Flash/Revealed, 15s,
//   stacks to 10). Never ranked: the autos already cast it.
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
// Aura names are the wiki's; the lookup is case-insensitive, but confirm
// against the aura tracker if the nuke timing ever looks off.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Nuke window: fading Yami is max damage, and the cast consumes the
  // whole Flash/Revealed stack — the dodge reset. Same reset when the
  // buffer overflows past the edge.
  const yami = target.aura("Yami");
  const flash = me.aura("Flash");
  const stacks = flash && flash.stacks ? flash.stacks : 0;
  if ((yami && target.auraBelow("Yami", 2500)) || stacks >= 3) {
    skills.push("a4"); // Jigen Kogeki: nuke + reset
  }
  // DoT upkeep + Spinning Dragon shield; always hits (8s cd, 10s DoT).
  skills.push("a2"); // Yami no Maku
  // Guide spam: Tachi, Kettou, repeat. Kettou's heal plus the Maku shield
  // is the survival plan; the nuke above keeps the stacks cycling.
  skills.push("a1"); // Tachi
  skills.push("a3"); // Kettou
  // Fallback so the reset never waits on the window checks.
  skills.push("a4"); // Jigen Kogeki
  return skills;
}
