import { MapPin } from "lucide-react";
import { eventConfig } from "@/config/event";
import FadeIn from "./ui/FadeIn";

export default function EventLocation() {
  const { location } = eventConfig;

  return (
    <section id="local-do-evento" className="px-6 py-10">
      <FadeIn mode="scroll">
        <div className="mx-auto max-w-md rounded-2xl border border-gold/30 bg-white/40 px-6 py-10 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
            <MapPin size={26} />
          </div>

          <div className="mx-auto mt-5 h-px w-16 bg-gold/50" aria-hidden="true" />

          <h2 className="mt-6 font-display text-3xl italic text-foreground sm:text-4xl">
            Local do Evento
          </h2>

          <p className="mt-6 font-display text-xl text-gold sm:text-2xl">
            {location.name}
          </p>
          <p className="mt-2 font-sans text-sm text-foreground/80">
            {location.address}
          </p>

          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:bg-gold/10"
          >
            <MapPin size={16} className="text-gold" />
            Ver Localização no Google Maps
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
