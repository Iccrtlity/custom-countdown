#!/usr/bin/env node
import { startCountdown, getSecondsUntil } from "../dist/index.js";
import pc from "picocolors";
import figlet from "figlet";

const args = process.argv.slice(2);
const isFullscreen = args.includes("-f");
const input = args.find(arg => arg !== "-f");

if (!input) {
  console.log(pc.red("Error: Please provide seconds or a time (HH:MM)."));
  console.log("Usage: countdown [option] <seconds>/<time>");   
  console.log("  -f                  Enjoy the countdown in fullscreen");
  process.exit(1);
}

let seconds = input.includes(':') ? getSecondsUntil(input) : parseInt(input);

function getBigText(text) {
  return new Promise((resolve) => {
    figlet.text(text, { font: 'Big' }, (err, data) => {
      resolve(data || text);
    });
  });
}

startCountdown(
  seconds,
  async (time) => {
    const h = Math.floor(time / 3600).toString().padStart(2, '0');
    const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const s = (time % 60).toString().padStart(2, '0');
    const timeString = `${h}:${m}:${s}`;

    if (isFullscreen) {
      const bigText = await getBigText(timeString);
      const rows = process.stdout.rows || 24;
      const cols = process.stdout.columns || 80;
      const lines = bigText.split('\n');
      
      process.stdout.write("\x1Bc"); 
      
      const paddingTop = "\n".repeat(Math.max(0, Math.floor((rows - lines.length) / 2)));
      process.stdout.write(paddingTop);

      lines.forEach(line => {
        const paddingLeft = " ".repeat(Math.max(0, Math.floor((cols - line.length) / 2)));
        process.stdout.write(paddingLeft + pc.yellow(line) + "\n");
      });
    } else {
      process.stdout.write("\r" + pc.yellow(`Remaining: ${timeString}`));
    }
  },
  () => {
    if (isFullscreen) process.stdout.write("\x1Bc");
    console.log(pc.green("\nTarget reached! 🚀"));
  }
);
