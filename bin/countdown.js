#!/usr/bin/env node
import { startCountdown, getSecondsUntil } from "../dist/index.js";
import pc from "picocolors";

const input = process.argv[2];

if (!input) {
  console.log(pc.red("Error: Please provide seconds or a time (HH:MM)."));
  console.log("Usage: countdown <seconds>/<time>"); 
 process.exit(1);
}

let seconds;

if (input.includes(':')) {
  seconds = getSecondsUntil(input);
  console.log(pc.cyan(`Target time set: ${input}. Starting countdown...`));
} else {
  seconds = parseInt(input);
}

if (isNaN(seconds) || seconds < 0) {
  console.log(pc.red("Invalid input. Use a number or HH:MM format."));
  process.exit(1);
}

startCountdown(
  seconds,
  (time) => {
    const h = Math.floor(time / 3600).toString().padStart(2, '0');
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    process.stdout.write(pc.yellow(`\rTime remaining: ${h}:${m}:${s} `));
  },
  () => console.log(pc.green("Target reached!"))
);
