"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitType from "split-type";
import anime from "animejs";
import { motion } from "motion/react";
import { SvgMorph } from "@/components/animations/svg-morph";
import { GradientText } from "@/components/animations/react-bits";

export function TextDesign() {
  const demoRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!interactionRef.current) return;

    // SplitType + GSAP: per-character scroll animation
    const split = new SplitType(interactionRef.current, {
      types: "chars",
    });

    if (split.chars) {
      gsap.fromTo(
        split.chars,
        { opacity: 0.1, y: 20, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.02,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: interactionRef.current,
            start: "top 75%",
            end: "top 25%",
            scrub: 1,
          },
        }
      );
    }

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // anime.js: hover letter animation
  const handleHover = (e: React.MouseEvent<HTMLSpanElement>) => {
    anime({
      targets: e.currentTarget,
      scale: [1, 1.4, 1],
      rotateZ: [0, 15, -15, 0],
      duration: 600,
      easing: "easeOutElastic(1, .5)",
    });
  };

  const demoText = "Typography is communication";

  return (
    <section id="text-design" className="section bg-background relative overflow-hidden">
      {/* SVG Morph background (anime.js) */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 pointer-events-none">
        <SvgMorph className="w-full h-full" />
      </div>

      <div className="container relative z-10">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Text Design Boosting User Interaction
          </span>
          <h2 className="text-headline max-w-3xl">
            <GradientText from="var(--foreground)" to="var(--muted-foreground)">
              Every word is placed to guide, persuade, and delight
            </GradientText>
          </h2>
        </div>

        {/* Interactive character demo */}
        <div ref={demoRef} className="mb-20">
          <p className="text-caption mb-4">Hover each letter:</p>
          <div className="text-display flex flex-wrap">
            {demoText.split("").map((char, i) => (
              <motion.span
                key={i}
                onMouseEnter={handleHover}
                className="inline-block cursor-default hover:text-muted-foreground transition-colors"
                style={{ transformOrigin: "center bottom" }}
                data-cursor-hover
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Scroll-driven text reveal */}
        <div className="py-20">
          <h3
            ref={interactionRef}
            className="text-headline max-w-4xl"
            style={{ perspective: "500px" }}
          >
            타이포그래피는 장식이 아닙니다. 사용자를 이끌고, 설득하고, 감동시키는 가장 강력한 도구입니다.
          </h3>
        </div>

        {/* Typography showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {[
            {
              weight: "300",
              label: "Light",
              sample: "Elegance in restraint",
            },
            {
              weight: "500",
              label: "Medium",
              sample: "Balance and clarity",
            },
            {
              weight: "700",
              label: "Bold",
              sample: "Impact and authority",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.02 }}
              className="p-6 border border-border rounded-xl"
            >
              <span className="text-caption">{item.label}</span>
              <p
                className="text-2xl mt-2"
                style={{ fontWeight: item.weight }}
              >
                {item.sample}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
