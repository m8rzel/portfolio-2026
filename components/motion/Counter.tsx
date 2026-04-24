"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  duration = 1.6,
  className = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18, mass: 0.8 });
  const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = duration; // reserved for future customization
  return (
    <motion.span ref={ref} className={className}>
      {rounded}
    </motion.span>
  );
}
