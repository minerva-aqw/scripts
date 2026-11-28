// Bots standard library: durable host calls shared by every bots script.
//
// Evaluated into the shared global scope before each entry, so entries use
// `bot` directly with no imports. Each call parks the script (suspend) until
// the host answers; from the script side they are ordinary synchronous calls,
// never awaited (the engine cannot suspend from an async frame). Underneath
// the driver snapshots the parked frames, runs the `ctl` round trip, then
// resumes with the result. No hand-built packets here: args map 1:1 onto
// `BotCommand` (`travel` -> gotoTown, `cell` -> moveToCell, `kill` ->
// combat mission via `kill_mission`, `quest(id).accept()` ->
// `Game.world.acceptQuest`, `quest(id).turnIn()` ->
// `Game.world.tryQuestComplete`, `quest(id).completed()` -> bare boolean
// re-run guard, `quest(id).info()/active()/ready()/done()/dailyComplete()/
// wants()` -> the step reads (one `questinfo` each),
// `quest.register(ids, opts?)` -> the tick
// sweeps them (accept, hand in when the client offers: one `quest_sweep`),
// `locate(name)` -> read-only census of the live room (no bridge traffic),
// `gatherState(id, map, qty?)` -> typed gather result, `itemState(idOrName)` /
// `ensureItemState(idOrName, qty?)` -> typed item and turn-in precondition,
// `equip(idOrName)` -> item on through the client's own toggle,
// `shopState`/`buyItemState`/`sellItemState` -> typed stock and trades,
// `pickupNow(idOrName | "*")` -> `{ok, requested, claimed, remaining, reason}`,
// `me()`/`rep`/`questValue`/`setQuestValue` -> player, faction and progression
// reads, `notify(message)` -> bare boolean once queued.
declare function park(v: unknown): unknown;

type QuestReq = { id: number; name: string; need: number; have: number };
type QuestInfo = {
  slot?: number;
  value?: number;
  active?: boolean;
  ready?: boolean;
  done?: boolean;
  once?: boolean;
  dailyComplete?: boolean;
  rewards?: number;
  turnin?: QuestReq[];
};

// First task API (`bot.plan`): a short declarative sequence. Each step names
// exactly one action; travel/waitFor/gather/attack/kill/clear/farm map onto the
// task runtime, one action per tick, with death/cutscene pauses and map-change
// cancellation. Inside `questPlan`, a farm with no `qty` targets the
// requirement's own need.
type PlanStep =
  | { travel: { map: string; cell?: string; pad?: string } }
  | { waitFor: { map: string; cell?: string } }
  | { gather: { id: number; map: string; qty?: number } }
  | { attack: { name: string; count?: number; blockers?: string | string[]; pickup?: number | number[] } }
  | { kill: MissionOpts }
  | { clear: MissionOpts }
  | { farm: FarmOpts };

type QuestPlanOpts = { choice?: number; qty?: number; turnIn?: boolean };
type QuestPlanHandlers = Record<string, PlanStep[]>;
// `bot.quest.register(ids, opts?)`: reward choice taken at each sweep, turn-in
// quantity, and the minimum spacing between sweeps in ms (0 = every call).
type QuestRegisterOpts = { choice?: number; qty?: number; interval?: number };

// One survival rule for a combat mission. Rules are checked before the class
// rotation, in order; the first matching and ready rule fires. `selfHpBelow`
// is a ratio of max HP (0–1). `targetHpBelow` is absolute HP. Aura names match
// exactly and case-insensitively. `missingAura` means our own aura is absent.
// `anim` matches a recent `ct` animation message by case-insensitive
// substring; it stays actionable for 3s after it arrives, so a boss
// telegraph fires the rule once per message. V1 has one action: cast the
// equipped potion slot (`i1`).
type CombatRule = {
  when: {
    selfHpBelow?: number;
    targetHpBelow?: number;
    selfAura?: string;
    targetAura?: string;
    missingAura?: string;
    anim?: string;
  };
  use: "potion";
  // Default 5000ms. The engine also waits for the potion's own readiness.
  cooldownMs?: number;
  // Fire at most once per fight (each farm wave is a fight).
  oncePerFight?: boolean;
};

