export const eventConfig = {
  couple: {
    nameA: "Emanuela Xavier",
    nameB: "Evandro Silva",
    initials: "E&E",
  },
  message:
    "Com o coração cheio de alegria, convidamos você a celebrar connosco o início de mais um capítulo da nossa história de amor.", // TODO: couple free to edit/replace this text
  date: {
    iso: "2026-08-22T17:00:00-01:00", // Luanda, UTC-1
    displayLabel: "22 de Agosto de 2026, às 17h",
  },
  location: {
    name: "Salão de Festa Mwangana",
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
      "Confirme sua presença",
      "Convidado não convida!",
      "Não se atrase. Seja pontual.",
      "Tire muitas fotos e grave vídeos! Envie e veja todas as fotos do dia {albumLink}.", // {albumLink} interpolated with photoGallery.driveFolderUploadUrl
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
