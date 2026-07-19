"use client";

import type { TimeLeft } from "../hooks/useCountdown";
import Pulse from "./Pulse";

type CountdownDigitsProps = {
  timeLeft: TimeLeft | null;
  className?: string;
};

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
];

export default function CountdownDigits({
  timeLeft,
  className,
}: Readonly<CountdownDigitsProps>) {
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-6 ${className ?? ""}`}>
      {units.map((unit, index) => (
        <div key={unit.key} className="flex items-center gap-2 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="font-display text-4xl tabular-nums text-gold sm:text-5xl">
              {timeLeft ? String(timeLeft[unit.key]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-olive sm:text-xs">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <Pulse className="mb-4 font-display text-xl text-gold-light sm:text-3xl">∞</Pulse>
          )}
        </div>
      ))}
    </div>
  );
}
