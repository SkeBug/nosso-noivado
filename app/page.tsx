import Monogram from "@/components/Monogram";
import FadeIn from "@/components/ui/FadeIn";
import { eventConfig } from "@/config/event";

export default function Home() {
  const { couple } = eventConfig;
  const firstNameA = couple.nameA.split(" ")[0];
  const firstNameB = couple.nameB.split(" ")[0];

  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <FadeIn spring>
        <Monogram size={96} variant="gold" priority className="mx-auto" />
      </FadeIn>

      <FadeIn delay={0.15}>
        <h1 className="mt-8 font-script text-4xl text-foreground sm:text-5xl">
          {firstNameA}{" "}
          <span className="font-display align-middle text-2xl sm:text-3xl">&amp;</span>{" "}
          {firstNameB}
        </h1>
      </FadeIn>

      <FadeIn delay={0.3}>
        <p className="mx-auto mt-8 max-w-xs font-display text-lg text-foreground sm:max-w-sm sm:text-xl">
          Este convite é pessoal e foi enviado apenas aos convidados.
        </p>
      </FadeIn>

      <FadeIn delay={0.45}>
        <p className="mx-auto mt-4 max-w-xs font-sans text-sm text-foreground/70 sm:max-w-sm">
          Se recebeste um link do teu convite, confirma que copiaste o endereço
          completo e corretamente.
        </p>
      </FadeIn>
    </main>
  );
}
