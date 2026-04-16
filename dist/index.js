import pc from "picocolors";

export function startCountdown(seconds, onTick, onComplete) {
  let counter = seconds;

  const interval = setInterval(() => {
    if (onTick) onTick(counter);

    if (counter <= 0) {
      clearInterval(interval);
      console.log(pc.green("Blast off! 🚀")); 
      if (onComplete) onComplete();
    }
    
    counter--;
  }, 1000);
}
