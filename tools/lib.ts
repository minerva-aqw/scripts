// Shared tree reading for the Bun tools (gen-index, check).
//
// The generated index.json must stay byte-identical to what the old Python
// generator wrote (json.dump with indent=2 and ensure_ascii), so history
// stays clean and the native verifier keeps passing without churn.

import { createHash } from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";

export const ROOT = path.resolve(import.meta.dir, "..");
export const KINDS = ["bots", "classes", "lib"] as const;
export type Kind = (typeof KINDS)[number];

export interface Entry {
  path: string;
  kind: Kind;
  name: string | null;
  desc: string | null;
  autoload: string | null;
  sha256: string;
  src: string;
}

/// `/// name:` / `/// desc:` / `/// autoload:` headers: leading metadata
/// lines only, first claim wins, parsing stops at the first other line.
export function header(src: string): {
  name: string | null;
  desc: string | null;
  autoload: string | null;
} {
  let name: string | null = null;
  let desc: string | null = null;
  let autoload: string | null = null;
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line.startsWith("///")) break;
    const body = line.slice(3).trim();
    const colon = body.indexOf(":");
    if (colon < 0) continue;
    const key = body.slice(0, colon).trim();
    const value = body.slice(colon + 1).trim();
    if (key === "name" && name === null) name = value;
    else if (key === "desc" && desc === null) desc = value;
    else if (key === "autoload" && autoload === null) autoload = value;
  }
  return { name, desc, autoload };
}

function walkTs(dir: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkTs(full, out);
    else if (entry.isFile() && entry.name.endsWith(".ts")) out.push(full);
  }
}

/// Every `.ts` under `bots/`, `classes/`, `lib/`, with headers parsed and
/// content hashed. Order is walk order; callers sort by path.
export function collectEntries(): Entry[] {
  const entries: Entry[] = [];
  for (const kind of KINDS) {
    const kindDir = path.join(ROOT, kind);
    if (!fs.existsSync(kindDir)) continue;
    const files: string[] = [];
    walkTs(kindDir, files);
    for (const full of files) {
      const raw = fs.readFileSync(full);
      const src = new TextDecoder("utf-8", { fatal: true }).decode(raw);
      const { name, desc, autoload } = header(src);
      entries.push({
        path: path.relative(ROOT, full),
        kind,
        name,
        desc,
        autoload,
        sha256: createHash("sha256").update(raw).digest("hex"),
        src,
      });
    }
  }
  return entries;
}

/// Tree-shape rules both tools enforce: required names, autoload only in
/// `classes/`, at most one claimant per game class (case-insensitive).
export function validateEntries(entries: Entry[]): string[] {
  const errors: string[] = [];
  const claimed = new Map<string, string>();
  for (const entry of entries) {
    if ((entry.kind === "bots" || entry.kind === "classes") && !entry.name) {
      errors.push(`missing /// name: header in ${entry.path}`);
    }
    if (entry.autoload) {
      if (entry.kind !== "classes") {
        errors.push(`/// autoload: outside classes/ in ${entry.path}`);
        continue;
      }
      const key = entry.autoload.trim().toLowerCase();
      const prior = claimed.get(key);
      if (prior !== undefined) {
        errors.push(
          `duplicate /// autoload: ${entry.autoload} in ${entry.path} (already claimed by ${prior})`,
        );
      } else {
        claimed.set(key, entry.path);
      }
    }
  }
  return errors;
}

/// Python `json.dump(..., indent=2, ensure_ascii=True)` compatibility: stock
/// `JSON.stringify` matches the layout, but leaves non-ASCII raw where
/// Python escapes — everything outside space-tilde (0x7F and up), with
/// surrogate pairs for astral code points).
function pyEscape(json: string): string {
  return json.replace(/[\u007f-\u{10FFFF}]/gu, (ch) => {
    const cp = ch.codePointAt(0)!;
    if (cp <= 0xffff) return "\\u" + cp.toString(16).padStart(4, "0");
    const hi = ((cp - 0x10000) >> 10) + 0xd800;
    const lo = ((cp - 0x10000) & 0x3ff) + 0xdc00;
    return (
      "\\u" + hi.toString(16).padStart(4, "0") + "\\u" + lo.toString(16).padStart(4, "0")
    );
  });
}

/// The exact `index.json` bytes: rows sorted by path, hash as version.
export function buildIndexText(entries: Entry[]): string {
  const rows = [...entries]
    .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0))
    .map((entry) => ({
      path: entry.path,
      kind: entry.kind,
      name: entry.name,
      desc: entry.desc,
      autoload: entry.autoload,
      sha256: entry.sha256,
    }));
  return pyEscape(JSON.stringify(rows, null, 2)) + "\n";
}
