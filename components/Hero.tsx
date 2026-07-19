import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Monogram from "./Monogram";
import FadeIn from "./ui/FadeIn";
import KenBurns from "./ui/KenBurns";
import SmoothAnchor from "./ui/SmoothAnchor";
import { eventConfig } from "@/config/event";

const coverPhotoPath = path.join(
  process.cwd(),
  "public/images/couple-cover.jpg",
);
const hasCoverPhoto = fs.existsSync(coverPhotoPath);

type HeroProps = {
  guestName?: string;
};

export default function Hero({ guestName }: Readonly<HeroProps>) {
  const { couple, date } = eventConfig;

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {hasCoverPhoto && (
        <div className="absolute inset-0 -z-10">
          <KenBurns className="absolute inset-0">
            <Image
              src="/images/couple-cover.jpg"
              alt={`${couple.nameA} & ${couple.nameB}`}
              fill
              priority
              className="object-cover opacity-35"
            />
          </KenBurns>
          <div className="absolute inset-0 bg-olive/45" />
        </div>
      )}

      <FadeIn spring className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
        {guestName ? (
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-foreground">
              Convite especial para
            </p>
            <p className="mt-2 font-display text-3xl italic text-background sm:text-4xl md:text-5xl">
              {guestName}
            </p>
          </div>
        ) : (
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-background">
            Você está convidado(a)
          </p>
        )}
      </FadeIn>

      <FadeIn
        delay={0.15}
        spring
        className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
      >
        <Monogram size={112} className="mx-auto mt-6 text-background" />
      </FadeIn>

      <FadeIn delay={0.3} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
        <p className="mt-6 font-script text-2xl text-background sm:text-4xl md:text-5xl lg:text-6xl">
          {couple.nameA} &amp; {couple.nameB}
        </p>
      </FadeIn>

      <FadeIn delay={0.45}>
        <h1 className="mt-4 font-display text-4xl italic text-foreground sm:text-5xl md:text-6xl">
          Nossa Festa de Noivado
        </h1>
      </FadeIn>

      <FadeIn delay={0.6}>
        <p className="mt-6 font-sans text-sm tracking-wide text-foreground sm:text-base">
          {date.displayLabel}
        </p>
      </FadeIn>

      <FadeIn
        delay={0.85}
        className="absolute bottom-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
      >
        <SmoothAnchor
          href="#contagem"
          aria-label="Ver próxima seção"
          className="inline-flex items-center justify-center rounded-full p-2 text-background transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          <ChevronDown className="animate-bounce" aria-hidden="true" size={28} />
        </SmoothAnchor>
      </FadeIn>
    </section>
  );
}
