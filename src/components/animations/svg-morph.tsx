"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

const paths = {
  circle:
    "M 250 100 C 350 100 400 150 400 250 C 400 350 350 400 250 400 C 150 400 100 350 100 250 C 100 150 150 100 250 100",
  blob1:
    "M 250 80 C 370 80 420 170 400 260 C 380 360 320 420 230 410 C 140 400 80 340 100 240 C 120 140 160 80 250 80",
  blob2:
    "M 270 90 C 380 110 430 190 390 280 C 350 370 280 430 200 400 C 120 370 70 290 110 200 C 150 110 190 70 270 90",
  blob3:
    "M 240 70 C 340 60 410 140 420 240 C 430 340 370 410 270 420 C 170 430 90 370 80 270 C 70 170 140 80 240 70",
};

export function SvgMorph({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const animation = anime({
      targets: pathRef.current,
      d: [
        { value: paths.blob1 },
        { value: paths.blob2 },
        { value: paths.blob3 },
        { value: paths.circle },
      ],
      duration: 8000,
      easing: "easeInOutQuad",
      loop: true,
      direction: "alternate",
    });

    return () => animation.pause();
  }, []);

  return (
    <svg
      viewBox="0 0 500 500"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.1" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={paths.circle}
        fill="url(#morphGradient)"
        stroke="var(--foreground)"
        strokeWidth="1"
        strokeOpacity="0.1"
      />
    </svg>
  );
}

export function AnimeStaggerText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letters = containerRef.current.querySelectorAll(".anime-letter");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: letters,
              opacity: [0, 1],
              translateY: [40, 0],
              rotateX: [90, 0],
              delay: anime.stagger(30),
              duration: 800,
              easing: "easeOutExpo",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ perspective: "500px" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="anime-letter inline-block opacity-0"
          style={{ transformOrigin: "center bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
