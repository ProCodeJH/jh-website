"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isFirstLoad = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Skip transition on first load
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    // Only trigger on actual route change
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;

    if (!overlayRef.current) return;

    const overlay = overlayRef.current;

    // barba.js style: slide up → hold → slide away
    const tl = gsap.timeline();
    tl.fromTo(
      overlay,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.5, ease: "power3.inOut" }
    ).to(overlay, {
      yPercent: -100,
      duration: 0.5,
      ease: "power3.inOut",
      delay: 0.2,
    });
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
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
