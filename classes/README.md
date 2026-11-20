Combat rotations live here, one folder per class. The AUTOMATION page loads
one as the run's class (COMBAT tab shows it); START runs a bots script with
that class driving every kill. Each file defines `rotation(me, target)`,
called every tick — it returns skill refs in preference order and the engine
fires the first ready one, falling back to auto attack.
