"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import autoAnimate from "@formkit/auto-animate";
import { TextReveal } from "@/components/animations/text-reveal";

const services = [
  {
    id: "strategy",
    title: "Strategy Consulting",
    titleKo: "전략 컨설팅",
    description:
      "We analyze market landscape, user behavior, and competitive positioning to build winning strategies.",
    details: [
      "Market & User Research",
      "Brand Positioning",
      "Product Roadmap",
      "Growth Strategy",
    ],
  },
  {
    id: "design",
    title: "Design & Experience",
    titleKo: "디자인 & 경험",
    description:
      "From wireframes to pixel-perfect interfaces. Every interaction is crafted with purpose.",
    details: [
      "UI/UX Design",
      "Design System",
      "Prototyping",
      "Motion Design",
    ],
  },
  {
    id: "development",
    title: "Development",
    titleKo: "개발",
    description:
      "Robust, scalable, and performant. We build digital products that stand the test of time.",
    details: [
      "Frontend Engineering",
      "Backend & API",
      "CMS Integration",
      "Performance Optimization",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Growth",
    titleKo: "유지보수 & 성장",
    description:
      "Launch is just the beginning. We continuously optimize and evolve your digital product.",
    details: [
      "Analytics & Monitoring",
      "A/B Testing",
      "SEO Optimization",
      "Continuous Improvement",
    ],
  },
];

export function Services() {
  const [activeService, setActiveService] = useState(services[0].id);
  const active = services.find((s) => s.id === activeService)!;
  const detailsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (detailsRef.current) {
      autoAnimate(detailsRef.current);
    }
  }, []);

  return (
    <section id="services" className="section bg-background">
      <div className="container">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Services
          </span>
          <TextReveal as="h2" className="text-headline">
            What we do best
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Tabs */}
          <div className="flex flex-col gap-2">
            {services.map((service) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`text-left p-6 rounded-xl transition-all duration-300 ${
                  activeService === service.id
                    ? "bg-foreground text-background"
                    : "bg-muted hover:bg-muted/80"
                }`}
                whileTap={{ scale: 0.98 }}
                data-cursor-hover
              >
                <h3 className="text-title">
                  {service.title}
                  <span
                    className={`ml-2 text-sm ${
                      activeService === service.id
                        ? "text-background/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {service.titleKo}
                  </span>
                </h3>
              </motion.button>
            ))}
          </div>

          {/* Active Service Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-center"
            >
              <p className="text-body text-muted-foreground mb-8">
                {active.description}
              </p>
              <ul ref={detailsRef} className="grid grid-cols-2 gap-4">
                {active.details.map((detail, i) => (
                  <motion.li
                    key={detail}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
