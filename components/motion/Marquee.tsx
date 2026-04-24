"use client";

import type { ReactNode } from "react";

export function Marquee({
  children,
  speed = "normal",
  className = "",
}: {
  children: ReactNode;
  speed?: "normal" | "slow";
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        <div className="flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-12 pr-12">
          {children}
        </div>
      </div>
    </div>
  );
}
