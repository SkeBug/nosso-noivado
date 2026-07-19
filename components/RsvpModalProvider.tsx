"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import RsvpModal from "./ui/RsvpModal";

type RsvpModalContextValue = {
  open: () => void;
};

const RsvpModalContext = createContext<RsvpModalContextValue | null>(null);

export function useRsvpModal() {
  const context = useContext(RsvpModalContext);
  if (!context) {
    throw new Error("useRsvpModal must be used within a RsvpModalProvider");
  }
  return context;
}

export default function RsvpModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setIsOpen(true) }), []);

  return (
    <RsvpModalContext.Provider value={value}>
      {children}
      <RsvpModal open={isOpen} onClose={() => setIsOpen(false)} />
    </RsvpModalContext.Provider>
  );
}
