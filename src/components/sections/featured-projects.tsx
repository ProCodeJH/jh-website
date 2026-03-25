"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { TextReveal } from "@/components/animations/text-reveal";
import "swiper/css";
import "swiper/css/free-mode";

const projects = [
  {
    id: "01",
    title: "Finance Dashboard",
    category: "Fintech",
    year: "2026",
    description: "Real-time analytics platform with advanced data visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["React", "D3.js", "Node.js"],
  },
  {
    id: "02",
    title: "E-Commerce Platform",
    category: "Retail",
    year: "2025",
    description: "Scalable multi-vendor marketplace with seamless checkout",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    tags: ["Next.js", "Stripe", "Postgres"],
  },
  {
    id: "03",
    title: "Healthcare Portal",
    category: "Healthcare",
    year: "2025",
    description: "Patient management system with HIPAA-compliant data handling",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["TypeScript", "tRPC", "Supabase"],
  },
  {
    id: "04",
    title: "Mobility App",
    category: "Mobility",
    year: "2026",
    description: "Urban transportation super-app with live routing engine",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    tags: ["React Native", "Maps API", "WebSockets"],
  },
  {
    id: "05",
    title: "Brand Identity",
    category: "Design",
    year: "2025",
    description: "Full visual identity system across digital and print channels",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop",
    tags: ["Figma", "Motion", "Storybook"],
  },
];

type Project = (typeof projects)[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [4, -4]);
  const rotateY = useTransform(mouseX, [-150, 150], [-4, 4]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group cursor-none"
      data-cursor-hover
    >
      {/* Image container */}
      <div className="aspect-[4/3] rounded-2xl overflow-hidden relative mb-5">
        {/* Number badge */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="font-mono text-xs text-white/60 tracking-widest">
            {project.id}
          </span>
        </div>

        {/* Image with scale */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 33vw"
            className="object-cover"
            priority={index < 2}
          />
        </motion.div>

        {/* Dark gradient base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />

        {/* Slide-up overlay */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-end p-5"
          initial={false}
        >
          {/* Tags row — always visible at bottom */}
          <motion.div
            className="flex flex-wrap gap-2 mb-3"
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 12,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.05 : 0 }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono uppercase tracking-widest text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-white/80 text-sm leading-relaxed"
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 16,
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0 : 0 }}
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* "View" cursor label */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl">
                <span className="text-black text-xs font-semibold tracking-widest uppercase">
                  View
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrow button bottom-right */}
        <motion.div
          className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center"
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.div>
      </div>

      {/* Card footer */}
      <div className="flex items-start justify-between px-1">
        <div>
          <motion.h3
            className="text-title mb-1"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.title}
          </motion.h3>
          <p className="text-caption">{project.category}</p>
        </div>
        <div className="text-right">
          <span className="text-caption font-mono block">{project.year}</span>
          <motion.div
            className="h-px bg-foreground mt-1 origin-right"
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "2.5rem" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="section bg-background overflow-hidden">
      {/* Header */}
      <div className="container mb-12">
        <div className="flex items-end justify-between">
          <div>
            <motion.span
              className="text-caption uppercase tracking-[0.3em] mb-4 block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Work
            </motion.span>
            <TextReveal as="h2" className="text-headline">
              Our Featured Projects
            </TextReveal>
          </div>
          <motion.a
            href="/projects"
            className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors group/link"
            data-cursor-hover
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            View all
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.a>
        </div>
      </div>

      {/* Swiper — peek effect */}
      <div className="container">
        <Swiper
          modules={[FreeMode]}
          spaceBetween={20}
          slidesPerView={1.15}
          freeMode={{ enabled: true, momentum: true, momentumRatio: 0.4 }}
          breakpoints={{
            480: { slidesPerView: 1.3, spaceBetween: 20 },
            640: { slidesPerView: 1.6, spaceBetween: 24 },
            768: { slidesPerView: 2.2, spaceBetween: 24 },
            1024: { slidesPerView: 2.7, spaceBetween: 28 },
            1280: { slidesPerView: 3.1, spaceBetween: 32 },
          }}
          className="!overflow-visible"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id} className="!h-auto">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: Math.min(index * 0.1, 0.3),
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Project count strip */}
      <div className="container mt-10">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-caption font-mono">
            {projects.length.toString().padStart(2, "0")} Projects
          </span>
        </div>
      </div>
    </section>
  );
}
