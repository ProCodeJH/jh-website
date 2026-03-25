"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TextReveal } from "@/components/animations/text-reveal";

const pillars = [
  {
    icon: "01",
    title: "Research-Driven",
    description: "Every decision backed by data, every assumption validated by users.",
  },
  {
    icon: "02",
    title: "Design Excellence",
    description: "We obsess over every pixel, every interaction, every micro-moment.",
  },
  {
    icon: "03",
    title: "Engineering Rigor",
    description: "Clean code, tested systems, scalable architecture from day one.",
  },
  {
    icon: "04",
    title: "Transparent Process",
    description: "No black boxes. You see every step, every decision, every trade-off.",
  },
  {
    icon: "05",
    title: "Continuous Evolution",
    description: "Launch is the starting line. We iterate, optimize, and grow together.",
  },
];

export function Approach() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".approach-card");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="approach" className="section bg-background">
      <div className="container">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Our Approach
          </span>
          <TextReveal as="h2" className="text-headline max-w-3xl">
            Five pillars of how we work
          </TextReveal>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.icon}
              whileHover={{ y: -4, backgroundColor: "var(--muted)" }}
              className="approach-card p-8 rounded-2xl border border-border transition-colors"
              data-cursor-hover
            >
              <span className="text-4xl font-bold text-muted-foreground/30 font-mono block mb-4">
                {pillar.icon}
              </span>
              <h3 className="text-title mb-2">{pillar.title}</h3>
              <p className="text-body text-muted-foreground">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
