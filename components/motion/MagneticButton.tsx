"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useCallback,
  useRef,
  type ComponentProps,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  strength?: number;
  className?: string;
  href?: string;
  as?: "button" | "a";
} & Omit<ComponentProps<"button">, "ref">;

export function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  href,
  as = "button",
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.6 });

  const handleMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      x.set(relX * strength);
      y.set(relY * strength);
    },
    [strength, x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const Inner = as === "a" ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
      style={{ x, y }}
    >
      {/* @ts-expect-error — href only valid when as="a" */}
      <Inner href={href} className={className} {...rest}>
        {children}
      </Inner>
    </motion.div>
  );
}
