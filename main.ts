// Dad Joke Showdown — make.fun entry (u-mfnakmal-dad-joke-showdown-1d2ce3e5)
//
// One dad joke, written to entry.txt. The joke takes the idiom "bring home
// the bacon" literally: a father tells his son at the dinner table that he
// finally brought home the bacon — and Mum wants to know why it is still
// oinking. Punchline at the end, nothing to explain, easy to say out loud.
//
// The gate only accepts UTF-8 text of 1-200 characters, so the program
// validates the joke before writing it anywhere.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "Son, I finally brought home the bacon, and your mother asked why it was still oinking.";

const MAX_CHARS = 200;

function checkJoke(joke: string): void {
  if (joke.trim().length === 0) {
    throw new Error("joke must not be empty or only whitespace");
  }
  if (joke.length > MAX_CHARS) {
    throw new Error(
      `joke is ${joke.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (joke !== joke.trim()) {
    throw new Error("joke must not start or end with whitespace");
  }
  for (const ch of joke) {
    if (ch.charCodeAt(0) < 0x20 && ch !== "\t") {
      throw new Error("joke must not contain control characters");
    }
  }
  if (joke.includes("  ")) {
    throw new Error("joke must not contain doubled spaces");
  }
}

function main(): void {
  checkJoke(JOKE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, JOKE, "utf8");
  console.log(`wrote ${JOKE.length} characters to ${target}`);
}

main();
