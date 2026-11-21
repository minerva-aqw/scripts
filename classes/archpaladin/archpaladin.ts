/// name: ArchPaladin solo support
/// desc: Seal-to-Eden combo rotation: Hymn upkeep and heals, Commandment shred stacks, Eden inside the fading seal.
/// autoload: ArchPaladin

// ArchPaladin (solo/support full hybrid; 0 AC and AC share the kit). Refs,
// costs, and cooldowns from aqwwiki.wikidot.com/archpaladin-0-ac,
// combo from solarisaqw.lol (unconfirmed live — aura names are the wiki's;
// confirm against the aura tracker if a window ever looks off):
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
// Solaris combo: spam Hymn and Seal, Eden as the seal runs out, every
// buff and debuff up at all times. Getting one: the /darkthronehub chain
// (rank 10 Good, rank 8 SpellCrafting, 13 Lords of Chaos; members also
// rank 10 Healer and Warrior). Enhancements: Luck class; Valiance, Praxis,
// Awe Blast, or Arcana's Concerto weapon; Forge helm; Lament, Vainglory,
// or Penitence cape. Potions: Fate Tonic, Battle Elixir, Felicitous
// Philtre.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  // Heal first: 380% party heal that always crits, plus END/defense.
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.6;
  if (lowHp) {
    skills.push("a2");
  }
  // Seal-to-Eden combo: Eden doubles inside the seal and leaves Broken
  // Seal behind. Let the seal soak, then break it as it runs out.
  if (target.aura("Righteous Seal")) {
    if (target.auraBelow("Righteous Seal", 2500)) {
      skills.push("a4");
    }
  } else {
    skills.push("a3");
  }
  // Hymn upkeep: +20% END and defense for 15s. Never let it lapse.
  if (!me.aura("Hymn of Light")) {
    skills.push("a2");
  }
  // Commandment upkeep: the shred stacks fall off after 10s.
  if (target.auraBelow("Divine", 3000)) {
    skills.push("a1");
  }
  // Fallbacks keep the Solaris spam order on slow ticks.
  skills.push("a1");
  skills.push("a2");
  skills.push("a3");
  skills.push("a4");
  return skills;
}
