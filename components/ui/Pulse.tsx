"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PulseProps = {
  children: ReactNode;
  className?: string;
};

export default function Pulse({ children, className }: Readonly<PulseProps>) {
  return (
    <motion.span
      animate={{ opacity: [0.6, 1, 0.6], y: [0, -3, 0] }}
      transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
      className={className}
      aria-hidden="true"
    >
      {children}
    </motion.span>
  );
}
