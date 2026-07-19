"use client";

import { MapPin, CheckCircle2, BookOpen, Camera } from "lucide-react";
import ActionButton from "./ui/ActionButton";
import FadeIn from "./ui/FadeIn";
import { useRsvpModal } from "./RsvpModalProvider";

export default function ActionButtons() {
  const { open: openRsvp } = useRsvpModal();

  return (
    <section className="px-6 py-12">
      <FadeIn mode="scroll">
        <div className="mx-auto grid max-w-md grid-cols-2 gap-4">
          <ActionButton
            icon={<MapPin size={24} />}
            label="Localização"
            href="#local-do-evento"
          />
          <ActionButton
            icon={<CheckCircle2 size={24} />}
            label="Confirmar Presença"
            onClick={openRsvp}
          />
          <ActionButton
            icon={<BookOpen size={24} />}
            label="Manual do Convidado"
            href="#guia-do-convidado"
          />
          <ActionButton
            icon={<Camera size={24} />}
            label="Álbum de Fotos"
            href="#galeria-de-fotos"
          />
        </div>
      </FadeIn>
    </section>
  );
}
