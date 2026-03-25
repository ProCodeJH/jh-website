"use client";

import { useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import Typed from "typed.js";
import anime from "animejs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitType from "split-type";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextShimmer, InfiniteMarquee } from "@/components/animations/motion-primitives";
import { AnimatedCounter } from "@/components/animations/react-bits";
import "swiper/css";

// ─────────────────────────────────────────────
// R3F: Dark Metallic Sphere
// ─────────────────────────────────────────────
function MetallicSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.1;
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
      ringRef.current.rotation.x = 1.2 + Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
      {/* Main sphere */}
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#111111"
          roughness={0.05}
          metalness={0.95}
          distort={0.18}
          speed={1.5}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={ringRef} scale={3.4}>
        <torusGeometry args={[1, 0.015, 8, 120]} />
        <meshStandardMaterial
          color="#888888"
          roughness={0.1}
          metalness={1}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner ring — slightly tilted */}
      <mesh rotation={[0.3, 0, 0.6]} scale={2.9}>
        <torusGeometry args={[1, 0.008, 8, 100]} />
        <meshStandardMaterial
          color="#aaaaaa"
          roughness={0.05}
          metalness={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function OrbParticles() {
  const count = 120;
  const positionsRef = useRef<Float32Array | null>(null);
  const pointsRef = useRef<THREE.Points>(null);

  if (!positionsRef.current) {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    positionsRef.current = pos;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsRef.current!, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#999999"
        sizeAttenuation
        transparent
        opacity={0.55}
      />
    </points>
  );
}

function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-8, -4, -4]} intensity={0.8} color="#c0c0c0" />
      <pointLight position={[6, 2, 2]} intensity={0.4} color="#e8e8e8" />
      <MetallicSphere />
      <OrbParticles />
      <Environment preset="studio" />
    </Canvas>
  );
}

// ─────────────────────────────────────────────
// Project strip data
// ─────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Finance Platform",
    category: "Web App",
    year: "2024",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
  },
  {
    title: "Mobile Experience",
    category: "UI/UX",
    year: "2024",
    src: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=500&fit=crop",
  },
  {
    title: "Analytics Dashboard",
    category: "Data Viz",
    year: "2023",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    title: "Cross-Device System",
    category: "Product",
    year: "2023",
    src: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&h=500&fit=crop",
  },
  {
    title: "Brand & Design",
    category: "Identity",
    year: "2024",
    src: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
  },
];

const STATS = [
  { value: 120, label: "Projects", suffix: "+" },
  { value: 98, label: "Client Satisfaction", suffix: "%" },
  { value: 8, label: "Years", suffix: "+" },
  { value: 24, label: "Industries", suffix: "" },
];

