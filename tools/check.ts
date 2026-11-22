#!/usr/bin/env bun
// Static checks for the scripts tree. Zero dependencies, Bun only.
//
// v1 rules:
// - tree shape: required `/// name:`, autoload only in classes/, unique claim
// - classic scripts: no import/export/await/async (the engine only suspends
//   from a plain synchronous call stack)
// - `bot.*` calls in bots/: known method, right arity, from a table parsed
//   out of lib/bot.ts itself so the table cannot drift from the stdlib
// - every classes/ file defines `function policy(s)`
// - index.json matches the tree (same bytes gen-index would write)

import * as fs from "node:fs";
import * as path from "node:path";
import {
  ROOT,
  buildIndexText,
  collectEntries,
  validateEntries,
  type Entry,
} from "./lib.ts";

interface Failure {
  path: string;
  line: number | null;
  message: string;
}

/// Blank comments and strings to spaces (newlines kept), so later scans see
/// code only while every offset still maps to its original line. Handles
/// template `${}` nesting and a regex-vs-division heuristic.
function stripCode(src: string): string {
  const out = src.split("");
  const blank = (i: number): void => {
    if (out[i] !== "\n") out[i] = " ";
  };
  const n = src.length;
  let i = 0;
  // Template bodies vs code: `${` leaves the body for code, and the `}`
  // closing it returns. Each stack frame counts `{}` depth inside one `${}`.
  let inTpl = false;
  const frames: number[] = [];

  // The word (or single char) before `from`, for the regex-vs-division call.
  const prevWord = (from: number): string => {
    let j = from;
    while (j >= 0 && (out[j] === " " || out[j] === "\n" || out[j] === "\t" || out[j] === "\r")) j--;
    const end = j;
    while (j >= 0 && /[\w$]/.test(out[j])) j--;
    return out.slice(j + 1, end + 1);
  };
  const REGEX_AFTER_WORD = new Set([
    "return", "typeof", "void", "delete", "throw", "in", "of",
    "instanceof", "new", "do", "else", "case", "yield", "await",
  ]);

  while (i < n) {
    const c = src[i];
    const d = src[i + 1] ?? "";
    if (inTpl) {
      if (c === "\\") {
        blank(i);
        if (i + 1 < n) blank(i + 1);
        i += 2;
        continue;
      }
      if (c === "`") {
        blank(i);
        i++;
        inTpl = false;
        continue;
      }
      if (c === "$" && d === "{") {
        blank(i);
        blank(i + 1);
        i += 2;
        frames.push(0);
        inTpl = false;
        continue;
      }
      blank(i);
      i++;
      continue;
    }
    if (c === "/" && d === "/") {
      blank(i);
      blank(i + 1);
      i += 2;
      while (i < n && src[i] !== "\n") {
        blank(i);
        i++;
      }
      continue;
    }
    if (c === "/" && d === "*") {
      blank(i);
      blank(i + 1);
      i += 2;
      while (i < n && !(src[i] === "*" && src[i + 1] === "/")) {
        blank(i);
        i++;
      }
      if (i < n) {
        blank(i);
        blank(i + 1);
        i += 2;
      }
      continue;
    }
    if (c === "'" || c === '"') {
      // Leave a marker: even an empty string is one argument, and blanking
      // the contents must not make a call look arg-less to later scans.
      out[i] = "#";
      i++;
      while (i < n && src[i] !== c && src[i] !== "\n") {
        if (src[i] === "\\") {
          blank(i);
          i++;
        }
        blank(i);
        i++;
      }
      if (i < n && src[i] === c) {
        blank(i);
        i++;
      }
      continue;
    }
    if (c === "`") {
      out[i] = "#";
      i++;
      inTpl = true;
      continue;
    }
    if (frames.length > 0 && (c === "{" || c === "}")) {
      const top = frames.length - 1;
      if (c === "{") {
        frames[top]++;
      } else if (frames[top] === 0) {
        frames.pop();
        inTpl = true;
      } else {
        frames[top]--;
      }
      i++;
      continue;
    }
    if (c === "/" && d !== "/" && d !== "*") {
      // Regex literal only where an expression can start; else division.
      const p = prevWord(i - 1);
      if (p === "" || "(,=:[!&|?{};".includes(p) || REGEX_AFTER_WORD.has(p)) {
        blank(i);
        i++;
        let inClass = false;
        while (i < n && (src[i] !== "/" || inClass) && src[i] !== "\n") {
          if (src[i] === "\\") {
            blank(i);
            i++;
          } else if (src[i] === "[") {
            inClass = true;
          } else if (src[i] === "]") {
            inClass = false;
          }
          blank(i);
          i++;
        }
        if (i < n && src[i] === "/") {
          blank(i);
          i++;
          while (i < n && /[gimsuy]/.test(src[i])) {
            blank(i);
            i++;
          }
        }
        continue;
      }
      i++;
      continue;
    }
    i++;
  }
  return out.join("");
}

function lineAt(src: string, index: number): number {
  let line = 1;
  for (let k = 0; k < index; k++) if (src[k] === "\n") line++;
  return line;
}

