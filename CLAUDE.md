# Digital Engagement Invitation — "Infinito Amor" (E&E)

> Spec Driven Development (SDD) doc — ready to use as context for Claude Code.
> Mobile-first, single-page site for a digital engagement party invitation.

---

## 1. Overview

**Couple:** Emanuela Xavier & Evandro Silva (E&E)
**Event:** Engagement party
**Date:** August 22, 2026, 5:00 PM
**Location:** Urbanização Nova Vida, Rua 70, past Complexo Escolar Frei João Domingos
**Maps link:** https://maps.app.goo.gl/W1YTAZn3iJA9JLs87

**Visual style:** Elegant/classic with a tropical accent. Physical event decor is tropical,
with an emphasis on dark green/olive, so the site palette pairs gold with dark olive green,
serif typography, and a beige/white background. Decorative motifs: fine-line tropical foliage
(palm/monstera style) and the infinity symbol (∞) as a recurring graphic element — dividers,
countdown, favicon.

**No backend/database required** — fully static site, all editable content centralized in config
files.

---

## 2. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion (fade-ins, scroll reveals, smooth transitions) |
| Icons | lucide-react |
| Fonts | Google Fonts — display serif (`Cormorant Garamond` or `Playfair Display`) + supporting sans-serif (`Inter` or `Jost`) for body text |
| Audio | Native HTML5 `<audio>` + custom player component |
| Deploy | Vercel |
| Analytics (optional) | Vercel Analytics |

---

## 3. Folder Structure

```
convite-noivado/
├── app/
│   ├── layout.tsx          # metadata, fonts, OG tags
│   ├── page.tsx            # generic invitation page
│   ├── convite/
│   │   └── [slug]/
│   │       └── page.tsx    # per-guest personalized page (SSG)
│   └── globals.css
├── components/
│   ├── Hero.tsx             # E&E monogram, headline, date, cover photo
│   ├── Countdown.tsx        # countdown to the event
│   ├── Monogram.tsx         # interlaced E&E SVG logo
│   ├── ActionButtons.tsx    # grid of the 4 action buttons
│   ├── GuestManual.tsx      # arrival time + rules
│   ├── MusicPlayer.tsx      # floating background music button
│   ├── Footer.tsx
│   └── ui/                  # reusable buttons, cards, dividers
├── config/
│   ├── event.ts             # all editable event content (see section 6)
│   └── guests.ts            # closed guest list + slugs (see section 5.3)
├── public/
│   ├── audio/so-easy.mp3    # TODO: couple to provide file
│   ├── images/
│   │   ├── couple-cover.jpg  # TODO: couple to provide
│   │   └── og-image.jpg      # WhatsApp/social preview image — TODO
│   └── favicon.ico
└── README.md
```

---

## 4. Page Structure (section order)

1. **Hero** — E&E monogram, "Infinito Amor" headline, full names, date, cover photo (optional),
   scroll indicator.
2. **Countdown** — days/hours/min/sec until August 22, using the ∞ symbol as a decorative
   element between numbers.
3. **Couple message** (optional) — short text inviting guests to the celebration.
4. **Action buttons** (2×2 grid on mobile):
   - 📍 Location → opens the Google Maps link
   - ✅ RSVP → opens the embedded Google Form
   - 📖 Guest Manual → smooth-scrolls to the section (or opens a modal)
   - 📸 Photo Album → direct link, opens the shared album in a new tab
5. **Guest Manual** — arrival time + rules list.
6. **Footer** — "With love, E&E" signature, infinity icon, year.
7. **Floating music button** — fixed position (bottom corner), play/pause toggle. No autoplay
   with sound (browsers block it) — the guest taps to start playback.

---

## 5. Key Components — Implementation Notes

### 5.1 E&E Monogram
Custom SVG with interlaced initials in gold (`#C9A24B`), inside a circular or ornamental
outline. Used large in the Hero and small as favicon/share icon. Generate as vector SVG, not
a raster image.

### 5.2 Countdown
Client component (`"use client"`), updates every second via `useEffect` + `setInterval`.
Target date comes from `config/event.ts`. At zero, swap to "Today's the day! 🎉".

### 5.3 Guest Personalization (Predefined List)
Common local practice: invitations addressed by name (e.g. "Invitation for Sandro & Wife").

