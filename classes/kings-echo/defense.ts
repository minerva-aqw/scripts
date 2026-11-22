/// name: King's Echo defense
/// desc: Defensive loop: shield when exposed, Censure and Overthrown upkeep, Bolt to 8 stacks, CORVAK to reset the shield.

/* No autoload here: damage.ts owns the King's Echo claim. Pick this file
   in LIBRARY when the fight needs the wall instead of the loop. */

// King's Echo (power caster wall). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/king-s-echo, loops from solarisaqw.lol:
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
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
//
// Note: Residual Energy stacks on the caster (the battery), not the target.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const energy = me.aura("Residual Energy");
  const stacks = energy ? energy.stacks : 0;
  const resolve = me.aura("Royal Resolve");

  // King's Shield: the bubble plus Resolve whenever exposed or bleeding.
  // One shot per CORVAK — the game ignores repeats until CORVAK resets the
  // lock, so the ready gate paces it.
  if ((me.hpPct < 60 || !resolve) && s.usable("King's Shield")) {
    return "King's Shield";
  }

  if (!target) return null;

  const censure = target.aura("Censure");

  // Liberation Mace: Censure upkeep, plus Overthrown while Resolve holds.
  if (s.usable("Liberation Mace") && (!censure || censure.remainingMs < 2000)) {
    return "Liberation Mace";
  }

  // CORVAK on a full battery: re-arms the shield lock, refills 200 MP.
  if (stacks >= 8 && s.usable("CORVAK!")) return "CORVAK!";

  // Bolt: the stack builder.
  if (s.usable("Bolt of Authority") && stacks < 8) return "Bolt of Authority";

  // Mace fallback keeps both debuffs from lapsing on slow ticks.
  if (s.usable("Liberation Mace")) return "Liberation Mace";

  // CORVAK fallback so the reset never waits on the stack read.
  if (s.usable("CORVAK!")) return "CORVAK!";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
