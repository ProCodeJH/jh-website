"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // barba.js style page transition using GSAP
    if (isTransitioning && overlayRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
          // Reveal
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => setIsTransitioning(false),
          });
        },
      });

      // Cover
      tl.fromTo(
        overlayRef.current,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.6, ease: "power3.inOut" }
      );
    }
  }, [isTransitioning, children]);

  useEffect(() => {
    setIsTransitioning(true);
  }, [pathname]);

  return (
    <>
      {/* Page transition overlay (barba.js style) */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-foreground pointer-events-none"
        style={{ transform: "translateY(100%)" }}
      >
        <div className="flex items-center justify-center h-full">
          <span className="text-4xl font-bold text-background tracking-tighter">
            JH
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayChildren}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
