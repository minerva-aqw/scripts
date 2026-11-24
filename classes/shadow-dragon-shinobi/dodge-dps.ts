/// name: Shadow Dragon Shinobi dodge DPS
/// desc: Flaming Dragon upkeep, Shadow Kunai stacked to 10, foresight autos, Chi Heal on a hurt bar, Shadow Soul as the emergency.
/// autoload: Shadow Dragon Shinobi

// Shadow Dragon Shinobi (dodge melee, Thief). Refs, costs, and cooldowns
// from aqwwiki.wikidot.com/shadow-dragon-shinobi-class-merge; same kit as
// DragonSoul Shinobi (DShinobiX.swf decompiles to art only — effects are
// server-driven, so aura names below are the wiki's. Confirm against the
// aura tracker once the class is owned: a wrong name degrades to
// always-cast, never to a stall, but the upkeep timing wants real names).
// aa Auto Attack (0/1.5s),
// a1 Shadow Kunai (10/3s): DoT stacking to 10, 8s; each throw makes all
//   autos crit for 5s (foresight).
// a2 Chi Heal (70/10s): 4s HoT, +50% Endurance 14s, no stack. The mana sink.
// a3 Shadow Soul (0/24s): 5s channel, can't act, up to -80% damage,
//   restores mana. Emergency only — 5s of no actions is a real cost.
// a4 Flaming Dragon (30/10s): hit + 15s burn (no stack) + a free Kunai
//   stack + Spinning Dragon (target's next hit deals 0).
// Passives: +18% endurance/+15% dodge, +10% haste/+30% DoT strength,
// rank-10 attacks can proc +400% DoT for 20s.
// Mana comes from striking (more on crits, and foresight autos always crit)
// and from dodging (which also heals): Kunai + Flaming cycling sustains the
// bar, Heal spends it, Soul refills it while hiding.
//
// Contract: the engine calls `policy(s)` every tick with the live snapshot
// and fires the one skill it names (or holds on null). Readiness and mana
// are the snapshot's own answers (`s.usable`), so this function decides by
// HP and aura state only.
function policy(s) {
  const me = s.self;
  const target = s.target;

  if (!me || !me.alive) return null;

  // Chi Heal: 70 mana, 10s. HoT plus the Endurance wall. Cast hurt with
  // banked mana; never starve the DoT upkeep below to afford it — the
  // usable gate already refuses when the bar can't cover both.
  if (me.hpPct < 60 && s.usable("Chi Heal")) return "Chi Heal";

  // Shadow Soul: 0 mana, 24s. Only when Heal can't cover (broke or cooling)
  // and the bar is critical — otherwise the 5s silence costs more than the
  // reduction saves.
  if (me.hpPct < 35 && !s.usable("Chi Heal") && s.usable("Shadow Soul")) {
    return "Shadow Soul";
  }

  if (!target) return null;

  // Flaming Dragon: 30 mana, 10s. The burn lasts 15s so one cast per cycle
  // holds it, and every cast also stacks Kunai and refreshes the shield.
  // Fires before Kunai: the free stack means it never wastes a throw.
  const burn = target.aura("Flaming Dragon");
  if ((!burn || burn.remainingMs < 12000) && s.usable("Flaming Dragon")) {
    return "Flaming Dragon";
  }

  // Shadow Kunai: 10 mana, 3s. Stack the DoT to 10 and refresh before the
  // 8s fall-off; the foresight autos behind it are the plain fallback.
  const kunai = target.aura("Shadow Kunai");
  const stacks = kunai ? kunai.stacks : 0;
  if ((stacks < 10 || !kunai || kunai.remainingMs < 2500) && s.usable("Shadow Kunai")) {
    return "Shadow Kunai";
  }

  return s.usable("Auto Attack") ? "Auto Attack" : null;
}
