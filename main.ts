// Monday Morning Punchlines — entry program.
//
// Writes one joke about Monday mornings to
// <OUTPUT_DIR>/entry.txt (default OUTPUT_DIR is "/output").
//
// The entry is a single string constant. It is validated before it is
// written — the gate is: 1-200 characters counting Unicode code
// points, exactly one line, not whitespace-only, no trailing newline —
// and read back afterwards to prove the file on disk is byte-identical
// to the constant.
//
// Determinism guarantee: the output depends only on the ENTRY constant
// and OUTPUT_DIR (plus --self-check, which uses its own temp dir).
// Same constant, same bytes, every run — no timestamps, randomness,
// network, or locale dependence.
//
// Node 22, standard library only. No network, no paid keys, no secrets.

import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The joke: the weekend files a complaint against Monday morning, and
// HR schedules the hearing for Monday morning. The setup personifies
// the weekend and Monday as coworkers; the punchline is that the
// remedy for Monday morning is more Monday morning. No alarm clock,
// no coffee, no "I hate Mondays" — the twist is the whole joke.
const ENTRY =
  "The weekend filed a complaint against Monday morning. HR scheduled the hearing for Monday morning.";

const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

function validateEntry(text: string): string[] {
  const violations: string[] = [];
  const chars = [...text]; // spread counts Unicode code points, not UTF-16 units
  if (chars.length < 1 || chars.length > 200) {
    violations.push(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    violations.push("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    violations.push("entry must be a single line");
  }
  if (text.endsWith("\n") || text.endsWith("\r")) {
    violations.push("entry must not end with a trailing newline");
  }
  return violations;
}

// Reads the file back and compares it byte-for-byte with the expected
// content. Throws a distinct error for a content mismatch vs a
// byte-length mismatch so a failure says exactly what went wrong.
function verifyWritten(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error(`read-back mismatch: ${path} differs from expected content`);
  }
  if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(expected, "utf8")) {
    throw new Error(`read-back byte-length mismatch: ${path}`);
  }
}

// Validates ENTRY, writes it to <outputDir>/entry.txt, and verifies
// the file on disk is byte-identical. Returns the output file path.
// Exits the process with code 1 after printing every violation to
// stderr, so a bad entry lists all of its problems at once.
function writeEntry(outputDir: string): string {
  const violations = validateEntry(ENTRY);
  if (violations.length > 0) {
    for (const violation of violations) {
      console.error(`invalid entry: ${violation}`);
    }
    process.exit(1);
  }
  const outputFile = join(outputDir, "entry.txt");
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputFile, ENTRY, "utf8");
  verifyWritten(outputFile, ENTRY);
  return outputFile;
}

// Runs the full write-and-verify path against a fresh temp dir and
// reports PASS/FAIL, so the entry can prove itself without an
// external harness. The temp dir is always removed afterwards.
function selfCheck(): void {
  const dir = mkdtempSync(join(tmpdir(), "monday-punchlines-"));
  try {
    const outputFile = writeEntry(dir);
    const back = readFileSync(outputFile, "utf8");
    const ok = back === ENTRY && validateEntry(back).length === 0;
    console.log(ok ? "self-check: PASS" : "self-check: FAIL");
    process.exit(ok ? 0 : 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

function main(): void {
  if (process.argv.includes("--self-check")) {
    selfCheck();
    return;
  }
  const outputFile = writeEntry(OUTPUT_DIR);
  const back = readFileSync(outputFile, "utf8");
  console.log(
    `wrote ${outputFile}: ${[...back].length} chars, ${Buffer.byteLength(back, "utf8")} bytes`,
  );
}

main();