- Dynamic route: `app/convite/[slug]/page.tsx`
- Guest list lives in `config/guests.ts`, each entry has `slug` + `displayName`:

```ts
// config/guests.ts
export const guests = [
  { slug: "sandro-e-esposa", displayName: "Sandro & Esposa" },
  { slug: "familia-silva", displayName: "Família Silva" },
  // TODO: add all guests here
] as const;
```

- `generateStaticParams()` in `[slug]/page.tsx` generates all pages at build time (SSG — no
  server cost):

```ts
export async function generateStaticParams() {
  return guests.map((g) => ({ slug: g.slug }));
}
```

- Final per-guest link: `https://<site>.vercel.app/convite/sandro-e-esposa`
- Slug format: lowercase, no accents, spaces → `-`.
- Generic link (`/`) stays available with a neutral greeting ("You're invited") for cases with
  no individual link.
- Invalid/unknown slug → redirect to the generic page (`redirect("/")`).
- Adding a guest requires a new commit + deploy (automatic via Vercel Git push, ~1 min) — fine
  for a closed guest list.

### 5.4 RSVP (Embedded Google Form)
Embedded via `<iframe>` directly in the page (not a redirect):

```html
<iframe
  src="https://docs.google.com/forms/d/e/1FAIpQLSeoGWx9F0ZperwNWv1QatC_3zziTjEmqONPHvdMrQOjSaIOlQ/viewform?embedded=true"
  width="640" height="762" frameborder="0" marginheight="0" marginwidth="0">
  Loading…
</iframe>
```

- On mobile, this can cause double scroll (page scroll + form scroll) — adjust iframe height
  responsively and test on a real device.
- Google Forms' own styling is fixed (won't fully match the site's gold/serif theme) — accepted
  trade-off.

### 5.5 Photo Gallery

Dynamic in-site gallery (not just a link) — fetches and displays photos from a Google Drive
folder. Two roles for that folder:


Guest uploads: Google Drive has no native "file request" feature (removed in 2023) — the
practical approach for a closed guest list is a shared folder set to "Anyone with the link →
Editor". Guests upload directly through the Drive folder UI/app (requires being signed into
any Google account, but not necessarily an invite to a specific account — the link itself
grants access). Accepted trade-off: guests can also see each other's uploads in that folder,
which is fine for a shared party album.
Display: the same folder (photographer's shots can go in the same folder, or a second
folder merged client-side) is read via the Drive API v3 directly from the client:


GET https://www.googleapis.com/drive/v3/files
  ?q='FOLDER_ID'+in+parents+and+mimeType+contains+'image/'
  &key=API_KEY
  &fields=files(id,name,thumbnailLink)


API key restricted by HTTP referrer (only works from the deployed domain) — set as
NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY env var (client-exposed by necessity, referrer restriction
is the actual security boundary, not secrecy).
Render as a responsive grid using thumbnailLink (append =s400 for a reasonable size),
with a lightbox/modal on click for the full-size view.
Photographer's photos and guest photos can live in the same folder, or two folders merged
client-side into one gallery — either way, no distinction needed in the UI.
No pagination needed at expected volume; revisit with pageSize/pageToken if the album
grows large.

### 5.6 Music Player
Custom floating circular button, music-note icon, "wave" animation while playing. Own audio file
(`public/audio/so-easy.mp3`), controlled via `useRef<HTMLAudioElement>` + local state in
`MusicPlayer.tsx`. No autoplay with sound; the guest taps to start.

### 5.7 Guest Manual
No dress code section. Arrival time reuses the event start time (`eventConfig.date`). Rules list
comes from `config/event.ts` (see section 6) — render as a numbered/icon list, keeping the
emphatic tone of the original text. The photo rule interpolates the album link inline.

---

## 6. Central Event Config (`config/event.ts`)

