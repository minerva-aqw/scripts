// Boss helpers: reusable multi-step kills too specific for lib/bot.ts.
//
// Evaluated into the shared global scope before every entry (like lib/bot.ts),
// so entries call `boss.escherion()` with no imports. Classic script only:
// no import/export/async/await, sync durable calls only. `bot` is resolved
// at call time, so this file loads fine regardless of stdlib order.

// Escherion (escherion/Boss) is invulnerable while its staff stands, and the
// staff respawns mid-fight. The engine handles it natively: "Staff" rides as
// a priority blocker, so the mission engages the staff whenever it is alive
// in-cell — even mid-boss-fight — without counting staff deaths. `qty`
// repeats the cycle; quest handlers pass nothing (one boss per fill).
const boss = {
  escherion(qty) {
    const want = qty == null ? 1 : qty;
    bot.hunt("Escherion", "escherion", want, "Boss", "Left", ["Staff"]);
  },
};
