import type { NextRequest } from "next/server";

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3/files";

function driveReferer() {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return `${site}/`;
}

function withThumbnailSize(thumbnailLink: string, size: number) {
  return thumbnailLink.replace(/=s\d+$/, `=s${size}`);
}

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("id");
  const requestedSize = Number(request.nextUrl.searchParams.get("size"));
  const size = Number.isFinite(requestedSize) && requestedSize > 0 ? requestedSize : 400;

  if (!fileId) {
    return new Response("Missing id", { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return new Response("Drive API key not configured", { status: 500 });
  }

  const metaResponse = await fetch(
    `${DRIVE_API_BASE}/${encodeURIComponent(fileId)}?fields=thumbnailLink,mimeType&key=${apiKey}`,
    { headers: { Referer: driveReferer() } },
  );

  if (!metaResponse.ok) {
    return new Response("File not found", { status: 404 });
  }

  const meta: { thumbnailLink?: string; mimeType?: string } = await metaResponse.json();

  if (!meta.mimeType?.startsWith("image/") || !meta.thumbnailLink) {
    return new Response("Not found", { status: 404 });
  }

  // Google's thumbnail CDN throttles requests that carry a Referer header, so this
  // one is deliberately sent bare (unlike the metadata call above, which needs it
  // to satisfy the API key's HTTP referrer restriction).
  const imageResponse = await fetch(withThumbnailSize(meta.thumbnailLink, size));

  if (!imageResponse.ok || !imageResponse.body) {
    return new Response("Failed to fetch image", { status: 502 });
  }

  return new Response(imageResponse.body, {
    headers: {
      "Content-Type": imageResponse.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
