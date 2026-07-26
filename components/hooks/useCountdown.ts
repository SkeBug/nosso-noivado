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

// Visit any page with ?preview=1 to see the "day has arrived" state (countdown
// complete, photo gallery unlocked) without waiting for the real date.
function isPreviewRequested() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("preview") === "1";
}

export function useCountdown() {
  const target = new Date(eventConfig.date.iso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const tick = () => {
      if (isPreviewRequested()) {
        setIsPreview(true);
        setIsComplete(true);
        return;
      }
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

  return { timeLeft, isComplete, isPreview };
}
