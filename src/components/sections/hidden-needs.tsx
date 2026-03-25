"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BlurText, SpotlightCard } from "@/components/animations/react-bits";
import { ParallaxSection } from "@/components/animations/motion-primitives";

const needs = [
  {
    title: "Surface-level vs Real needs",
    description:
      "Clients often describe symptoms, not root causes. We dig deeper through behavioral analysis and contextual inquiry.",
  },
  {
    title: "Data nobody looked at",
    description:
      "Heatmaps, session recordings, funnel drop-offs — the answers are already in your data. We just know where to look.",
  },
  {
    title: "Emotional friction points",
    description:
      "Not every problem shows up in metrics. Frustration, confusion, and trust gaps require qualitative understanding.",
  },
];

export function HiddenNeeds() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax depth layers
    const layers = sectionRef.current.querySelectorAll(".parallax-layer");
    layers.forEach((layer, i) => {
      gsap.to(layer, {
        yPercent: -(i + 1) * 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="hidden-needs" ref={sectionRef} className="section bg-muted relative overflow-hidden">
      {/* Parallax background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="parallax-layer absolute top-20 left-10 w-72 h-72 bg-foreground/[0.02] rounded-full blur-3xl" />
        <div className="parallax-layer absolute bottom-20 right-10 w-96 h-96 bg-foreground/[0.03] rounded-full blur-3xl" />
        <div className="parallax-layer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-foreground/[0.01] rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Uncovering Hidden Needs
          </span>
          <BlurText
            text="We find problems your competitors don't even know exist"
            className="text-headline max-w-3xl"
          />
        </div>

        <ParallaxSection speed={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {needs.map((need, i) => (
              <SpotlightCard
                key={need.title}
                className="bg-background border border-border rounded-2xl p-8"
              >
                <span className="text-5xl font-bold text-muted-foreground/20 font-mono block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-title mb-3">{need.title}</h3>
                <p className="text-body text-muted-foreground">
                  {need.description}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </ParallaxSection>
      </div>
    </section>
  );
}
