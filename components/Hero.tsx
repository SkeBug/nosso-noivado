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
  guestPlural?: boolean;
};

export default function Hero({
  guestName,
  guestPlural = false,
}: Readonly<HeroProps>) {
  const { couple, date, invitation } = eventConfig;
  const firstNameA = couple.nameA.split(" ")[0];
  const firstNameB = couple.nameB.split(" ")[0];
  const celebration = guestPlural
    ? invitation.celebration.plural
    : invitation.celebration.singular;

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {hasCoverPhoto && (
        <div className="absolute inset-0 -z-10">
          <KenBurns className="absolute inset-0">
            <Image
              src="/images/couple-cover.jpg"
              alt={`${firstNameA} & ${firstNameB}`}
              fill
              priority
              className="object-cover opacity-35"
            />
          </KenBurns>
          <div className="absolute inset-0 bg-olive/60" />
        </div>
      )}

      <FadeIn spring className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
        <Monogram size={92} variant="white" priority className="mx-auto" />
      </FadeIn>

      <FadeIn delay={0.15} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <p className="mx-auto mt-5 max-w-[20rem] font-display text-lg leading-relaxed text-background/95 sm:max-w-sm sm:text-xl">
          {invitation.blessing}
        </p>
      </FadeIn>

      <FadeIn delay={0.3} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
        <h1 className="mt-8 font-script text-5xl text-background sm:text-6xl md:text-7xl lg:text-8xl">
          {firstNameA} &amp; {firstNameB}
        </h1>
      </FadeIn>

      <FadeIn delay={0.45} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <p className="mt-5 font-display text-lg text-background/95 sm:text-xl">
          {invitation.honor}
        </p>
      </FadeIn>

      <FadeIn delay={0.55}>
        <div className="mx-auto mt-4 h-px w-12 bg-gold-light/70" aria-hidden="true" />
      </FadeIn>

      <FadeIn delay={0.65} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
        <p className="mt-4 font-display text-3xl font-semibold text-background sm:text-4xl">
          {guestName ?? invitation.genericGuestLabel}
        </p>
      </FadeIn>

      <FadeIn delay={0.8} className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <p className="mt-5 font-display text-lg text-background/95 sm:text-xl">
          {celebration}
        </p>
      </FadeIn>

      <FadeIn delay={0.95}>
        <p className="mt-6 font-sans text-sm tracking-wide text-foreground sm:text-base">
          {date.displayLabel}
        </p>
      </FadeIn>

      <FadeIn
        delay={1.1}
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
