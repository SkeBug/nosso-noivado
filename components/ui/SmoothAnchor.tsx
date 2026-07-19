"use client";

import type { MouseEvent, ReactNode } from "react";
import { smoothScrollToId } from "@/lib/smoothScroll";

type SmoothAnchorProps = {
  href: `#${string}`;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export default function SmoothAnchor({
  href,
  children,
  className,
  ...rest
}: Readonly<SmoothAnchorProps>) {
  const id = href.slice(1);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    smoothScrollToId(id);
    window.history.pushState(null, "", href);
  }

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
