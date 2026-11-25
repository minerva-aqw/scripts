/// name: Blade of Awe quest probe
/// desc: Phase 0 probe for quest 2935 (Hilt). Reports the projection, then runs one declarative round.

// Phase 0 probe for the scoped-quest work: quest 2935 (Blade of Awe rep,
// "Hilt Found!" item 17485 from Skeletal Viking in castleundead).
// Run this after a stop/death/relog with the Hilt already held: the
// notify line tells whether the read sees it met (Layer 1), and the
// declarative round below shows whether the step re-farms it (Layer 2).

const ID = 2935;

function shortWants() {
  const wants = bot.quest(ID).wants();
  const parts = [];
  for (let i = 0; i < wants.length; i++) {
    parts.push(wants[i].id + " " + wants[i].have + "/" + wants[i].need);
  }
  return wants.length + ":" + parts.join(",");
}

const q = bot.quest(ID);
bot.notify(
  "probe 2935: active=" + q.active() +
  " done=" + q.done() +
  " completed=" + q.completed() +
  " ready=" + q.ready() +
  " wants=" + shortWants()
);

// One declarative round: accept, fill, turn in. With the Hilt already
// held this must report zero kills and go straight to the turn-in.
bot.quest(ID, {
  "17485": function () { bot.hunt("Skeletal Viking", "castleundead", 1, "Enter", "Left"); }, // Hilt Found!
});

bot.notify("probe 2935: round done, wants=" + shortWants());