// Phase 5 missions. `monster` is a name (case-insensitive substring, `*` for
// any), `id` pins one MonMapID, `blockers` are priority names that engage but
// never count, and `splash` chooses whether bystander deaths count.
type MissionOpts = {
  monster?: string;
  id?: number;
  count?: number;
  blockers?: string | string[];
  splash?: boolean;
  map?: string;
  cell?: string;
  pad?: string;
  // Per-fight ceiling in seconds (1-3600). Defaults to the engine's
  // `kill_timeout` (180s); a raid-scale boss that cannot die that fast names
  // its own, so one long fight is not read as a stuck mission.
  timeout?: number;
  // Drop ids to settle after a fight. The result's `pickups` classifies
  // each as `floor`, `temp`, `inventory`, or `absent`; temp/direct grants
  // are reported without needing a floor claim.
  pickup?: number | number[];
  // Mission-scoped survival rules; `questPlan` kill/farm handlers inherit
  // them because the whole step body is the mission spec.
  rules?: CombatRule[];
};
type FarmOpts = MissionOpts & {
  item?: number;
  itemName?: string;
  qty?: number;
  // Where the floor is counted: the permanent backpack (default) or the
  // separate temp inventory (Skua's `tempItem`).
  source?: "inventory" | "temp";
  // Seconds (0-86400) the held count may stay flat before the farm fails.
  // Defaults to the engine's no-progress window; zero disables the check, so
  // a sub-1% drop can take hours.
  noProgressTimeout?: number;
  // Notification sent whenever the held count rises; `{held}` and `{qty}`
  // expand to the count after the drop and the farm target. For rare drops.
  notify?: string;
};

// Registered quests (`bot.quest.register`): Skua's `RegisterQuests` idea, in
// the shape this engine can afford. A registration makes the *tick* the one
// that turns quests in and takes them again, so a farm or a hunt chain does not
// have to know when a bag filled — it only has to keep doing its job.
//
// One pass (`quest_sweep`) reads the whole registered set in one projection
// round trip and sends at most one accept or turn-in per quest that needs it.
// It never waits and never throws: the next pass reads whether the send took,
// so a refused turn-in costs a pass instead of the run.
let questRegistry: number[] = [];
let registeredAt = 0;
let registeredEvery = 2000;
let registeredChoice = -1;
let registeredQty = 1;

function registerList(ids: number | number[]): number[] {
  const list: number[] = typeof ids === "number" ? [ids] : ids || [];
  for (const id of list) {
    if (id > 0 && questRegistry.indexOf(id) < 0) questRegistry.push(id);
  }
  return list;
}

/// `bot.quest.register(ids, opts?)`: sweep these quests from now on.
/// `choice` is the reward to take (default -1 = none), `qty` is the turn-in
/// quantity (default 1, clamped by the client), and `interval` is the minimum
/// spacing between sweeps in ms (default 2000; 0 sweeps before every call).
function registerQuests(ids: number | number[], opts?: QuestRegisterOpts): number[] {
  registerList(ids);
  if (opts) {
    if (opts.choice !== undefined) registeredChoice = opts.choice;
    if (opts.qty !== undefined) registeredQty = opts.qty;
    if (opts.interval !== undefined && opts.interval >= 0) {
      registeredEvery = Math.floor(opts.interval);
    }
  }
  return questRegistry.slice();
}

/// `bot.quest.unregister(ids?)`: stop sweeping these (all when omitted).
function unregisterQuests(ids?: number | number[]): number[] {
  if (ids === undefined) {
    questRegistry = [];
    return [];
  }
  const list: number[] = typeof ids === "number" ? [ids] : ids || [];
  for (const id of list) {
    const at = questRegistry.indexOf(id);
    if (at >= 0) questRegistry.splice(at, 1);
  }
  return questRegistry.slice();
}

/// `bot.quest.registered()`: what is being swept.
function registeredList(): number[] {
  return questRegistry.slice();
}

/// `bot.quest.sweep()`: one pass now, resuming what it did per quest
/// (`{id, did}` with `did` one of `accept`/`turnin`/`filling`/`refused`/
/// `choice`/`wait`/`done`/`error`). Registered quests are swept for you, so a
/// script only calls this to sweep sooner than the interval.
function sweepQuests(): unknown {
  if (questRegistry.length === 0) return [];
  registeredAt = Date.now();
  return park({
    op: "quest_sweep",
    ids: questRegistry,
    choice: registeredChoice,
    qty: registeredQty,
  });
}

