/// name: Eridani smoke test
/// desc: Travel to eridani, enter r3, kill 3 of anything.

// `bot` is a global from lib/bot.ts, evaluated before every entry. Calls
// are sync and durable: each one parks until the host answers. (No `await`,
// no `import`: the engine only suspends from a classic script stack.)
bot.travel("eridani");
bot.cell("r3", "Spawn");
bot.kill("*", 3);