// ─────────────────────────────────────────────
// Project Card — tilt on hover
// ─────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 300, damping: 30 });
  const springRy = useSpring(ry, { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(ny * -10);
    ry.set(nx * 10);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX: springRx, rotateY: springRy, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 1.6 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="project-strip-card flex-shrink-0 group relative w-[340px] rounded-2xl overflow-hidden cursor-pointer"
      data-cursor-hover
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.src}
          alt={project.title}
          fill
          sizes="340px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark gradient on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-all duration-500" />
      </div>
      {/* Info bar */}
      <div className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-gradient-to-t from-background/95 via-background/60 to-transparent">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1">
              {project.category} · {project.year}
            </p>
            <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  // motion: scroll fade-out
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const sphereScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // typed.js
    let typed: Typed | undefined;
    if (typedRef.current) {
      typed = new Typed(typedRef.current, {
        strings: ["Lead process,", "Prove results.", "Evolve together."],
        typeSpeed: 65,
        backSpeed: 35,
        backDelay: 2800,
        loop: true,
        showCursor: true,
        cursorChar: "_",
      });
    }

    // SplitType + GSAP: character-by-character headline
    if (headlineRef.current) {
      const split = new SplitType(headlineRef.current, { types: "chars,words" });
      if (split.chars) {
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 80, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            stagger: 0.025,
            delay: 0.4,
            ease: "power4.out",
            transformOrigin: "0% 50% -50px",
          }
        );
      }
    }

    // GSAP: subhead
    if (subheadRef.current) {
      gsap.fromTo(
        subheadRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1, delay: 1.1, ease: "power3.out" }
      );
    }

    // anime.js: decorative line drawing
    if (lineRef.current) {
      anime({
        targets: lineRef.current,
        strokeDashoffset: [600, 0],
        opacity: [0, 1],
        duration: 1800,
        delay: 1000,
        easing: "easeOutExpo",
      });
    }

    // GSAP ScrollTrigger: horizontal strip parallax
    if (stripRef.current) {
      gsap.to(stripRef.current, {
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // GSAP: stat rows fade in on scroll
    const statItems = sectionRef.current.querySelectorAll(".stat-item");
    if (statItems.length) {
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statItems[0],
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      typed?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* ─── Subtle noise / grain texture overlay ─── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ─── Gradient blob — top left ─── */}
      <div
        className="absolute top-0 left-0 w-[60vw] h-[60vh] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 20% 20%, rgba(0,0,0,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ─── Main Content (scroll parallax wrapper) ─── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10"
      >
        {/* ═══════════════════════════════════════
            SPLIT LAYOUT: LEFT content / RIGHT 3D
        ═══════════════════════════════════════ */}
        <div className="container min-h-screen flex items-center pt-28 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_580px] gap-0 w-full items-center">

            {/* ── LEFT: Typography ── */}
            <div className="flex flex-col justify-center pr-0 lg:pr-12 xl:pr-20">

              {/* Tag shimmer */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 flex items-center gap-3"
              >
                {/* Animated dot */}
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-foreground inline-block"
                />
                <TextShimmer
                  className="text-[11px] uppercase tracking-[0.4em] font-medium text-muted-foreground"
                  duration={4}
                >
                  Premium Digital Agency
                </TextShimmer>
              </motion.div>

              {/* Headline — SplitType char reveal */}
              <h1
                ref={headlineRef}
                className="text-display mb-5 leading-[0.92]"
                style={{ perspective: "1000px" }}
              >
                Evolving<br />
                Experiences,<br />
                <span className="text-muted-foreground/40">Empowering</span><br />
                Outcomes.
              </h1>

              {/* Decorative line — anime.js */}
              <div className="mb-7">
                <svg width="160" height="2" className="overflow-visible">
                  <line
                    ref={lineRef}
                    x1="0" y1="1" x2="160" y2="1"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="600"
                    strokeDashoffset="600"
                    opacity="0"
                    className="text-border"
                  />
                </svg>
              </div>

              {/* typed.js */}
              <div className="mb-7">
                <span className="text-title text-muted-foreground">
                  <span ref={typedRef} />
                </span>
              </div>

              {/* Subhead — GSAP fade */}
              <p
                ref={subheadRef}
                className="text-body text-muted-foreground max-w-md mb-10 opacity-0"
              >
                경험을 진화시키고, 성과로 증명합니다.
                클라이언트와 함께 진화하며, 오늘과 내일의 가치에 공감하는 사용자 경험을 만듭니다.
              </p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4"
              >
                <MagneticButton>
                  <a
                    href="#contact"
                    className="group inline-flex items-center px-7 py-3.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-85 transition-all"
                    data-cursor-hover
                  >
                    프로젝트 문의
                    <motion.svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
                    data-cursor-hover
                  >
                    <span>Project Journey</span>
                    <svg className="w-3.5 h-3.5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </MagneticButton>
              </motion.div>

              {/* Stats row */}
              <div className="mt-14 pt-10 border-t border-border grid grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                  <div key={stat.label} className="stat-item opacity-0">
                    <div className="text-[2rem] font-bold leading-none tracking-tight text-foreground tabular-nums">
                      <AnimatedCounter value={stat.value} />
                      <span>{stat.suffix}</span>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: 3D Sphere ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ scale: sphereScale }}
              className="relative hidden lg:block"
            >
              {/* Sphere container */}
              <div className="relative w-full aspect-square max-w-[560px] ml-auto">
                {/* Gradient light disc behind the sphere */}
                <div
                  className="absolute inset-[10%] rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 45% 45%, rgba(180,180,180,0.15) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
                {/* Subtle radial glow ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(200,200,200,0.08) 80%, transparent 100%)",
                  }}
                />

                {/* Canvas */}
                <Suspense fallback={null}>
                  <ThreeScene />
                </Suspense>

                {/* Floating label — top left of sphere */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                  className="absolute top-[18%] left-[-8%] bg-background/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-sm pointer-events-none"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Clients</p>
                  <p className="text-xl font-bold leading-none mt-0.5">120+</p>
                </motion.div>

                {/* Floating label — bottom right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.0 }}
                  className="absolute bottom-[18%] right-[-6%] bg-foreground text-background rounded-xl px-4 py-3 shadow-sm pointer-events-none"
                >
                  <p className="text-[10px] uppercase tracking-widest opacity-50">Satisfaction</p>
                  <p className="text-xl font-bold leading-none mt-0.5">98%</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            PROJECT STRIP — horizontal scroll
        ═══════════════════════════════════════ */}
        <div className="pb-24 overflow-hidden">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="container mb-8 flex items-center justify-between"
          >
            <p className="text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Selected Work
            </p>
            <a
              href="#projects"
              className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              View All
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Gradient fade edges */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
            />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
            />

            {/* Scrollable strip */}
            <div
              ref={stripRef}
              className="flex gap-5 px-[clamp(20px,5vw,80px)] overflow-x-auto scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              data-lenis-prevent
            >
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}

              {/* "See all" card */}
              <motion.a
                href="#projects"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-shrink-0 w-[200px] rounded-2xl border border-border flex flex-col items-center justify-center gap-3 hover:bg-muted transition-colors aspect-[4/3]"
                data-cursor-hover
              >
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">All Projects</p>
              </motion.a>
            </div>
          </div>
        </div>

        {/* ─── Bottom Marquee ─── */}
        <div className="border-t border-border py-5 overflow-hidden">
          <InfiniteMarquee speed={50} className="opacity-[0.04]">
            <span className="text-[7rem] font-bold tracking-tighter whitespace-nowrap leading-none">
              JH &bull; EVOLVE &bull; CREATE &bull; DELIVER &bull; PROVE &bull; DIGITAL &bull;
            </span>
          </InfiniteMarquee>
        </div>
      </motion.div>

      {/* ─── Scroll indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-[clamp(20px,5vw,80px)] z-20 flex items-center gap-3"
      >
        <motion.div
          className="w-5 h-8 border border-border/60 rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-2 bg-muted-foreground rounded-full"
          />
        </motion.div>
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
