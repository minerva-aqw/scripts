#!/usr/bin/env python3
"""Regenerates index.json from the scripts tree. No hand-editing the index."""

import hashlib
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KINDS = ("bots", "classes", "lib")


def header(src):
    name = None
    desc = None
    for line in src.splitlines():
        line = line.strip()
        if not line.startswith("///"):
            break
        body = line[3:].strip()
        if ":" not in body:
            continue
        key, _, value = body.partition(":")
        value = value.strip()
        if key.strip() == "name" and name is None:
            name = value
        elif key.strip() == "desc" and desc is None:
            desc = value
    return name, desc


def main():
    entries = []
    for kind in KINDS:
        kind_dir = os.path.join(ROOT, kind)
        if not os.path.isdir(kind_dir):
            continue
        for dirpath, _, filenames in os.walk(kind_dir):
            for filename in sorted(filenames):
                if not filename.endswith(".ts"):
                    continue
                full = os.path.join(dirpath, filename)
                rel = os.path.relpath(full, ROOT)
                with open(full, "rb") as handle:
                    raw = handle.read()
                src = raw.decode("utf-8")
                name, desc = header(src)
                if kind in ("bots", "classes") and not name:
                    raise SystemExit(f"missing /// name: header in {rel}")
                entries.append(
                    {
                        "path": rel,
                        "kind": kind,
                        "name": name,
                        "desc": desc,
                        "sha256": hashlib.sha256(raw).hexdigest(),
                    }
                )
    entries.sort(key=lambda entry: entry["path"])
    out = os.path.join(ROOT, "index.json")
    with open(out, "w") as handle:
        json.dump(entries, handle, indent=2)
        handle.write("\n")
    print(f"wrote {out} ({len(entries)} scripts)")


if __name__ == "__main__":
    main()
