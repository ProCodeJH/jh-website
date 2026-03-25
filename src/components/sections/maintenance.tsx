"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TextShimmer, InfiniteMarquee } from "@/components/animations/motion-primitives";
import { AnimeStaggerText } from "@/components/animations/svg-morph";

const guidelines = [
  {
    icon: "01",
    title: "Living Documentation",
    description: "자동 업데이트되는 기술 문서. Stale 문서는 없는 것보다 나쁘다.",
  },
  {
    icon: "02",
    title: "Modular Architecture",
    description: "교체 가능한 모듈 설계. 하나를 바꿔도 전체가 무너지지 않는다.",
  },
  {
    icon: "03",
    title: "Monitoring & Alerts",
    description: "장애를 고객이 발견하기 전에 우리가 먼저 알아차린다.",
  },
  {
    icon: "04",
    title: "Dependency Hygiene",
    description: "정기적인 의존성 감사. 보안 취약점은 0일 내 대응.",
  },
];

export function Maintenance() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    const items = timelineRef.current.querySelectorAll(".maintenance-item");

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
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
    <section id="maintenance" className="section bg-muted overflow-hidden">
      <div className="container">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Sustainable Maintenance Guide
          </span>
          <AnimeStaggerText
            text="Built to last, designed to evolve"
            className="text-headline max-w-3xl"
          />
        </div>

        {/* Guidelines */}
        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="flex flex-col gap-12">
            {guidelines.map((item, i) => (
              <div
                key={item.icon}
                className={`maintenance-item flex items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <div
                    className={`bg-background border border-border rounded-2xl p-8 ${
                      i % 2 === 0 ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-3xl font-bold text-muted-foreground/20 font-mono">
                      {item.icon}
                    </span>
                    <h3 className="text-title mt-2 mb-2">{item.title}</h3>
                    <p className="text-body text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="hidden md:flex w-4 h-4 rounded-full bg-foreground shrink-0"
                />

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-20">
          <InfiniteMarquee speed={25} className="opacity-10">
            <span className="text-6xl font-bold tracking-tighter whitespace-nowrap">
              MAINTAIN &bull; EVOLVE &bull; GROW &bull; SUSTAIN &bull; MAINTAIN
              &bull; EVOLVE &bull; GROW &bull; SUSTAIN &bull;
            </span>
          </InfiniteMarquee>
        </div>
      </div>

      {/* Shimmer accent */}
      <div className="container mt-12 text-center">
        <TextShimmer className="text-lg font-medium" duration={3}>
          Long-term partnership, not just a project
        </TextShimmer>
      </div>
    </section>
  );
}
