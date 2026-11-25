/// name: Druid Grove rep
/// desc: Farms Druid Grove reputation to rank 10 via quest 3049 Help Professor Maedoc, looping Crystal-Rock in bloodtusk. Notifies on every rank-up.

// Ported from Skua `CoreFarms.DruidGroveREP`: quest 3049 wants Geode x25
// off Crystal-Rock, each turn-in paying Druid Grove rep. `bot.quest`
// accepts, fills via the handler, and turns in by itself; the outer loop
// runs that cycle until rank 10. Temp requirement (auto-loot, no floor
// drain). Handler keyed by ItemID.

const RANK = 10;

const geode = {
  "8780": function () { bot.hunt("Crystal-Rock", "bloodtusk", 1); }, // Geode
};
bot.quest(3049, geode);

let fac = bot.rep("Druid Grove");
if (!fac.found) {
  throw new Error("no Druid Grove faction after a turn-in (quest 3049 filling?)");
}

let last = fac.rank;
while (fac.rank < RANK) {
  bot.quest(3049, geode);
  fac = bot.rep("Druid Grove");
  if (fac.rank > last) {
    bot.notify("Druid Grove rank " + fac.rank + "/" + RANK);
    last = fac.rank;
  }
}
