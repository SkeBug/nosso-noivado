"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type PhotoLightboxProps = {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const SWIPE_THRESHOLD = 40;

export default function PhotoLightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
}: Readonly<PhotoLightboxProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      aria-label="Foto ampliada"
      className="m-auto h-[90svh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-lg border-0 bg-transparent p-0 backdrop:bg-foreground/85"
    >
      <div
        className="relative flex h-full items-center justify-center"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const delta = event.changedTouches[0].clientX - touchStartX.current;
          if (delta > SWIPE_THRESHOLD) onPrev();
          if (delta < -SWIPE_THRESHOLD) onNext();
          touchStartX.current = null;
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 z-10 rounded-full bg-background/85 p-2 text-foreground transition-colors hover:text-gold"
        >
          <X size={20} />
        </button>

        <button
          type="button"
          onClick={onPrev}
          aria-label="Foto anterior"
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/85 p-2 text-foreground transition-colors hover:text-gold"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={onNext}
          aria-label="Próxima foto"
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/85 p-2 text-foreground transition-colors hover:text-gold"
        >
          <ChevronRight size={22} />
        </button>

        {/* Drive thumbnail hosts vary, so a plain img avoids next/image remote-pattern mismatches */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="max-h-full max-w-full object-contain" />
      </div>
    </dialog>
  );
}
