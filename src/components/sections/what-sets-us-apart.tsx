"use client";

import { motion } from "motion/react";
import { TextReveal } from "@/components/animations/text-reveal";

const differentiators = [
  {
    title: "Uncovering Hidden Needs",
    titleKo: "숨겨진 니즈 발굴",
    description:
      "We go beyond surface-level requirements. Through deep user research and behavioral analysis, we find the problems your competitors don't even know exist.",
  },
  {
    title: "Back-office Restructuring",
    titleKo: "백오피스 최적화",
    description:
      "Beautiful frontends mean nothing if the backend crumbles. We restructure operations, optimize workflows, and build systems that scale.",
  },
  {
    title: "Superior Testing",
    titleKo: "검증 전문성",
    description:
      "QA isn't an afterthought — it's embedded in our process from day one. We catch what others miss.",
  },
  {
    title: "Sustainable Maintenance",
    titleKo: "지속 가능한 유지보수",
    description:
      "We build with the future in mind. Clear documentation, modular architecture, and long-term partnership mindset.",
  },
  {
    title: "Text Design Excellence",
    titleKo: "텍스트 디자인",
    description:
      "Typography isn't decoration — it's communication. Every word is placed to guide, persuade, and delight.",
  },
];

export function WhatSetsUsApart() {
  return (
    <section className="section bg-foreground text-background">
      <div className="container">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block opacity-60">
            What Sets Us Apart
          </span>
          <TextReveal as="h2" className="text-headline max-w-3xl">
            Why choose JH
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-background/10 rounded-2xl overflow-hidden">
          {differentiators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              className="p-8 md:p-10 bg-foreground transition-colors"
              data-cursor-hover
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-sm font-mono opacity-40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-title">
                    {item.title}
                  </h3>
                  <span className="text-sm opacity-50">{item.titleKo}</span>
                </div>
              </div>
              <p className="text-body opacity-70 ml-10">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
