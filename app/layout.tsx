import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter } from "next/font/google";
import MusicPlayer from "@/components/MusicPlayer";
import { eventConfig } from "@/config/event";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Noivado — Emanuela & Evandro";
const description =
  "Venha celebrar connosco o noivado de Emanuela & Evandro, dia 22 de Agosto de 2026, em Luanda. Confirme a sua presença e reveja todos os detalhes.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://nosso-noivado-two.vercel.app",
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Emanuela & Evandro — Noivado",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Emanuela Xavier & Evandro Silva",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.jpg"],
  },
};

const audioPath = path.join(process.cwd(), "public", eventConfig.music.src);
const hasAudio = fs.existsSync(audioPath);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${cormorantGaramond.variable} ${greatVibes.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <MusicPlayer hasAudio={hasAudio} />
      </body>
    </html>
  );
}
