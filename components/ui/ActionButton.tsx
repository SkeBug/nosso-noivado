import type { ReactNode } from "react";
import SmoothAnchor from "./SmoothAnchor";

type BaseProps = {
  icon: ReactNode;
  label: string;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  disabled?: boolean;
  onClick?: undefined;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  onClick: () => void;
  disabled?: boolean;
};

type ActionButtonProps = LinkProps | ButtonProps;

const baseClasses =
  "flex flex-col items-center justify-center gap-2 rounded-lg border border-gold/40 bg-white/50 px-4 py-7 text-center transition-colors hover:border-gold hover:bg-white/80";

export default function ActionButton(props: Readonly<ActionButtonProps>) {
  const { icon, label, disabled } = props;

  const content = (
    <>
      <span className="text-gold">{icon}</span>
      <span className="font-sans text-xs uppercase tracking-[0.15em] text-foreground sm:text-sm">
        {label}
      </span>
    </>
  );

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${baseClasses} cursor-not-allowed opacity-40`}
      >
        {content}
      </span>
    );
  }

  if (props.href) {
    if (!props.external && props.href.startsWith("#")) {
      return (
        <SmoothAnchor href={props.href as `#${string}`} className={baseClasses}>
          {content}
        </SmoothAnchor>
      );
    }

    return (
      <a
        href={props.href}
        target={props.external ? "_blank" : undefined}
        rel={props.external ? "noopener noreferrer" : undefined}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={baseClasses}>
      {content}
    </button>
  );
}
