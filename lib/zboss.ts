// Boss helpers: reusable multi-step kills too specific for lib/bot.ts.
//
// Evaluated into the shared global scope before every entry (like lib/bot.ts),
// so entries call `boss.escherion()` with no imports. Classic script only:
// no import/export/async/await, sync durable calls only. `bot` is resolved
// at call time, so this file loads fine regardless of stdlib order.

// Escherion (escherion/Boss) is invulnerable while its staff stands, and the
// staff respawns mid-fight. Each cycle pins Boss/Left, drops the staff first
// (guarded by locate so an empty room skips straight to the boss), then kills
// one Escherion. `qty` repeats the cycle; quest handlers pass nothing (one
// boss per fill) and re-run the entry if the staff came back mid-kill.
const boss = {
  escherion(qty) {
    const want = qty == null ? 1 : qty;
    bot.travel("escherion", "Boss", "Left");
    for (let i = 0; i < want; i++) {
      const staff = bot.locate("Staff");
      if (staff && staff.found) {
        bot.kill("Staff", 1);
      }
      bot.hunt("Escherion", "escherion", 1, "Boss", "Left");
    }
  },
};
