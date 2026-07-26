import type { ReactNode } from "react";
import {
  BookOpen,
  CheckCircle2,
  UserX,
  Clock,
  Camera,
  Heart,
  PartyPopper,
  ChevronRight,
} from "lucide-react";
import { eventConfig } from "@/config/event";
import FadeIn from "./ui/FadeIn";
import RsvpTriggerButton from "./ui/RsvpTriggerButton";

const ruleIcons: ReactNode[] = [
  <CheckCircle2 key="confirm" size={18} />,
  <UserX key="no-plus-one" size={18} />,
  <Clock key="punctual" size={18} />,
  <Camera key="photos" size={18} />,
  <Heart key="farewell" size={18} />,
  <PartyPopper key="enjoy" size={18} />,
];

const iconCircleClassName =
  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold";

const linkClassName =
  "inline-flex items-center gap-1 font-semibold text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold";

function renderRuleText(rule: string, index: number, albumUrl: string): ReactNode {
  if (index === 0) {
    return (
      <RsvpTriggerButton className={`text-left ${linkClassName}`}>
        {rule}
        <ChevronRight size={16} className="shrink-0" aria-hidden="true" />
      </RsvpTriggerButton>
    );
  }

  if (!rule.includes("{albumLink}")) return rule;

  const [before, after] = rule.split("{albumLink}");
  const hasAlbum = albumUrl !== "TODO";

  return (
    <>
      {before}
      {hasAlbum ? (
        <a href={albumUrl} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          aqui
          <ChevronRight size={14} className="shrink-0" aria-hidden="true" />
        </a>
      ) : (
        "aqui"
      )}
      {after}
    </>
  );
}

export default function GuestManual() {
  const { guestManual, photoGallery } = eventConfig;

  return (
    <section id="guia-do-convidado" className="px-6">
      <FadeIn mode="scroll">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
            <BookOpen size={26} />
          </div>

          <div className="mx-auto mt-5 h-px w-16 bg-gold/50" aria-hidden="true" />

          <h2 className="mt-6 text-center font-display text-3xl italic text-foreground sm:text-4xl">
            Manual do Convidado
          </h2>

          <ol className="mt-9 flex flex-col gap-6">
            {guestManual.rules.map((rule, index) => (
              <li key={rule} className="flex items-start gap-4">
                <span className={iconCircleClassName}>{ruleIcons[index]}</span>
                <span className="pt-1.5 font-sans text-sm font-medium text-foreground">
                  {renderRuleText(rule, index, photoGallery.driveFolderUploadUrl)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </FadeIn>
    </section>
  );
}
