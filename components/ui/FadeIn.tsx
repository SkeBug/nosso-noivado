"use client";

import { motion, type Transition } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "mount" animates once on first render (e.g. Hero). "scroll" animates the
   * first time the element enters the viewport (used by sections below the fold). */
  mode?: "mount" | "scroll";
  /** Bouncier spring entrance instead of the default plain fade-up. */
  spring?: boolean;
};

function buildMotionProps(isScroll: boolean, spring: boolean, delay: number) {
  const y = isScroll ? 32 : 16;
  const initial = spring ? { opacity: 0, y, scale: 0.92 } : { opacity: 0, y };
  const animate = spring ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0 };

  const transition: Transition = spring
    ? { type: "spring", stiffness: isScroll ? 80 : 220, damping: isScroll ? 22 : 16, delay }
    : { duration: isScroll ? 1.8 : 0.8, delay, ease: isScroll ? [0.22, 1, 0.36, 1] : "easeOut" };

  return { initial, animate, transition };
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  mode = "mount",
  spring = false,
}: Readonly<FadeInProps>) {
  const isScroll = mode === "scroll";
  const { initial, animate, transition } = buildMotionProps(isScroll, spring, delay);

  if (isScroll) {
    return (
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div initial={initial} animate={animate} transition={transition} className={className}>
      {children}
    </motion.div>
  );
}
