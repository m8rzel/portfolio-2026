"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Typewriter — tippt Text zeichenweise.
 */
export function Typewriter({
  text,
  speed = 35,
  startDelay = 0,
  cursor = true,
  className = "",
  onDone,
  active = true,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  className?: string;
  onDone?: () => void;
  active?: boolean;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!active) return;
    setI(0);
    const startTimer = setTimeout(() => {
      let c = 0;
      const id = setInterval(() => {
        c += 1;
        setI(c);
        if (c >= text.length) {
          clearInterval(id);
          onDone?.();
        }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(startTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, text, speed, startDelay]);

  return (
    <span className={className}>
      <span>{text.slice(0, i)}</span>
      {cursor && (
        <motion.span
          aria-hidden
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block -mb-[0.15em] ml-[0.05em] h-[1em] w-[0.55ch] translate-y-[0.12em] bg-[var(--color-accent-500)]"
        />
      )}
    </span>
  );
}

/**
 * TypewriterLines — mehrere Zeilen nacheinander tippen (trigger on view by default).
 */
export function TypewriterLines({
  lines,
  speed = 28,
  lineDelay = 200,
  startDelay = 0,
  className = "",
  lineClassName = "",
  triggerOnView = true,
}: {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  startDelay?: number;
  className?: string;
  lineClassName?: string;
  triggerOnView?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (triggerOnView ? inView : true) {
      setActive(0);
    }
  }, [inView, triggerOnView]);

  return (
    <div ref={ref} className={className}>
      {lines.map((line, idx) => {
        const isActive = idx === active;
        const isDone = idx < active;
        const isPending = idx > active;

        if (isPending) {
          return <div key={idx} className={lineClassName} style={{ minHeight: "1.3em" }} />;
        }

        if (isDone) {
          return (
            <div key={idx} className={lineClassName}>
              {line}
            </div>
          );
        }

        return (
          <div key={idx} className={lineClassName}>
            <Typewriter
              text={line}
              speed={speed}
              startDelay={idx === 0 ? startDelay : lineDelay}
              cursor={isActive}
              active={isActive}
              onDone={() => {
                if (idx < lines.length - 1) {
                  setTimeout(() => setActive((a) => a + 1), lineDelay);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
