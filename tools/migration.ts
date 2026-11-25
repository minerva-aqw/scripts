#!/usr/bin/env bun
// Corpus migration report: every legacy `bot.*` call still in bots/, with the
// file and line that needs porting. This is a report, not a codemod: it never
// edits a script and never fails. `bun tools/migration.ts --json` is for
// batch tooling; `--fail` turns a non-empty report into an exit code once a
// migration batch is expected to be clean.
//
// Legacy surfaces:
//   hunt(...)    roaming census shim; new code uses kill/clear/farm/plan
//   kill(...)    positional current-cell shim; new code uses kill({...})
//   gather(...)  boolean wrapper; new code uses gatherState / plan gather
//   pickup(...)  boolean wrapper; new code uses pickupNow or mission pickup
//   quest(id, handlers) composite; new code uses questPlan
//
// `bot.quest(id)` step reads are not legacy, so those are not counted; only a
// call with a second argument (the handler composite) is.

import * as fs from "node:fs";
import * as path from "node:path";
import { ROOT, collectEntries } from "./lib.ts";

interface Hit {
  path: string;
  line: number;
  api: string;
  replacement: string;
  text: string;
}

const RULES: { api: string; needle: string; replacement: string; composite?: boolean }[] = [
  { api: "hunt", needle: "bot.hunt(", replacement: "kill/clear/farm/plan" },
  { api: "kill", needle: "bot.kill(", replacement: "kill({ monster, ... })" },
  { api: "gather", needle: "bot.gather(", replacement: "gatherState / plan gather" },
  { api: "pickup", needle: "bot.pickup(", replacement: "pickupNow / mission pickup" },
  {
    api: "quest",
    needle: "bot.quest(",
    replacement: "questPlan(id, handlers)",
    composite: true,
  },
];

function lineAt(src: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) if (src[i] === "\n") line++;
  return line;
}

/// True when `bot.quest(id, ...)` has a comma before the matching close at
/// top level — the handler-composite form, not a bare step read.
function hasSecondArg(src: string, open: number): boolean {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === "(") depth++;
    else if (c === ")") {
      depth--;
      if (depth === 0) return false;
    } else if (c === "," && depth === 1) return true;
  }
  return false;
}

function hitsFor(rel: string, src: string): Hit[] {
  const out: Hit[] = [];
  for (const rule of RULES) {
    let from = 0;
    for (;;) {
      const at = src.indexOf(rule.needle, from);
      if (at < 0) break;
      from = at + rule.needle.length;
      // Skip a match inside a line comment; block comments are rare enough
      // that the checker below catches any remaining false positive.
      const lineStart = src.lastIndexOf("\n", at) + 1;
      const prefix = src.slice(lineStart, at);
      if (prefix.includes("//")) continue;
      const open = at + rule.needle.length - 1;
      if (rule.composite && !hasSecondArg(src, open)) continue;
      const lineEnd = src.indexOf("\n", at);
      out.push({
        path: rel,
        line: lineAt(src, at),
        api: rule.api,
        replacement: rule.replacement,
        text: src.slice(at, lineEnd < 0 ? src.length : lineEnd).trim(),
      });
    }
  }
  return out;
}

const entries = collectEntries();
const hits: Hit[] = [];
for (const entry of entries) {
  const abs = path.join(ROOT, entry.path);
  let src = "";
  try {
    src = fs.readFileSync(abs, "utf8");
  } catch {
    continue;
  }
  hits.push(...hitsFor(entry.path, src));
}
hits.sort((a, b) => (a.path === b.path ? a.line - b.line : a.path.localeCompare(b.path)));

const json = process.argv.includes("--json");
const fail = process.argv.includes("--fail");
if (json) {
  process.stdout.write(JSON.stringify(hits, null, 2) + "\n");
} else {
  const byApi = new Map<string, number>();
  const byFile = new Map<string, number>();
  for (const hit of hits) {
    byApi.set(hit.api, (byApi.get(hit.api) ?? 0) + 1);
    byFile.set(hit.path, (byFile.get(hit.path) ?? 0) + 1);
  }
  console.log(`legacy calls: ${hits.length} in ${byFile.size} files (${entries.length} entries)`);
  for (const rule of RULES) {
    const count = byApi.get(rule.api) ?? 0;
    if (count > 0) console.log(`  ${rule.api.padEnd(7)} ${String(count).padStart(4)}  -> ${rule.replacement}`);
  }
  if (hits.length > 0 && !fail) {
    console.log("\nfirst 25:");
    for (const hit of hits.slice(0, 25)) {
      console.log(`  ${hit.path}:${hit.line}  ${hit.api}  ${hit.text}`);
    }
    console.log("\nrun with --json for the full list, or --fail to gate a batch.");
  }
}
if (fail && hits.length > 0) process.exit(1);
