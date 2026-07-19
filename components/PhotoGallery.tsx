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
  const { timeLeft, isComplete } = useCountdown();
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

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || !files || files.length === 0) return current;
      return (current - 1 + files.length) % files.length;
    });
  }, [files]);

  const showNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null || !files || files.length === 0) return current;
      return (current + 1) % files.length;
    });
  }, [files]);

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
    lightboxIndex !== null && files ? files[lightboxIndex] : null;

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

          {!isComplete ? (
            <>
              <p className="mt-4 font-sans text-sm text-foreground/70">
                Aqui ficarão as fotos do nosso grande dia.
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
                {error && <p className="font-sans text-sm text-foreground/70">{error}</p>}

                {!error && files === null && <SkeletonGrid />}

                {!error && files !== null && files.length === 0 && (
                  <p className="font-sans text-sm text-foreground/70">
                    Ainda não há fotos — sê o primeiro a partilhar uma!
                  </p>
                )}

                {!error && files !== null && files.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {files.map((file, index) => (
                      <button
                        key={file.id}
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        aria-label={`Ver foto: ${file.name}`}
                        className="group aspect-square overflow-hidden rounded-lg border border-gold/30"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoSrc(file.id, 400)}
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
          src={photoSrc(activePhoto.id, 1600)}
          alt={activePhoto.name}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
}
