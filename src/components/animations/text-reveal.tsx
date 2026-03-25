"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import SplitType from "split-type";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
}

export function TextReveal({
  children,
  className = "",
  as: Tag = "p",
  delay = 0,
  stagger = 0.03,
  trigger = "scroll",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = new SplitType(ref.current, {
      types: "words,chars",
    });

    const chars = split.chars;
    if (!chars) return;

    gsap.set(chars, { opacity: 0, y: 40 });

    if (trigger === "scroll") {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        delay,
        ease: "power3.out",
      });
    }

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [children, delay, stagger, trigger]);

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLParagraphElement>} className={className}>
      {children}
    </Tag>
  );
}
