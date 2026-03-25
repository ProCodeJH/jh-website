"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TextReveal } from "@/components/animations/text-reveal";

const journeySteps = [
  {
    number: "01",
    title: "Discover",
    titleKo: "발견",
    description:
      "We dive deep into your business, users, and market to uncover the real problems worth solving.",
  },
  {
    number: "02",
    title: "Strategy",
    titleKo: "전략",
    description:
      "Data-driven insights shape a clear roadmap — from brand positioning to technical architecture.",
  },
  {
    number: "03",
    title: "Design & Build",
    titleKo: "설계 & 개발",
    description:
      "Pixel-perfect design meets robust engineering. Every interaction is intentional.",
  },
  {
    number: "04",
    title: "Launch & Grow",
    titleKo: "런칭 & 성장",
    description:
      "We don't just ship — we measure, iterate, and scale. Your growth is our metric.",
  },
];

export function ProjectJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".journey-card");

    // Pin the section and animate cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
      },
    });

    cards.forEach((card, i) => {
      if (i > 0) {
        tl.fromTo(
          card,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1 },
          i * 0.5
        );
      }
      if (i < cards.length - 1) {
        tl.to(
          card,
          { scale: 0.9, opacity: 0.5, duration: 0.5 },
          (i + 1) * 0.5
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="section relative min-h-screen flex items-center bg-background"
    >
      <div className="container">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Project Journey
          </span>
          <TextReveal as="h2" className="text-headline">
            How we turn vision into reality
          </TextReveal>
        </div>

        <div ref={cardsRef} className="relative">
          {journeySteps.map((step, i) => (
            <div
              key={step.number}
              className="journey-card bg-muted rounded-2xl p-8 md:p-12 mb-6 last:mb-0"
              style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, right: 0 }}
            >
              <div className="flex items-start gap-8">
                <span className="text-6xl md:text-8xl font-bold text-muted-foreground/20 font-mono">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-title mb-1">
                    {step.title}
                    <span className="text-muted-foreground ml-3 text-base">
                      {step.titleKo}
                    </span>
                  </h3>
                  <p className="text-body text-muted-foreground max-w-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
