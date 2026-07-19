import { redirect } from "next/navigation";
import { guests } from "@/config/guests";
import InvitationPage from "@/components/InvitationPage";

export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export default async function GuestInvitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = guests.find((g) => g.slug === slug);

  if (!guest) {
    redirect("/");
  }

  return <InvitationPage guestName={guest.displayName} />;
}
