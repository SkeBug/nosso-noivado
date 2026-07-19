"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type KenBurnsProps = {
  children: ReactNode;
  className?: string;
};

export default function KenBurns({ children, className }: Readonly<KenBurnsProps>) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1.08 }}
      transition={{
        duration: 12,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
