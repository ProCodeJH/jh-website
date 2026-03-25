"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { TextReveal } from "@/components/animations/text-reveal";
import { MagneticButton } from "@/components/animations/magnetic-button";

const Globe = dynamic(() => import("@/components/three/globe"), { ssr: false });

export function ContactCTA() {
  return (
    <section id="contact" className="section bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
              Let&apos;s Work Together
            </span>
            <TextReveal as="h2" className="text-headline mb-6">
              Your expert partner for business growth
            </TextReveal>
            <p className="text-body text-muted-foreground mb-8 max-w-lg">
              새로운 프로젝트를 준비 중이신가요?
              <br />
              저희와 프로젝트에 대해 논의하고 싶으시거나 질문이 있으시다면 문의를
              남겨주세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <MagneticButton>
                <a
                  href="mailto:contact@jh.studio"
                  className="inline-flex items-center px-8 py-4 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Get in touch
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
                  href="#"
                  className="inline-flex items-center px-8 py-4 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
                >
                  Download portfolio
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Globe */}
          <div className="h-[400px] lg:h-[500px]">
            <Globe />
          </div>
        </div>
      </div>

      {/* Rotating Contact Badge */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -right-16 -bottom-16 w-40 h-40 opacity-10"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="fill-foreground text-[14px] uppercase tracking-[0.5em]">
            <textPath href="#circlePath">
              CONTACT US &bull; LET&apos;S TALK &bull; GET IN TOUCH &bull;
            </textPath>
          </text>
        </svg>
      </motion.div>
    </section>
  );
}
