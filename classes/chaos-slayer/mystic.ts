/// name: Chaos Slayer Mystic
/// desc: Adaptive Chaos Slayer rotation: Surge under 65%, Chaorruption for lone targets, Enigma on cooldown, Pandemonium unless Courageous is up.
/// autoload: Chaos Slayer Mystic

// Chaos Slayer (all four forms share the kit).
// Refs, costs, and cooldowns from aqwwiki.wikidot.com/chaos-slayer-berserker-0-ac
// and the class breakdown design note (aq.com/gamedesignnotes/chaosslayerbreakdown-3987):
// aa Chaos Blade (0/2.3s), a1 Chaorruption (15/5s), a2 Enigma (13/4s),
// a3 Surge (24/15s), a4 Pandemonium (30/15s).
// - Chaos Blade: 3 targets while normal, 1 while Chaorrupted. Each hit stacks
//   Chaos Affliction (+1% outgoing, 30 stacks, 12s) or, while Chaorrupted,
//   Chaos Blight (+6% outgoing, 15 stacks, 12s).
// - Chaorruption: enters Chaorrupted for 15s (+10% crit and hit, all skills
//   single-target) and deals damage. Solo mode: Blight's 6% per stack and the
//   hit/crit buff beat Affliction, and there is no AoE to lose.
// - Enigma: up to four random 10s effects on up to 6 targets. Anguished
//   (+50% damage taken) is the damage roll; Delusion and Impasse cut the
//   target's hit and dodge; Courageous is the bad roll.
// - Surge: HoT for 6s plus a 50% barrier (-65% incoming, 8s). The HoT scales
//   with Affliction and Blight stacks.
// - Pandemonium: burst to 6 targets and upgrades active Enigma effects.
//   Courageous turns into Paragon, so hold it while Courageous is up.
// - Passives: Enmity (+25% END), Ultimate Power (+10% outgoing), Absolute
//   Chaos (+35% magic res; against Chaos monsters Enigma always lands its
//   good effects and never Courageous).
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura and room state only.
function policy(s) {
  const me = s.self;
  if (!me || !me.alive) return null;

  // Surge is the only heal; take it before any damage skill once hurt.
  if (me.hpPct < 65 && s.usable("Surge")) return "Surge";

  const target = s.target;
  if (!target || !target.alive) return null;

  // Chaorruption drops every skill to one target, so enter it only when the
  // room has nothing else alive to hit. In a pack, Affliction on 3 targets
  // from Chaos Blade is worth more.
  const live = s.monsters.filter(function (m) { return m.alive; }).length;
  const corrupted = me.aura("Chaorrupted");
  if (live <= 1
      && s.usable("Chaorruption")
      && (!corrupted || corrupted.remainingMs < 3000)) {
    return "Chaorruption";
  }

  // Enigma first: its 4s cooldown and 10s effects keep Anguished rolling,
  // and Pandemonium wants fresh effects to upgrade.
  if (s.usable("Enigma")) return "Enigma";

  // Pandemonium on cooldown, except into Courageous: that upgrade is the
  // one bad outcome. Absolute Chaos blocks Courageous against Chaos mobs.
  if (s.usable("Pandemonium") && !target.aura("Courageous")) {
    return "Pandemonium";
  }

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
