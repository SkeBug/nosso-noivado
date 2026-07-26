export const eventConfig = {
  couple: {
    nameA: "Emanuela Xavier",
    nameB: "Evandro Silva",
    initials: "E&E",
  },
  // Text below has singular/plural pairs — picked at render time based on whether
  // the guest link addresses one person (`você`) or more than one (`vocês`).
  message: {
    singular:
      "O amor se torna ainda mais bonito quando é vivido ao lado de pessoas especiais. Por isso, escolhemos você para fazer parte de um dos dias mais importantes das nossas vidas.",
    plural:
      "O amor se torna ainda mais bonito quando é vivido ao lado de pessoas especiais. Por isso, escolhemos vocês para fazerem parte de um dos dias mais importantes das nossas vidas.",
  },
  invitation: {
    blessing: "Com o coração cheio de alegria e sob as bênçãos de Deus",
    honor: "têm a honra de convidar", // refers to the couple, not the guest — always plural
    celebration: {
      singular: "para celebrar connosco o nosso noivado",
      plural: "para celebrarem connosco o nosso noivado",
    },
    genericGuestLabel: "Convidado(a) Especial", // shown in place of a personalized guest name on the generic (non-slug) invite
  },
  date: {
    iso: "2026-08-22T17:00:00-01:00", // Luanda, UTC-1
    displayLabel: "22 de agosto de 2026 | às 17h00", // matches the banner-sample formatting
  },
  location: {
    name: "Salão de Festas Mwanangana",
    address: "Urbanização Nova Vida - Rua 70, depois do Complexo Escolar Frei João Domingos",
    mapsUrl: "https://maps.app.goo.gl/W1YTAZn3iJA9JLs87",
  },
  rsvp: {
    googleFormEmbedUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeoGWx9F0ZperwNWv1QatC_3zziTjEmqONPHvdMrQOjSaIOlQ/viewform?embedded=true",
  },
  photoGallery: {
    driveFolderId: "1825OrI8gG0-VCk_VkbTXxSADCRdZ5Opm", // folder ID, used by the Drive API to fetch/display photos
    driveFolderUploadUrl: "https://drive.google.com/drive/folders/1825OrI8gG0-VCk_VkbTXxSADCRdZ5Opm?usp=sharing", // same folder's shareable link, set to "Anyone with the link → Editor"
  },
  guestManual: {
    arrivalTime: "same-as-event", // reuse eventConfig.date.displayLabel in the UI
    rules: [
      "Confirme sua presença clicando aqui",
      "Convidado não convida!",
      "Não se atrase. Seja pontual.",
      "Tire muitas fotos e grave vídeos! Envie e veja todas as fotos do dia {albumLink}", // {albumLink} interpolated with photoGallery.driveFolderUploadUrl
      "Não saia sem se despedir dos noivos!",
      "Aproveite bastante!",
    ],
  },
  music: {
    trackTitle: "Justin Bieber - Angels Speak",
    artist: "Justin Bieber",
    src: "/audio/music.m4a",
  },
};
