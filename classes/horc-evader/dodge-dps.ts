/// name: Horc Evader dodge DPS
/// desc: Dodge-wall upkeep, Blood Trail stacked to 4, Hunter's Call nuke on full stacks or Weak Spot, Whistle rage on a held wall.
/// autoload: Horc Evader

// Horc Evader (dodge melee pet class). Refs, costs, and cooldowns from
// aqwwiki.wikidot.com/horc-evader-ac:
// aa Evader Daggers (0/2s), a1 Blood Trail (3/3s), a2 Take Cover (0/8s),
// a3 Whistle (40/8s), a4 Hunter's Call (20/6s).
// - Evader Daggers (aa): basic hit, damage scales with Blood Trail stacks.
// - Blood Trail (a1): pet hit plus a DoT stacking to 4, -10% enemy crit,
//   10s. The engine of the class: autos hit harder per stack and the
//   Hunter's Call nuke deals damage per stack.
// - Take Cover (a2): +25% dodge and crit for 20s plus 45 mana. REMOVES
//   Blood Trail stacks from the target, so it never refreshes over a ready
//   nuke — the nuke fires first, the wall rebuilds after. 20s wall on an
//   8s cooldown, so it holds permanently when never lapsed.
// - Whistle (a3): +50% outgoing, +15% incoming, 12s (summons the Battle
//   Boar out of combat when no pet is equipped). Rage only on a held wall
//   with an HP cushion — the incoming penalty hurts without the dodge up.
// - Hunter's Call (a4): stack-scaling hit that cannot miss, +30% haste
//   12s. The nuke: full stacks, or a fading DoT, or a Weak Spot window.
// - Passives: Master Tracker (+10% hit/crit), No Sudden Movements (+10%
//   dodge), Weak Spot (Blood Trail ticks can grant +100% crit, 10s).
// - No heal in the kit (warrior mana model: mana on hit/crit and on being
//   hit, plus Take Cover's 45). Keep the potion slot ready, not the
//   rotation.
// Aura names below are the wiki's; confirm against the aura tracker if the
// nuke timing ever looks off.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  const cover = me.aura("Take Cover");
  const haste = me.aura("Hunter's Call");

  // Take Cover: 0 mana, 8 s. The dodge wall (+25% dodge/crit, 20 s) and
  // the mana engine (+45 per cast). It wipes Blood Trail, so when the wall
  // is fading under full stacks with the nuke ready, the nuke fires first
  // and the wall rebuilds on the next tick. Runs before the target check
  // so the wall (and its mana) holds between pulls.
  if ((!cover || cover.remainingMs < 3000) && s.usable("Take Cover")) {
    if (target) {
      const blood = target.aura("Blood Trail");
      const stacks = blood ? blood.stacks : 0;
      if (stacks < 4 || !s.usable("Hunter's Call")) return "Take Cover";
    } else {
      return "Take Cover";
    }
  }

  if (!target) return null;

  const blood = target.aura("Blood Trail");
  const stacks = blood ? blood.stacks : 0;
  const weak = me.aura("Weak Spot");

  // Hunter's Call: 20 mana, 6 s, cannot miss. Damage per Blood Trail
  // stack plus +30% haste. Fire on full stacks, on a Weak Spot (+100%
  // crit) with stacks banked, or before a built DoT falls off.
  if (stacks >= 4 && s.usable("Hunter's Call")) return "Hunter's Call";
  if (weak && stacks >= 2 && s.usable("Hunter's Call")) return "Hunter's Call";
  if (blood && blood.remainingMs < 1500 && stacks >= 2 && s.usable("Hunter's Call")) {
    return "Hunter's Call";
  }

  // Blood Trail: 3 mana, 3 s. Stack the DoT to 4 and keep it there — 10s
  // duration, so one refresh per cycle holds it. Dodge and autos both feed
  // off the stacks.
  if ((stacks < 4 || !blood || blood.remainingMs < 3000) && s.usable("Blood Trail")) {
    return "Blood Trail";
  }

  // Whistle: 40 mana, 8 s. Rage (+50% out, +15% in, 12 s) while the stacks
  // build, never over a ready nuke and never on a downed wall or a low bar.
  if (cover && me.hpPct > 60 && s.usable("Whistle")) return "Whistle";

  // Haste upkeep once the DoT is stacked: keeps attack speed (and the mana
  // flow behind it) up while the nuke cools down.
  if ((!haste || haste.remainingMs < 2000) && s.usable("Hunter's Call")) {
    return "Hunter's Call";
  }

  if (s.usable("Blood Trail")) return "Blood Trail";

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
