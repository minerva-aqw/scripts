// Run gates shared by quest bots.
//
// Each gate reads one typed record, names the shortfall and ends the run. The
// message is posted as a notification because it is a failure the player has to
// act on, not a step of the run.

/// `stopRun(message)`: the one failure verb. Notifies, then throws, so a run
/// that cannot continue says the same thing in the log and on the phone.
function stopRun(message: string): never {
  bot.notify(message);
  throw new Error(message);
}

/// `requireLevel(who, level)`: ends the run when the character is below the
/// quest's level. `who` is the bot's name, used in the message.
function requireLevel(who: string, level: number): void {
  const found = (bot.me() as { level: number }).level;
  if (found >= level) return;
  stopRun(who + " needs level " + level + ", this character is level " + found);
}

/// `requireRank(who, faction, rank)`: ends the run when the faction is missing
/// or below `rank`. A name that does not resolve reads rank 0 forever, so a miss
/// is its own failure instead of a silent farm.
function requireRank(who: string, faction: string, rank: number): void {
  const record = bot.rep(faction) as { found: boolean; rank: number };
  if (!record.found) stopRun(who + ": no " + faction + " faction on this character");
  if (record.rank >= rank) return;
  stopRun(
    who +
      " needs " +
      faction +
      " rank " +
      rank +
      ", the character is rank " +
      record.rank +
      "; run " +
      faction +
      " reputation first"
  );
}

/// `openQuestSlot(who, slot, value)`: raises a quest value slot to at least
/// `value`. A room reads the slot on the entry frame and jails the avatar below
/// it, so this lands before the travel. The client's own write answers whether
/// it took, so the slot is not read back a second time.
function openQuestSlot(who: string, slot: number, value: number): void {
  if ((bot.questValue(slot) as number) >= value) return;
  if (bot.setQuestValue(slot, value) as boolean) return;
  stopRun(who + ": quest slot " + slot + " did not take " + value);
}
