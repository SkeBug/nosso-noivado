"use client";

import type { ReactNode } from "react";
import { useRsvpModal } from "../RsvpModalProvider";

type RsvpTriggerButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function RsvpTriggerButton({
  children,
  className,
}: Readonly<RsvpTriggerButtonProps>) {
  const { open } = useRsvpModal();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
