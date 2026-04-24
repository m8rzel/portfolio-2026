"use client";

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export function CursorSpotlight() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const bg = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(56, 224, 120, 0.06), transparent 70%)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ background: bg }}
    />
  );
}
