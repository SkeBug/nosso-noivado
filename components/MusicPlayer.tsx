"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import { eventConfig } from "@/config/event";

type MusicPlayerProps = {
  hasAudio: boolean;
};

const barHeights = [0.5, 1, 0.65, 0.85];

function EqualizerBars() {
  return (
    <span className="flex h-4 items-end gap-0.75">
      {barHeights.map((peak, index) => (
        <motion.span
          key={index}
          className="w-0.75 rounded-full bg-gold"
          initial={{ height: "25%" }}
          animate={{ height: ["25%", `${peak * 100}%`, "25%"] }}
          transition={{
            duration: 0.8 + index * 0.15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
    </span>
  );
}

function SonarRipple({ delay = 0 }: Readonly<{ delay?: number }>) {
  return (
    <motion.span
      className="absolute inset-0 rounded-full border border-gold/50"
      initial={{ scale: 1, opacity: 0.6 }}
      animate={{ scale: 1.7, opacity: 0 }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay }}
    />
  );
}

const FIRST_INTERACTION_EVENTS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

export default function MusicPlayer({ hasAudio }: Readonly<MusicPlayerProps>) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!hasAudio) return;
    const audio = audioRef.current;
    if (!audio) return;

    // Browsers block unmuted autoplay until the guest has interacted with the
    // page. Try immediately (works in some contexts, e.g. a browser profile
    // with enough prior engagement on this site), and otherwise keep retrying
    // on every tap/scroll/keypress anywhere on the page until one succeeds —
    // not just once per event type, since a single early attempt can fail for
    // transient reasons (audio not buffered yet) while a later one succeeds.
    const attemptPlay = () => {
      audio.play().then(removeListeners, () => {});
    };

    function removeListeners() {
      FIRST_INTERACTION_EVENTS.forEach((eventName) =>
        document.removeEventListener(eventName, attemptPlay),
      );
    }

    attemptPlay();

    FIRST_INTERACTION_EVENTS.forEach((eventName) =>
      document.addEventListener(eventName, attemptPlay, { passive: true }),
    );

    return removeListeners;
  }, [hasAudio]);

  if (!hasAudio) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={eventConfig.music.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar música" : "Tocar música"}
        aria-pressed={isPlaying}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-background text-gold shadow-lg transition-colors hover:bg-gold-light/40"
      >
        {isPlaying && (
          <>
            <SonarRipple />
            <SonarRipple delay={0.6} />
          </>
        )}

        <span className="relative z-10 flex h-5 w-5 items-center justify-center">
          {isPlaying ? <EqualizerBars /> : <Music size={20} />}
        </span>
      </button>
    </>
  );
}
