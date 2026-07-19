"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "@/config/event";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function useCountdown() {
  const target = new Date(eventConfig.date.iso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const tick = () => {
      if (Date.now() >= target) {
        setIsComplete(true);
        return;
      }
      setTimeLeft(getTimeLeft(target));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return { timeLeft, isComplete };
}
