// Say What Actually Broke — make.fun entry (program/v1).
// Writes one single-line software error message to /output/entry.txt.
// The line names the real failure (an unsaved file lost to a mid-save
// crash), tells the user what to do next (check the autosave folder),
// and lands the joke in one read. Deterministic: fixed text, no wall
// clock, no randomness, no network, no model calls.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Your file wasn't saved — the app crashed mid-save and took your last hour with it. Check the autosave folder, then press Ctrl+S like it owes you money.";

// The gate allows 1 to 200 characters; keep the line plus its trailing
// newline comfortably inside that limit.
if (LINE.length > 199) {
  throw new Error(`entry line is ${LINE.length} characters, over the limit`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read it back and confirm the file holds exactly the line we wrote.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE + "\n") {
  throw new Error("entry.txt does not match the entry line");
}
