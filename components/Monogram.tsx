type MonogramProps = {
  size?: number;
  className?: string;
};

export default function Monogram({ size = 120, className }: Readonly<MonogramProps>) {
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
