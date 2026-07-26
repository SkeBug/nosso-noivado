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
// complete, photo gallery unlocked) without waiting for the real date. The raw
// value after `preview=` is returned as `previewMode` — PhotoGallery reads it to
// force a specific gallery state (loading/empty/error/populated) for QA/demo use.
function getPreviewMode(): string | null {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("preview");
}

export function useCountdown() {
  const target = new Date(eventConfig.date.iso).getTime();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [previewMode, setPreviewMode] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const preview = getPreviewMode();
      if (preview !== null) {
        setPreviewMode(preview);
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

  return { timeLeft, isComplete, isPreview: previewMode !== null, previewMode };
}
