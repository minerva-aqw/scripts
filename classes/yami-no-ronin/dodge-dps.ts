/// name: Yami no Ronin dodge DPS
/// desc: Dodge-safe damage rotation: nuke on the fading Yami, DoT upkeep, safe Tachi spam, Kettou only while the dodge buffer holds.

// Yami no Ronin (dodge melee). Refs follow the standard table layout
// (`actions.active`): aa Batto, a1 Tachi, a2 Yami no Maku, a3 Kettou,
// a4 Jigen Kogeki — costs and cooldowns below from the wiki, enforced by
// the engine, so this file ranks by aura state only:
// - Batto (aa, 0/2s): +8% out/hit/crit, -7% dodge (Flash/Revealed, 15s,
//   stacks to 10). Never ranked: dodge rotation wants no Flash.
// - Tachi (a1, 3/3s): always hits, never crits, no Flash. Builds Ichi
//   (+20% out, 10s), Ni (+20% physical, 8s), San (+150% crit dmg, 6s).
// - Yami no Maku (a2, 20/8s): always hits. DoT grows over 10s (5 ticks)
//   plus Spinning Dragon (target's next attack deals 0).
// - Kettou (a3, 3/3s): strong hit + heal, but +1 Flash/Revealed.
// - Jigen Kogeki (a4, 20/6s): nuke, biggest as Yami fades; consumes
//   Flash/Revealed/Ichi/Ni/San — the dodge reset.
// - Passives: Hisome (+80% dodge), Gouyuu (+35% out), Sokudo (+15%
//   haste/crit).
//
// Dodge math (Solaris): 86-87% = untouchable; each Flash is -7%, so 3
// stacks (~21%) is the buffer edge — nuke at 3 to reset. Aim 108% total.
// Aura names are the wiki's; the lookup is case-insensitive, but confirm
// against the aura tracker if the nuke timing ever looks off.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Yami DoT on the target (10s, grows). Nuke window: about to fade =
  // max Jigen damage plus the full dodge reset.
  const yami = target.aura("Yami");
  // Our Flash stacks (-7% dodge each, 15s). 3 stacks is the buffer edge.
  const flash = me.aura("Flash");
  const stacks = flash && flash.stacks ? flash.stacks : 0;
  if ((yami && target.auraBelow("Yami", 2500)) || stacks >= 3) {
    skills.push("a4"); // Jigen Kogeki: nuke + reset
  }
  // DoT upkeep + Spinning Dragon shield; always hits (8s cd, 10s DoT).
  skills.push("a2"); // Yami no Maku
  // Safe spam: always hits, never crits, no Flash — builds Ichi/Ni/San.
  skills.push("a1"); // Tachi
  // Filler damage + heal while the dodge buffer holds. Still ranked when
  // hurt even past the edge: with Jigen on cooldown a heal beats a hit.
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.6;
  if (stacks < 3 || lowHp) {
    skills.push("a3"); // Kettou
  }
  // Fallback so the reset never waits on the window checks above.
  skills.push("a4"); // Jigen Kogeki
  return skills;
}
