// Monster-cell lookup shared by bots scripts.
//
// `bot.locate` is a read-only census of the room the avatar is already in, so
// callers travel first. The cache key includes the map: cell names belong to
// one room and must not leak into another. An explicit cell is trusted and
// cached, for chapters that already name the screen.

const monsterCells: Record<string, string> = {};

/// `findMonsterCell(name, map, cell?)`: the cell holding the most live matches
/// for `name` in `map`. Throws with the cells that were seen when the monster
/// is absent, so a bad name or an unfinished travel fails clearly. `map` is
/// the room the caller just joined; it keys the cache and the error.
function findMonsterCell(name: string, map: string, cell?: string): string {
  const key = map + "|" + name;
  if (cell) {
    monsterCells[key] = cell;
    return cell;
  }
  const cached = monsterCells[key];
  if (cached) return cached;
  const spot = bot.locate(name) as {
    found: boolean;
    cell?: string;
    cells?: string[];
  };
  if (!spot.found || !spot.cell) {
    const seen = spot.cells?.length ? " (cells: " + spot.cells.join(", ") + ")" : "";
    throw new Error(name + " not found in " + map + seen);
  }
  monsterCells[key] = spot.cell;
  return spot.cell;
}
