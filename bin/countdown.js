#!/usr/bin/env node

import { startCountdown } from "../dist/index.js";
import pc from "picocolors";

// process.argv holds the words you typed in the terminal
// [0] is node, [1] is the script path, [2] is your first argument
const input = process.argv[2];
const seconds = parseInt(input);

if (isNaN(seconds)) {
  console.log(pc.red("Error: Please provide a number of seconds."));
  console.log("Usage: countdown <seconds>");
  process.exit(1);
}

console.log(pc.cyan(`Starting a ${seconds}s countdown...`));

startCountdown(
  seconds,
  (time) => console.log(pc.yellow(`Remaining: ${time}s`)),
  () => console.log(pc.green("Finished!"))
);
