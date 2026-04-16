import pc from "picocolors";

export function startCountdown(seconds, onTick, onComplete) {
  let counter = seconds;
  const interval = setInterval(() => {
    if (onTick) onTick(counter);
    if (counter <= 0) {
      clearInterval(interval);
      console.log(pc.green("\nBlast off! 🚀")); 
      if (onComplete) onComplete();
    }
    counter--;
  }, 1000);
}

export function getSecondsUntil(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();
  const target = new Date();

  target.setHours(hours, minutes, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const diffMs = target - now; 
  return Math.floor(diffMs / 1000); 
}