/// `name(min,max)` per method, parsed from lib/bot.ts signatures so the
/// checker enforces the stdlib as written. `accept`/`turnIn`/`completed`
/// are the chained calls on the object `quest(id)` returns.
function botTable(libSrc: string): Map<string, [number, number]> {
  const table = new Map<string, [number, number]>();
  for (const match of libSrc.matchAll(/^\s*(\w+)\s*\(([^)]*)\)/gm)) {
    const name = match[1];
    if (name === "park") continue;
    const raw = match[2].trim();
    if (raw === "") {
      table.set(name, [0, 0]);
      continue;
    }
    const params = raw.split(",");
    const required = params.filter((p) => {
      const head = p.split(":")[0].trim();
      return head !== "" && !head.endsWith("?") && !p.includes("=");
    }).length;
    if (!table.has(name)) table.set(name, [required, params.length]);
  }
  // The chained calls live on quest()'s return; ensure all are known even
  // if the parse above missed them.
  if (!table.has("accept")) table.set("accept", [0, 0]);
  if (!table.has("turnIn")) table.set("turnIn", [0, 2]);
  if (!table.has("completed")) table.set("completed", [0, 0]);
  table.delete("park");
  return table;
}

/// Argument count of the call whose `(` sits at `open`: top-level commas
/// plus one, zero when empty. Runs on stripped code, so strings and comments
/// cannot fake commas or parens.
function argCount(stripped: string, open: number): { count: number; close: number } {
  let depth = 0;
  let commas = 0;
  let seen = false;
  let i = open;
  for (; i < stripped.length; i++) {
    const c = stripped[i];
    if (c === "(" || c === "[" || c === "{") depth++;
    else if (c === ")" || c === "]" || c === "}") {
      depth--;
      if (depth === 0 && c === ")") break;
    } else if (c === "," && depth === 1) {
      commas++;
      seen = true;
    } else if (depth >= 1 && c !== " " && c !== "\n" && c !== "\t" && c !== "\r") {
      seen = true;
    }
  }
  return { count: seen ? commas + 1 : 0, close: i };
}

function checkBotsCalls(
  entry: Entry,
  stripped: string,
  table: Map<string, [number, number]>,
  failures: Failure[],
): void {
  const fail = (index: number, message: string): void => {
    failures.push({ path: entry.path, line: lineAt(entry.src, index), message });
  };
  const checkArity = (
    name: string,
    display: string,
    index: number,
    count: number,
  ): void => {
    const bounds = table.get(name);
    if (!bounds) {
      fail(index, `unknown bot method ${display}`);
      return;
    }
    const [min, max] = bounds;
    if (count < min || count > max) {
      const want = min === max ? `${min}` : `${min}-${max}`;
      fail(index, `${display} takes ${want} arg(s), saw ${count}`);
    }
  };

  // `const q = bot.quest(id)` aliases: the lib itself blesses this shape.
  const aliases = new Set<string>();
  for (const match of stripped.matchAll(/(?<![\w$.])(\w+)\s*=\s*bot\.quest\s*\(/g)) {
    aliases.add(match[1]);
  }

  for (const match of stripped.matchAll(/\bbot\.([A-Za-z_$][\w$]*)\s*\(/g)) {
    const name = match[1];
    const open = match.index + match[0].length - 1;
    const { count, close } = argCount(stripped, open);
    checkArity(name, `bot.${name}`, match.index, count);
    if (name === "quest" && table.has("quest")) {
      const rest = stripped.slice(close + 1);
      const chain = rest.match(/^\s*\.(accept|turnIn|completed)\s*\(/);
      if (chain) {
        const cOpen = close + 1 + chain[0].length - 1;
        const cArgs = argCount(stripped, cOpen);
        checkArity(chain[1], `bot.quest(...).${chain[1]}`, close + 1, cArgs.count);
      }
    }
  }
  for (const alias of aliases) {
    const re = new RegExp(`\\b${alias}\\.(accept|turnIn|completed)\\s*\\(`, "g");
    for (const match of stripped.matchAll(re)) {
      const open = match.index + match[0].length - 1;
      const { count } = argCount(stripped, open);
      checkArity(match[1], `${alias}.${match[1]}`, match.index, count);
    }
  }
}

function main(): void {
  const failures: Failure[] = [];
  const entries = collectEntries();
  for (const error of validateEntries(entries)) {
    failures.push({ path: "<tree>", line: null, message: error });
  }

  const libEntry = entries.find((entry) => entry.path === "lib/bot.ts");
  const table = libEntry ? botTable(libEntry.src) : new Map();

  for (const entry of entries) {
    if (entry.kind === "lib") continue;
    const stripped = stripCode(entry.src);
    for (const match of stripped.matchAll(/\b(import|export|await|async)\b/g)) {
      failures.push({
        path: entry.path,
        line: lineAt(entry.src, match.index),
        message: `\`${match[1]}\` is banned in classic scripts (durable stack only)`,
      });
    }
    if (entry.kind === "bots") {
      checkBotsCalls(entry, stripped, table, failures);
    }
    if (entry.kind === "classes" && !/function\s+policy\s*\(\s*s\s*\)/.test(stripped)) {
      failures.push({ path: entry.path, line: null, message: "classes/ file defines no policy(s)" });
    }
  }

  const indexPath = path.join(ROOT, "index.json");
  const expected = buildIndexText(entries);
  let actual: string | null = null;
  try {
    actual = fs.readFileSync(indexPath, "utf-8");
  } catch {
    actual = null;
  }
  if (actual !== expected) {
    failures.push({
      path: "index.json",
      line: null,
      message: "drifted from the tree, regenerate with: bun tools/gen-index.ts",
    });
  }

  if (failures.length > 0) {
    for (const failure of failures) {
      const where = failure.line === null ? failure.path : `${failure.path}:${failure.line}`;
      console.error(`${where}: ${failure.message}`);
    }
    process.exit(1);
  }
  const ruled = entries.filter((entry) => entry.kind !== "lib").length;
  console.log(`check ok (${ruled} entries, index.json fresh)`);
}

main();
