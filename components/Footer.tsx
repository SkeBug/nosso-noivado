import { eventConfig } from "@/config/event";
import FadeIn from "./ui/FadeIn";
import Pulse from "./ui/Pulse";
import Monogram from "./Monogram";

export default function Footer() {
  const firstNameA = eventConfig.couple.nameA.split(" ")[0];
  const firstNameB = eventConfig.couple.nameB.split(" ")[0];

  return (
    <footer className="px-6 py-10 text-center">
      <FadeIn mode="scroll">
        <Pulse>
          <Monogram size={40} variant="gold" className="mx-auto" />
        </Pulse>
        <p className="mt-3 font-display text-lg italic text-foreground">
          Com amor, {firstNameA} <span className="not-italic">&amp;</span> {firstNameB}
        </p>
        <p className="mt-2 font-sans text-xs text-olive">
          © {new Date().getFullYear()}
        </p>
      </FadeIn>
    </footer>
  );
}
