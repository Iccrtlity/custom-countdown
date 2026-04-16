export function startCountdown(seconds) {
  let counter = seconds;

  const interval = setInterval(() => {
    console.log(`Countdown: ${counter}s`);
    counter--;

    if (counter < 0) {
      clearInterval(interval);
      console.log("Blast off! 🚀");
    }
  }, 1000);
}
