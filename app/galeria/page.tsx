import type { Metadata } from "next";
import Monogram from "@/components/Monogram";
import PhotoGallery from "@/components/PhotoGallery";
import Footer from "@/components/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { eventConfig } from "@/config/event";

export const metadata: Metadata = {
  title: "Galeria de Fotos — Emanuela & Evandro",
  description: "Reveja e partilhe as fotos do noivado de Emanuela & Evandro.",
  robots: { index: false, follow: false },
};

export default function GaleriaPage() {
  const firstNameA = eventConfig.couple.nameA.split(" ")[0];
  const firstNameB = eventConfig.couple.nameB.split(" ")[0];

  return (
    <main className="flex min-h-svh flex-col">
      <section className="flex flex-col items-center px-6 pt-16 pb-4 text-center">
        <FadeIn spring>
          <Monogram size={72} variant="gold" priority className="mx-auto" />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 font-display text-xl italic text-foreground sm:text-2xl">
            {firstNameA} <span className="not-italic">&amp;</span> {firstNameB}
          </p>
        </FadeIn>
      </section>

      <PhotoGallery />

      <Footer />
    </main>
  );
}
