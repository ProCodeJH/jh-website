"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";

// ─── Text Shimmer (motion-primitives style) ───
export function TextShimmer({
  children,
  className = "",
  duration = 2,
}: {
  children: string;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(90deg, var(--foreground) 0%, var(--muted-foreground) 50%, var(--foreground) 100%)",
        backgroundSize: "200% 100%",
      }}
      animate={{
        backgroundPosition: ["0% center", "-200% center"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// ─── Scroll Progress (motion-primitives style) ───
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-foreground z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// ─── Parallax Section (motion-primitives style) ───
export function ParallaxSection({
  children,
  className = "",
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ─── Hover Card (motion-primitives style) ───
export function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
      data-cursor-hover
    >
      <div style={{ transform: "translateZ(40px)" }}>{children}</div>
    </motion.div>
  );
}

// ─── Infinite Marquee (motion-primitives style) ───
export function InfiniteMarquee({
  children,
  className = "",
  speed = 30,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
