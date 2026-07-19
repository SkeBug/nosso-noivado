"use client";

import { useCountdown } from "./hooks/useCountdown";
import CountdownDigits from "./ui/CountdownDigits";
import FadeIn from "./ui/FadeIn";

export default function Countdown() {
  const { timeLeft, isComplete } = useCountdown();

  if (isComplete) {
    return (
      <section id="contagem" className="px-6 py-14 text-center">
        <p className="font-display text-3xl italic text-foreground sm:text-4xl">
          Hoje é o grande dia! 🎉
        </p>
      </section>
    );
  }

  return (
    <section id="contagem" className="px-6 py-14 text-center">
      <FadeIn mode="scroll">
        <CountdownDigits timeLeft={timeLeft} />
      </FadeIn>
    </section>
  );
}
