"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Typed from "typed.js";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/animations/text-reveal";
import { MagneticButton } from "@/components/animations/magnetic-button";

const HeroScene = dynamic(
  () =>
    import("@/components/three/hero-scene").then((mod) => ({
      default: mod.HeroScene,
    })),
  { ssr: false }
);

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Digital Experiences",
        "Brand Identity",
        "Product Strategy",
        "Creative Solutions",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });

    return () => typed.destroy();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-caption uppercase tracking-[0.3em]">
              Premium Digital Agency
            </span>
          </motion.div>

          {/* Main Heading */}
          <TextReveal
            as="h1"
            className="text-display mb-4"
            trigger="load"
            delay={0.5}
          >
            We craft
          </TextReveal>

          <div className="text-display mb-8">
            <span
              ref={typedRef}
              className="text-muted-foreground"
            />
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-body text-muted-foreground max-w-xl mb-12"
          >
            경험을 진화시키고, 성과로 증명합니다.
            <br />
            Lead process, prove results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a project
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-4 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
              >
                View work
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-caption">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border border-border rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
