"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "journey", label: "Journey" },
  { id: "evolving", label: "Evolving" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "partners", label: "Partners" },
  { id: "approach", label: "Approach" },
  { id: "hidden-needs", label: "Hidden Needs" },
  { id: "backoffice", label: "Back-office" },
  { id: "testing", label: "Testing" },
  { id: "maintenance", label: "Maintenance" },
  { id: "text-design", label: "Text Design" },
  { id: "apart", label: "Sets Apart" },
  { id: "contact", label: "Contact" },
];

export function DotNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Scroll to ${label}`}
          data-cursor-hover
        >
          {/* Label tooltip */}
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground whitespace-nowrap">
            {label}
          </span>

          {/* Dot */}
          <motion.div
            animate={{
              scale: activeSection === id ? 1 : 0.6,
              opacity: activeSection === id ? 1 : 0.3,
            }}
            className="w-2.5 h-2.5 rounded-full bg-foreground"
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}
    </nav>
  );
}
