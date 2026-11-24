// The Robot Vacuum's Best Excuse
// make.fun bounty: u-golden-heron-44-the-robot-vacuum-s-best-excuse-53412214
// The program writes one line — the robot vacuum's excuse for missing a spot —
// to /output/entry.txt. The sealed scorer requires UTF-8 text of 1 to 140
// characters, a single line, and not only whitespace.

import { mkdirSync, writeFileSync } from "node:fs";

// The entry: a one-line excuse, rooted in the vacuum's own world (its bumper
// and its map), funny enough for a tired homeowner to laugh at.
const ENTRY =
  "I didn't miss that spot \u2014 it filed a restraining order against my bumper, and I respect the law.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = `${OUTPUT_DIR}/entry.txt`;

function main(): void {
  // Create the output directory if it is missing. Never delete the output
  // directory itself; only write the entry file inside it.
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // The entry must be exactly one line, so strip any stray line breaks.
  const line = ENTRY.replace(/[\r\n]+/g, " ").trim();

  // Enforce the bounty gate locally: 1 to 140 characters, one line, and
  // not only whitespace. Fail loudly here rather than shipping an entry
  // the sealed scorer would mark invalid.
  const charCount = [...line].length;
  if (charCount < 1 || charCount > 140) {
    throw new Error(`Entry is ${charCount} characters; must be 1-140.`);
  }
  if (/\s{2,}/.test(line)) {
    throw new Error("Entry contains a run of whitespace; keep it one clean line.");
  }

  writeFileSync(OUTPUT_FILE, line, "utf8");
  console.log(line);
  console.log(`Characters: ${charCount} (limit 140)`);
  console.log(`Wrote ${OUTPUT_FILE}`);
}

main();
