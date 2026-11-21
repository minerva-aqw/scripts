/// name: StoneCrusher support DPS
/// desc: Earth support rotation: shield when exposed, nukes inside Magnitude windows, Stalagmite upkeep, Echoing Earth on cooldown.
/// autoload: StoneCrusher

// StoneCrusher (support defensive caster, same kit as the Merge). Refs,
// costs, and cooldowns from aqwwiki.wikidot.com/stonecrusher-ac
// (unconfirmed live — aura names are the wiki's; confirm against the aura
// tracker if a window ever looks off):
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
// combo — "just spam". This file is that spam, ordered: shield, Magnitude
// windows, upkeep, cooldowns. Getting one: /join gaiazor, Ravinos
// Brightglade — merge Earth's Song Token + Shaman armor (50k gold each);
// needs rank 10 Brightoak, Mythsong, and Arcangrove through the
// /rivensylth storyline. (Infinity Titan is a no-farm duplicate.)
// Enhancements: Wizard class for damage, Fighter for heal; Anima helm to
// heal, Pneuma to damage; Absolution cape to heal, Vainglory to damage;
// Valiance, Arcana's Concerto, or Awe Blast weapon. Potions: Malevolent,
// Sage, or Phonor damage.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Survival first: Shielded plus its HoT whenever exposed or bleeding.
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.5;
  if (lowHp || !me.aura("Shielded")) {
    skills.push("a3");
  }
  // Magnitude window: +275% magic out for 2s. Nuke inside it when it lands.
  if (me.aura("Magnitude")) {
    skills.push("a4");
    skills.push("a1");
  }
  // Endless Fissure: 300% plus the growing 30s Aftershock. Fire whenever
  // the engine says ready.
  skills.push("a4");
  // Stalagmite: Bruised upkeep plus a Magnitude roll every 6s.
  skills.push("a1");
  // Echoing Earth: haste, crit, and mana flow. 18s apart, always worth it.
  skills.push("a2");
  // Shield fallback so defense never waits on the hurt check.
  skills.push("a3");
  return skills;
}
