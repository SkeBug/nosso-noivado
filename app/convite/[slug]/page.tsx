import { redirect } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { guests } from "@/config/guests";
import InvitationPage from "@/components/InvitationPage";

export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const guest = guests.find((g) => g.slug === slug);

  if (!guest) return {};

  const title = `Convite especial para ${guest.displayName}`;
  const parentOpenGraph = (await parent).openGraph;

  return {
    title,
    openGraph: {
      ...parentOpenGraph,
      title,
    },
  };
}

export default async function GuestInvitePage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const guest = guests.find((g) => g.slug === slug);

  if (!guest) {
    redirect("/");
  }

  return <InvitationPage guestName={guest.displayName} />;
}
