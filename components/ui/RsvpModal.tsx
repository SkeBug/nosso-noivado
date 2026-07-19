"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { eventConfig } from "@/config/event";

type RsvpModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RsvpModal({ open, onClose }: Readonly<RsvpModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const { rsvp } = eventConfig;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label="Confirmação de presença"
      className="m-auto h-[85svh] w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-lg border-0 bg-background p-0 shadow-xl backdrop:bg-foreground/60"
    >
      <div className="relative flex h-full flex-col">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-1.5 text-foreground transition-colors hover:text-gold"
        >
          <X size={20} />
        </button>
        <iframe
          src={rsvp.googleFormEmbedUrl}
          className="w-full min-h-0 flex-1 border-0"
          title="Formulário de confirmação de presença"
        >
          A carregar…
        </iframe>
      </div>
    </dialog>
  );
}
