import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type MonogramVariant = "gold" | "white";

type MonogramProps = {
  size?: number;
  variant?: MonogramVariant;
  className?: string;
  priority?: boolean;
};

const VARIANT_SRC: Record<MonogramVariant, string> = {
  gold: "/images/monogram-gold.png",
  white: "/images/monogram-white.png",
};

// Intrinsic aspect ratio of the cropped artwork (790x737px) — both variants
// share this canvas, so `size` sets the width and height follows from it.
const ARTWORK_ASPECT_RATIO = 790 / 737;

const VARIANT_FALLBACK_COLOR: Record<MonogramVariant, string> = {
  gold: "text-gold",
  white: "text-background",
};

function hasPublicFile(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

export default function Monogram({
  size = 120,
  variant = "gold",
  className,
  priority = false,
}: Readonly<MonogramProps>) {
  const src = VARIANT_SRC[variant];

  if (hasPublicFile(src)) {
    const height = Math.round(size / ARTWORK_ASPECT_RATIO);
    return (
      <Image
        src={src}
        alt="Monograma E ao quadrado"
        width={size}
        height={height}
        priority={priority}
        className={className}
        style={{ width: size, height }}
      />
    );
  }

  const fallbackClassName = [VARIANT_FALLBACK_COLOR[variant], className]
    .filter(Boolean)
    .join(" ");

  return <MonogramFallback size={size} className={fallbackClassName} />;
}

function MonogramFallback({
  size,
  className,
}: Readonly<{
  size: number;
  className?: string;
}>) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Monograma E ao quadrado"
    >
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
      />
      <text
        x="88"
        y="124"
        textAnchor="middle"
        fontFamily="var(--font-display), serif"
        fontSize="100"
        fill="currentColor"
      >
        E
      </text>
      <text
        x="122"
        y="64"
        textAnchor="middle"
        fontFamily="var(--font-display), serif"
        fontSize="54"
        fill="currentColor"
      >
        2
      </text>
    </svg>
  );
}
