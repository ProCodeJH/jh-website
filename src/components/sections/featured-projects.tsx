"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { TextReveal } from "@/components/animations/text-reveal";
import "swiper/css";
import "swiper/css/free-mode";

const projects = [
  {
    title: "Finance Dashboard",
    category: "Fintech",
    year: "2026",
    image: "/images/project-1.jpg",
    color: "#1a1a2e",
  },
  {
    title: "E-Commerce Platform",
    category: "Retail",
    year: "2025",
    image: "/images/project-2.jpg",
    color: "#16213e",
  },
  {
    title: "Healthcare Portal",
    category: "Healthcare",
    year: "2025",
    image: "/images/project-3.jpg",
    color: "#0f3460",
  },
  {
    title: "Mobility App",
    category: "Mobility",
    year: "2026",
    image: "/images/project-4.jpg",
    color: "#533483",
  },
  {
    title: "Logistics System",
    category: "Logistics",
    year: "2024",
    image: "/images/project-5.jpg",
    color: "#2c3333",
  },
];

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0];
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer"
      data-cursor-hover
    >
      {/* Image Placeholder */}
      <div
        className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative"
        style={{ backgroundColor: project.color }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-6xl font-bold">
            {project.title.charAt(0)}
          </span>
        </div>
        <motion.div
          className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500"
        />
        {/* Hover arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute bottom-4 right-4 w-12 h-12 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-title group-hover:text-muted-foreground transition-colors">
            {project.title}
          </h3>
          <p className="text-caption">{project.category}</p>
        </div>
        <span className="text-caption font-mono">{project.year}</span>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="section bg-background">
      <div className="container mb-12">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
              Featured Work
            </span>
            <TextReveal as="h2" className="text-headline">
              Our Featured Projects
            </TextReveal>
          </div>
          <a
            href="/projects"
            className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors"
            data-cursor-hover
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      <div className="container">
        <Swiper
          modules={[FreeMode, Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          freeMode
          autoplay={{ delay: 4000, disableOnInteraction: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 2.8 },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.title}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