```ts
export const eventConfig = {
  couple: {
    nameA: "Emanuela Xavier",
    nameB: "Evandro Silva",
    initials: "E&E",
  },
  date: {
    iso: "2026-08-22T17:00:00-01:00", // Luanda, UTC-1
    displayLabel: "22 de Agosto de 2026, às 17h",
  },
  location: {
    name: "Urbanização Nova Vida",
    address: "Rua 70, depois do Complexo Escolar Frei João Domingos",
    mapsUrl: "https://maps.app.goo.gl/W1YTAZn3iJA9JLs87",
  },
  rsvp: {
    googleFormEmbedUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeoGWx9F0ZperwNWv1QatC_3zziTjEmqONPHvdMrQOjSaIOlQ/viewform?embedded=true",
    embedWidth: 640,
    embedHeight: 762, // adjust for mobile (see section 5.4)
  },
  photoAlbum: {
    albumUrl: "TODO", // Drive/Google Photos link — used by the direct button AND rule 4 below
  },
  guestManual: {
    arrivalTime: "same-as-event", // reuse eventConfig.date.displayLabel in the UI
    rules: [
      "CONFIRME SUA PRESENÇA",
      "CONVIDADO NÃO CONVIDA!",
      "NÃO SE ATRASE. SEJA PONTUAL.",
      "TIRE MUITAS FOTOS E GRAVE VÍDEOS! Envie e veja todas as fotos do dia {albumLink}.", // {albumLink} interpolated with photoAlbum.albumUrl
      "NÃO SAIA SEM SE DESPEDIR DOS NOIVOS!",
      "APROVEITEM BASTANTE!", // TODO: confirm spelling with the couple (original text had "APROVEITI")
    ],
  },
  music: {
    trackTitle: "So Easy (To Fall In Love)",
    artist: "Olivia Dean",
    src: "/audio/so-easy.mp3", // TODO: couple to provide file
  },
};
```

Keeping everything centralized here means filling in the remaining `TODO`s doesn't require
touching any component.

---

## 7. Design System

| Token | Value |
|---|---|
| Primary color (gold) | `#C9A24B` |
| Secondary color (dark olive green) | `#4A4F2F` |
| Tertiary color (light gold, support) | `#E8D5A8` |
| Background | `#FAF6EF` (light beige) / `#FFFFFF` |
| Main text | `#2B2620` (near-black, warm) |
| Display font | Cormorant Garamond / Playfair Display |
| Body font | Inter / Jost |
| Spacing | Generous, breathing room between sections (mobile-first: ample vertical padding) |
| Decorative elements | Fine gold lines, ∞ symbol, tropical foliage line art (palm/monstera) in gold or olive, alternating by section |

---

## 8. Non-Functional Requirements

- **Mobile-first is mandatory** — most guests will open the link from WhatsApp on their phone.
- **Open Graph / meta tags** — title, description, and preview image configured in `layout.tsx`
  so the link looks good when shared on WhatsApp.
- **Performance** — optimized images (`next/image`), lazy loading, mobile Lighthouse score > 90.
- **Basic accessibility** — adequate contrast, labeled buttons/icons.
- **No login/DB needed** — fully static, simple Vercel deploy.
- Consider setting the site to non-indexed (`robots.txt` blocking crawlers, no active SEO) given
  the self-hosted copyrighted audio track and personal guest content.

---

## 9. Open Items (Couple to Provide)

- [ ] Full guest list (names for individual invites, e.g. "Sandro & Esposa", "Família Silva") →
      populates `config/guests.ts`
- [ ] Shared photo album link (Drive/Google Photos) → `photoAlbum.albumUrl`
- [ ] Audio file for background music (mp3, ideally <5MB) → `public/audio/so-easy.mp3`
- [ ] Couple photos → `public/images/couple-cover.jpg` and `public/images/og-image.jpg` (drop
      files in with those exact names, no code changes needed)
- [ ] Confirm spelling of "APROVEITEM BASTANTE!" (rule 6 — original text had "APROVEITI")
- [ ] (Optional, outside the site) Printed QR code of the album link for venue signage/table cards

---

## 10. Next Steps

1. Fill in the remaining `TODO`s in `config/event.ts` and `config/guests.ts`.
2. Open the project with Claude Code, using this `.md` as initial context (`CONTEXT.md`).
3. Scaffold Next.js + Tailwind + folder structure (section 3).
4. Build components in the order from section 4 (Hero → Countdown → Buttons → Manual → Footer → Music).
5. Test mobile-first (Chrome DevTools + real device).
6. Deploy to Vercel, configure a custom domain if applicable (or use the default `.vercel.app` subdomain).
7. Test the shared link on WhatsApp (OG image preview).
