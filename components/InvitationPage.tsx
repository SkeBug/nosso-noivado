import Hero from "./Hero";
import Countdown from "./Countdown";
import ActionButtons from "./ActionButtons";
import EventLocation from "./EventLocation";
import PhotoGallery from "./PhotoGallery";
import GuestManual from "./GuestManual";
import Footer from "./Footer";
import FadeIn from "./ui/FadeIn";
import Pulse from "./ui/Pulse";
import RsvpModalProvider from "./RsvpModalProvider";
import { eventConfig } from "@/config/event";

type InvitationPageProps = {
  guestName?: string;
};

export default function InvitationPage({
  guestName,
}: Readonly<InvitationPageProps>) {
  return (
    <RsvpModalProvider>
      <Hero guestName={guestName} />
      <Countdown />

      <section className="px-6 text-center">
        <FadeIn mode="scroll">
          <Pulse className="text-xl text-gold-light">∞</Pulse>
          <p className="mx-auto mt-4 max-w-md font-display text-2xl italic leading-relaxed text-foreground sm:text-3xl">
            {eventConfig.message}
          </p>
        </FadeIn>
      </section>

      <ActionButtons />
      <EventLocation />
      <GuestManual />
      <PhotoGallery />
      <Footer />
    </RsvpModalProvider>
  );
}
