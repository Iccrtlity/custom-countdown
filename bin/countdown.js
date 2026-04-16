#!/usr/bin/env node
import { startCountdown, getSecondsUntil } from "../dist/index.js";
import pc from "picocolors";

const args = process.argv.slice(2);
const isFullscreen = args.includes("-f");
const input = args.find(arg => arg !== "-f");

if (!input) {
  console.log(pc.red("Error: Please provide seconds or a time (HH:MM)."));
  console.log("Usage: countdown [option]  <seconds>/<time>");   
  console.log("  -f                  Enjoy the countdown in fullscreen");
process.exit(1);
}

let seconds = input.includes(':') ? getSecondsUntil(input) : parseInt(input);

function printCentered(text) {
  const cols = process.stdout.columns || 80;
  const rows = process.stdout.rows || 24;
  
  if (isFullscreen) {
    process.stdout.write("\x1Bc"); 
    const verticalPadding = "\n".repeat(Math.floor(rows / 2));
    const horizontalPadding = " ".repeat(Math.max(0, Math.floor((cols - text.length) / 2)));
    
    process.stdout.write(verticalPadding + horizontalPadding + text + verticalPadding);
  } else {
    process.stdout.write("\r" + pc.yellow(text));
  }
}

startCountdown(
  seconds,
  (time) => {
    const h = Math.floor(time / 3600).toString().padStart(2, '0');
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    
    const display = isFullscreen ? `[ ${h}:${m}:${s} ]` : `Remaining: ${h}:${m}:${s}`;
    printCentered(pc.yellow(display));
  },
  () => {
    if (isFullscreen) process.stdout.write("\x1Bc");
    console.log(pc.green("\nTarget reached! 🚀"));
  }
);
