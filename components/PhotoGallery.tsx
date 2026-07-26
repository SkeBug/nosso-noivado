"use client";

import { useCallback, useEffect, useState } from "react";
import { Camera, Upload } from "lucide-react";
import { eventConfig } from "@/config/event";
import { useCountdown } from "./hooks/useCountdown";
import CountdownDigits from "./ui/CountdownDigits";
import FadeIn from "./ui/FadeIn";
import PhotoLightbox from "./ui/PhotoLightbox";

type DriveFile = {
  id: string;
  name: string;
};

function photoSrc(fileId: string, size: number) {
  return `/api/photo?id=${encodeURIComponent(fileId)}&size=${size}`;
}

// Stand-in photos for ?preview=1 when the real Drive folder has nothing in it yet
// (expected before the event) — lets the couple see the finished gallery layout
// and lightbox now instead of waiting for guest uploads.
const SAMPLE_PHOTOS: DriveFile[] = Array.from({ length: 8 }, (_, index) => ({
  id: `preview-${index + 1}`,
  name: `Foto de exemplo ${index + 1}`,
}));

function samplePhotoSrc(sampleId: string, size: number) {
  return `https://picsum.photos/seed/${sampleId}/${size}/${size}`;
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="aspect-square animate-pulse rounded-lg bg-olive/10" />
      ))}
    </div>
  );
}

export default function PhotoGallery() {
  const { photoGallery } = eventConfig;
  const { timeLeft, isComplete, isPreview } = useCountdown();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  const isConfigured = Boolean(apiKey) && photoGallery.driveFolderId !== "TODO";

  const [files, setFiles] = useState<DriveFile[] | null>(null);
  const [error, setError] = useState<string | null>(
    isConfigured ? null : "A galeria de fotos ainda não foi configurada.",
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isConfigured || !isComplete) return;

    let cancelled = false;
    const query = `'${photoGallery.driveFolderId}' in parents and mimeType contains 'image/'`;
    const url =
      "https://www.googleapis.com/drive/v3/files" +
      `?q=${encodeURIComponent(query)}` +
      `&key=${apiKey}` +
      "&fields=files(id,name)" +
      "&pageSize=1000";

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Drive API respondeu ${response.status}`);
        return response.json();
      })
      .then((data: { files?: DriveFile[] }) => {
        if (cancelled) return;
        setFiles(data.files ?? []);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Não foi possível carregar as fotos agora. Tenta novamente mais tarde.");
      });

    return () => {
      cancelled = true;
    };
  }, [isConfigured, isComplete, apiKey, photoGallery.driveFolderId]);

  // Only fall back to sample photos once we know the real folder is genuinely
  // empty (or errored) — a real, populated folder always takes priority.
  const usingSamplePhotos = isPreview && (Boolean(error) || files?.length === 0);
  const displayFiles = usingSamplePhotos ? SAMPLE_PHOTOS : files;
  const displayError = usingSamplePhotos ? null : error;
  const displaySrc = usingSamplePhotos ? samplePhotoSrc : photoSrc;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || !displayFiles || displayFiles.length === 0) return current;
      return (current - 1 + displayFiles.length) % displayFiles.length;
    });
  }, [displayFiles]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || !displayFiles || displayFiles.length === 0) return current;
      return (current + 1) % displayFiles.length;
    });
  }, [displayFiles]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox]);

  const hasUploadUrl = photoGallery.driveFolderUploadUrl !== "TODO";

  const activePhoto =
    lightboxIndex !== null && displayFiles ? displayFiles[lightboxIndex] : null;

  return (
    <section id="galeria-de-fotos" className="px-6 py-10">
      <FadeIn mode="scroll">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-white/40 px-6 py-10 text-center backdrop-blur-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold">
            <Camera size={26} />
          </div>

          <div className="mx-auto mt-5 h-px w-16 bg-gold/50" aria-hidden="true" />

          <h2 className="mt-6 font-display text-3xl italic text-foreground sm:text-4xl">
            Galeria de Fotos
          </h2>

          {usingSamplePhotos && (
            <p className="mx-auto mt-3 inline-block rounded-full border border-gold/50 px-3 py-1 font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
              Pré-visualização — fotos de exemplo
            </p>
          )}

          {!isComplete ? (
            <>
              <p className="mt-4 font-sans text-sm text-foreground/70">
                Aqui ficarão as fotos do nosso grande dia — vais poder enviar as
                tuas fotos e também baixar as fotos de outros convidados, tudo a partir daqui deste mesmo site.
              </p>
              <p className="mt-6 font-sans text-xs uppercase tracking-[0.25em] text-olive">
                Estamos em contagem decrescente
              </p>
              <div className="mt-6">
                <CountdownDigits timeLeft={timeLeft} />
              </div>
            </>
          ) : (
            <>
              <p className="mt-4 font-sans text-sm text-foreground/70">
                Reveja e partilhe os momentos do nosso grande dia.
              </p>

              <div className="mt-8">
                {displayError && (
                  <p className="font-sans text-sm text-foreground/70">{displayError}</p>
                )}

                {!displayError && displayFiles === null && <SkeletonGrid />}

                {!displayError && displayFiles !== null && displayFiles.length === 0 && (
                  <p className="font-sans text-sm text-foreground/70">
                    Ainda não há fotos — sê o primeiro a partilhar uma!
                  </p>
                )}

                {!displayError && displayFiles !== null && displayFiles.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {displayFiles.map((file, index) => (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        aria-label={`Ver foto: ${file.name}`}
                        className="group aspect-square overflow-hidden rounded-lg border border-gold/30"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={displaySrc(file.id, 400)}
                          alt={file.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {hasUploadUrl && (
                <a
                  href={photoGallery.driveFolderUploadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:bg-gold/10"
                >
                  <Upload size={16} className="text-gold" />
                  Enviar as Tuas Fotos
                </a>
              )}
            </>
          )}
        </div>
      </FadeIn>

      {activePhoto && (
        <PhotoLightbox
          src={displaySrc(activePhoto.id, 1600)}
          alt={activePhoto.name}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
}