/// The tick hook: a registered set is swept before the next parked call, no
/// more often than its interval. Sweeping from here (rather than from a timer)
/// is what makes registration work at all: the script is only running while a
/// call is parked, and a sweep needs a parked frame to answer it. `dispatch`,
/// not `step`: every lib file is a global, so an ordinary name here is a name a
/// bot can shadow out from under the API.
function dispatch(v: unknown): unknown {
  if (questRegistry.length > 0 && Date.now() - registeredAt >= registeredEvery) {
    sweepQuests();
  }
  return park(v);
}

function questStep(id: number): unknown {
  return {
    accept(): unknown {
      return dispatch({ op: "quest_accept", id });
    },
    turnIn(choice?: number, qty?: number): unknown {
      return dispatch({ op: "quest_turnin", id, choice: choice ?? -1, qty: qty ?? 1 });
    },
    completed(): unknown {
      return dispatch({ op: "quest_completed", id });
    },
    // The whole projection record for one quest. `active` = in the tracker,
    // `ready` = the client's own `canTurnInQuest`, `done` = the chain slot
    // reached its value, `dailyComplete` = today's achievement is already
    // claimed, and `turnin` carries each requirement's `{id,name,need,have}`.
    info(): QuestInfo {
      return dispatch({ op: "quest_info", id }) as QuestInfo;
    },
    active(): boolean {
      return dispatch({ op: "quest_info", id })["active"] === true;
    },
    ready(): boolean {
      return dispatch({ op: "quest_info", id })["ready"] === true;
    },
    done(): boolean {
      return dispatch({ op: "quest_info", id })["done"] === true;
    },
    // True when this daily quest's achievement is already claimed today.
    // Always false for a quest without a daily field, and resets with the
    // game's daily rollover — not at local midnight.
    dailyComplete(): boolean {
      return dispatch({ op: "quest_info", id })["dailyComplete"] === true;
    },
    // Requirements still short, as `{id,name,need,have}`. Empty when the
    // gate can take the quest.
    wants(): QuestReq[] {
      const info = dispatch({ op: "quest_info", id }) as QuestInfo;
      const reqs = info.turnin || [];
      return reqs.filter(function (r) {
        return (r.have === undefined ? -1 : r.have) < r.need;
      });
    },
  };
}

// `bot.quest` is callable (the composite or a bare handle) and carries the
// registry helpers, so both `bot.quest(8300)` and `bot.quest.register(8300)`
// work off the same object.
type QuestHandle = typeof questStep & {
  register(ids: number | number[], opts?: QuestRegisterOpts): number[];
  unregister(ids?: number | number[]): number[];
  registered(): number[];
  sweep(): unknown;
};
const questCallable: QuestHandle = Object.assign(questStep, {
  register: registerQuests,
  unregister: unregisterQuests,
  registered: registeredList,
  sweep: sweepQuests,
});

