"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Typed from "typed.js";
import anime from "animejs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitType from "split-type";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { TextShimmer, InfiniteMarquee } from "@/components/animations/motion-primitives";
import "swiper/css";
import "swiper/css/effect-fade";

const projectImages = [
  { title: "Finance Platform", color: "#e8e4df" },
  { title: "E-Commerce Redesign", color: "#dfe4e8" },
  { title: "Healthcare Dashboard", color: "#e4e8df" },
  { title: "Mobility Service", color: "#e4dfe8" },
  { title: "Brand Identity System", color: "#e8dfdf" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  // ─── motion: scroll parallax ───
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // ─── typed.js ───
    let typed: Typed | undefined;
    if (typedRef.current) {
      typed = new Typed(typedRef.current, {
        strings: [
          "Lead process,",
          "Prove results.",
          "Evolve together.",
        ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 2500,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    }

    // ─── SplitType + GSAP: headline reveal ───
    if (headlineRef.current) {
      const split = new SplitType(headlineRef.current, { types: "words" });
      if (split.words) {
        gsap.fromTo(
          split.words,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.08,
            delay: 0.3,
            ease: "power4.out",
          }
        );
      }
    }

    // ─── GSAP: subhead fade ───
    if (subheadRef.current) {
      gsap.fromTo(
        subheadRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power3.out" }
      );
    }

    // ─── anime.js: horizontal line drawing ───
    if (lineRef.current) {
      anime({
        targets: lineRef.current,
        strokeDashoffset: [1400, 0],
        opacity: [0, 1],
        duration: 2000,
        delay: 800,
        easing: "easeOutExpo",
      });
    }

    // ─── GSAP ScrollTrigger: image section parallax ───
    const imageSection = sectionRef.current.querySelector(".hero-images");
    if (imageSection) {
      gsap.to(imageSection, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
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
      className="relative min-h-screen flex flex-col justify-center bg-background overflow-hidden"
    >
      {/* ─── Main Content ─── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="container relative z-10 pt-32 pb-16"
      >
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-center mb-8"
        >
          <TextShimmer className="text-xs uppercase tracking-[0.4em] font-medium text-muted-foreground" duration={4}>
            Premium Digital Agency
          </TextShimmer>
        </motion.div>

        {/* Headline — SplitType + GSAP word reveal */}
        <h1
          ref={headlineRef}
          className="text-center text-display max-w-4xl mx-auto mb-6"
        >
          Evolving Experiences, Empowering Outcomes.
        </h1>

        {/* Decorative line — anime.js */}
        <div className="flex justify-center mb-8">
          <svg width="200" height="2" className="overflow-visible">
            <line
              ref={lineRef}
              x1="0" y1="1" x2="200" y2="1"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="1400"
              strokeDashoffset="1400"
              opacity="0"
              className="text-muted-foreground/40"
            />
          </svg>
        </div>

        {/* typed.js rotating tagline */}
        <div className="text-center mb-6">
          <span className="text-title text-muted-foreground">
            <span ref={typedRef} />
          </span>
        </div>

        {/* Subhead — GSAP fade */}
        <p
          ref={subheadRef}
          className="text-center text-body text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0"
        >
          경험을 진화시키고, 성과로 증명합니다.
          <br />
          우리는 클라이언트와 함께 진화하며, 오늘과 내일의 가치에 공감하는 사용자 경험을 만듭니다.
        </p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex justify-center gap-4 mb-16"
        >
          <MagneticButton>
            <a
              href="#contact"
              className="group inline-flex items-center px-7 py-3.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-all"
            >
              프로젝트 문의
              <svg
                className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#projects"
              className="inline-flex items-center px-7 py-3.5 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
            >
              Project Journey
            </a>
          </MagneticButton>
        </motion.div>

        {/* ─── Swiper: project image carousel ─── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="hero-images max-w-5xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, EffectFade]}
            slidesPerView={1}
            effect="fade"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            className="rounded-2xl overflow-hidden"
          >
            {projectImages.map((project) => (
              <SwiperSlide key={project.title}>
                <div
                  className="aspect-[16/9] flex items-center justify-center"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="text-center">
                    <span className="text-muted-foreground/40 text-sm uppercase tracking-widest">
                      Featured Project
                    </span>
                    <h3 className="text-2xl font-semibold text-muted-foreground/60 mt-2">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </motion.div>

      {/* ─── Bottom Marquee ─── */}
      <div className="absolute bottom-8 left-0 right-0 z-[1]">
        <InfiniteMarquee speed={40} className="opacity-[0.03]">
          <span className="text-[8rem] font-bold tracking-tighter whitespace-nowrap leading-none">
            JH &bull; EVOLVE &bull; CREATE &bull; DELIVER &bull; PROVE &bull;
          </span>
        </InfiniteMarquee>
      </div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-muted-foreground"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-border/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ height: [3, 10, 3], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 bg-muted-foreground rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
