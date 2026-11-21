/// name: King's Echo defense
/// desc: Defensive loop: shield when exposed, Censure and Overthrown upkeep, Bolt to 8 stacks, CORVAK to reset the shield.

/* No autoload here: damage.ts owns the King's Echo claim. Pick this file
   in LIBRARY when the fight needs the wall instead of the loop. */

// King's Echo (power caster wall). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/king-s-echo, loops from solarisaqw.lol
// (unconfirmed live — aura names are the wiki's; confirm against the aura
// tracker if a window ever looks off):
// aa Dragon Sword (0/2.5s), a1 Liberation Mace (0/3s), a2 Bolt of Authority
// (25/3s), a3 King's Shield (50/5s), a4 CORVAK! (0/16s).
// - King's Shield (a3): 2s damage-null bubble plus Focus, and Royal
//   Resolve (+50% DR plus a HoT, 6s). One shot per CORVAK — the game
//   ignores repeats until CORVAK resets the lock.
// - Liberation Mace (a1): Censure as in damage.ts, plus Overthrown while
//   Royal Resolve holds (-8% enemy outgoing, 10s, stacks to 4).
// - Bolt of Authority (a2): same battery builder, 8 stacks.
// - CORVAK! (a4): same reset and refill — here it re-arms the shield.
// - Solaris defensive loop: 4 → 2 → 3 (x8) → 5 → repeat. Full defense
//   alternates shield and short Bolt runs: 4 → 2 → 3 (x2) → 4 → 2 →
//   3 (x2) → 5 → repeat; this file keeps the simpler loop and lets the
//   shield branch re-fire whenever Resolve is down.
//
// Contract: the engine calls `rotation(me, target)` every tick. It returns
// skill refs in preference order; the engine fires the first one that is
// ready (cooldown + mana, enforced from the live table) and falls back to
// auto attack when none is. So this function ranks by aura state only.
function rotation(me, target) {
  const skills = [];
  const lowHp = me.maxHp > 0 && me.hp < me.maxHp * 0.6;
  // Shield first: the bubble plus Resolve whenever exposed or bleeding.
  if (lowHp || !me.aura("Royal Resolve")) {
    skills.push("a3");
  }
  // Censure upkeep, plus Overthrown while Resolve holds.
  if (target.auraBelow("Censure", 2000)) {
    skills.push("a1");
  }
  // CORVAK on a full battery: re-arms the shield lock, refills 200 MP.
  const res = target.aura("Residual Energy");
  const stacks = res && res.stacks ? res.stacks : 0;
  if (stacks >= 8) {
    skills.push("a4");
  }
  // Bolt: the stack builder.
  skills.push("a2");
  // Mace fallback keeps both debuffs from lapsing on slow ticks.
  skills.push("a1");
  // CORVAK fallback so the reset never waits on the stack read.
  skills.push("a4");
  return skills;
}
