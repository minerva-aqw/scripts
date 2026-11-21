#!/usr/bin/env bun
// Regenerates index.json from the scripts tree. No hand-editing the index.

import * as fs from "node:fs";
import * as path from "node:path";
import { ROOT, buildIndexText, collectEntries, validateEntries } from "./lib.ts";

const entries = collectEntries();
const errors = validateEntries(entries);
if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exit(1);
}
const out = path.join(ROOT, "index.json");
fs.writeFileSync(out, buildIndexText(entries));
console.log(`wrote ${out} (${entries.length} scripts)`);