const bot = {
  // `plan([...])`: run a declarative task sequence. The scheduler applies at
  // most one action per tick, pauses on death/cutscene, cancels
  // location-sensitive steps when the map changes, and resumes where it was.
  plan(steps: PlanStep[]): unknown {
    return dispatch({ op: "plan", steps });
  },
  // Explicit quest plan: accept, run each requirement's handler from the
  // projection, then turn in. Handler keys are requirement item ids. The plan
  // validates every requirement before it travels, and a handler that finishes
  // without filling its requirement fails with a typed reason instead of
  // spinning.
  questPlan(id: number, handlers: QuestPlanHandlers, opts?: QuestPlanOpts): unknown {
    return dispatch({
      op: "quest_plan",
      id,
      handlers,
      choice: opts?.choice ?? -1,
      qty: opts?.qty ?? 1,
      turn_in: opts?.turnIn === false ? false : true,
    });
  },
  // Already in `map` reads as done with no rejoin; a non-default `cell`
  // goes through the verified cell move instead of the join's blind args.
  travel(map: string, cell?: string, pad?: string): unknown {
    return dispatch({ op: "travel", map, cell: cell ?? "Enter", pad: pad ?? "Spawn" });
  },
  cell(frame: string, pad?: string): unknown {
    return dispatch({ op: "cell", frame, pad: pad ?? "Spawn" });
  },
  // `kill({ monster, count?, blockers?, splash? })`: exact-count in the
  // current cell, typed result. Blockers are priority names that engage but
  // never count. Plain drops declare their own `pickup` ids.
  kill(opts: MissionOpts): unknown {
    return dispatch({ op: "mission", spec: Object.assign({ kind: "kill" }, opts) });
  },
  // `clear({ monster?, blockers? })`: kill every matching monster in the
  // current cell. No count and no roaming.
  clear(opts?: MissionOpts): unknown {
    return dispatch({ op: "mission", spec: Object.assign({ kind: "clear" }, opts ?? {}) });
  },
  // `attack({ monster?, id?, blockers? })`: kill one instance, not a count.
  attack(opts: MissionOpts): unknown {
    return dispatch({ op: "mission", spec: Object.assign({ kind: "attack" }, opts) });
  },
  // `farm({ item | itemName, qty?, monster, map?, cell?, blockers?, source? })`:
  // repeat the explicit kill source until the held-item floor is met. With no
  // cell, the farm travels to `map` and picks the richest live cell for
  // `monster` (`"*"` picks the richest cell overall). `source` is `"inventory"`
  // (default) or `"temp"`, for drops that never enter the backpack.
  farm(opts: FarmOpts): unknown {
    return dispatch({ op: "mission", spec: Object.assign({ kind: "farm" }, opts) });
  },
  // `quest(id)` returns the step handle: `info`, `active`, `ready`, `done`,
  // `wants`, `accept`, `turnIn`, `completed`. Use `questPlan(id, handlers)`
  // for the declarative accept/fill/turn-in flow.
  quest: questCallable,
  // `locate(name)`: read-only census of the live room — the cell holding
  // the most `name` matches (same substring rule as `kill`). No
  // travel, no packets, no bridge traffic. Resumes
  // `{"found":true,"map","name","cell","count"}` (a miss resumes
  // `found:false` with the cells seen, so `if` branches work). Travel
  // first, then locate, then `cell()` + `kill()`.
  locate(name: string): unknown {
    return dispatch({ op: "locate", name });
  },
  // `gatherState(id, map, qty?, quest?)`: typed gather result. `held` is the
  // temp count or the watched quest-requirement count, `grant` names the id
  // the server actually granted (it need not equal the map item id), `source`
  // classifies where it landed, and `gathered` is true only when one of those
  // proves it.
  // Passing the active `quest` watches its requirements even when the tracker
  // has not listed the just-accepted quest yet.
  gatherState(id: number, map: string, qty?: number, quest?: number): unknown {
    return dispatch({ op: "gather_state", id, map, qty: qty ?? 1, quest: quest ?? null });
  },
  // `itemState(idOrName)`: typed read-only item query with explicit
  // presence. `presence`/`banked` are `"unknown" | "absent" | "present"`;
  // an unloaded bank reports `unknown`, never a false absence.
  itemState(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? dispatch({ op: "item_state", id: idOrName })
      : dispatch({ op: "item_state", name: idOrName });
  },
  // `ensureItemState(idOrName, qty?)`: typed turn-in precondition. Unbanks
  // when needed and resumes `{ ok, item: { presence, qty, banked },
  // requested, withdrawn }` so an unloaded bank is `unknown`.
  ensureItemState(idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? dispatch({ op: "ensure_item_state", id: idOrName, qty: want })
      : dispatch({ op: "ensure_item_state", name: idOrName, qty: want });
  },
  // `equip(idOrName)`: put an owned item on through the client's own toggle
  // (gear or usable, decided in-movie). `status` is
  // `"equipped" | "already" | "absent" | "refused" | "timeout"`; the op waits
  // for the item record's own `bEquip`, so `equipped` means the client says
  // it is on.
  equip(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? dispatch({ op: "equip", id: idOrName })
      : dispatch({ op: "equip", name: idOrName });
  },
  // `shopState(shopId, idOrName)`: typed stock query. `loaded` and `stock`
  // are `"unknown" | "absent" | "present"`; `paged`/`pages` report a stock
  // tree that had to be read in slices. A cold shop returns
  // `loaded: "absent"`, never an error.
  shopState(shopId: number, idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? dispatch({ op: "shop_state", shop_id: shopId, id: idOrName })
      : dispatch({ op: "shop_state", shop_id: shopId, name: idOrName });
  },
  // `buyItemState(shopId, idOrName, qty?)`: typed buy. `status` is
  // `"ok" | "not_stocked" | "gated" | "timeout" | "absent"`; `before`,
  // `after`, `moved`, and `limit` report the real inventory movement and the
  // client's maximum-buys gate.
  buyItemState(shopId: number, idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? dispatch({ op: "buy_item_state", shop_id: shopId, id: idOrName, qty: want })
      : dispatch({ op: "buy_item_state", shop_id: shopId, name: idOrName, qty: want });
  },
  // `sellItemState(idOrName, qty?)`: typed sell. `moved` is the clamped
  // amount that actually left the backpack; `limit` is `maximumShopSells`.
  sellItemState(idOrName: number | string, qty?: number): unknown {
    const want = qty ?? 1;
    return typeof idOrName === "number"
      ? dispatch({ op: "sell_item_state", id: idOrName, qty: want })
      : dispatch({ op: "sell_item_state", name: idOrName, qty: want });
  },
  // `me()`: read-only player snapshot — identity, wallet, vitals, location,
  // capacity. No travel, no polling, no packets. Resumes the detail object;
  // raw counts only, scripts subtract.
  me(): unknown {
    return dispatch({ op: "me" });
  },
  // `rep(idOrName)`: read-only faction query — the record for a `FactionID`
  // or an exact `sName` (the SWF's own either/or lookup). Resumes
  // `{"found":true,"id","name","rep","rank","repToRank"}` (or `found:false`
  // with zeroed fields). A miss reads `rank: 0`, so check `found` once when
  // writing a rank loop — `while (bot.rep("Good").rank < 10)` spins forever
  // on a typo'd name.
  rep(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? dispatch({ op: "rep", id: idOrName })
      : dispatch({ op: "rep", name: idOrName });
  },
  // `questValue(slot)`: read-only quest progression slot — `slot` is
  // uncapped (`strQuests`, `strQuests2`, …). Resumes the bare number (`-1`
  // when unset, the SWF's own miss signal).
  questValue(slot: number): unknown {
    return dispatch({ op: "quest_value", slot });
  },
  // `setQuestValue(slot, value)`: write a progression slot (map/cutscene
  // `qs` locks and quest/shop gates read these same local strings, so a
  // landed write unlocks immediately). `value` must be 0–35 — one base-36
  // digit per slot, anything more corrupts to `"0"`. Resumes bare
  // `true`/`false`: `false` when the server echo never lands.
  setQuestValue(slot: number, value: number): unknown {
    return dispatch({ op: "set_quest_value", slot, value });
  },
  // `align(side)`: switch alignment — `"good"`, `"evil"` or `"chaos"`
  // (Skua's `ChangeAlignment`, same `updateQuest` packet, slot 41).
  // Fire-and-forget past the paced send: no readable echo exists, so a
  // gated quest's accept is the real check. Resumes bare `true`.
  align(side: string): unknown {
    return dispatch({ op: "align", side });
  },
  // `pickupNow(idOrName)` / `pickupNow("*")`: typed one-shot pickup.
  // `{ok, requested, claimed, remaining, reason}` where `reason` is
  // `claimed`, `partial`, `timeout`, `absent`, `empty`, or `unreadable`.
  // Each id gets its own claim deadline, so one slow drop cannot consume
  // the whole budget. Mission-scoped drops use `pickup` on the mission
  // instead; this is the explicit one-shot.
  pickupNow(idOrName: number | string): unknown {
    return typeof idOrName === "number"
      ? dispatch({ op: "pickup_state", id: idOrName })
      : dispatch({ op: "pickup_state", name: idOrName });
  },
  // `notify(message)`: explicit bot notification — posts a high-visibility
  // Android notification (default sound) and logs the line. No game touch,
  // no waiting: resumes bare `true` once queued. Reserve it for milestones
  // and failures the player must act on, not routine quest completion.
  notify(message: string): unknown {
    return dispatch({ op: "notify", message });
  },
};
