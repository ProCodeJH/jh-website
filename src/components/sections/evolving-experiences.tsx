"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function EvolvingExperiences() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const words = textRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      }
    );

    // Background color transition
    gsap.to(sectionRef.current, {
      backgroundColor: "#0a0a0a",
      color: "#fafafa",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "top 20%",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const headline = "Evolving Experiences Empowering Outcomes";
  const words = headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="section min-h-screen flex items-center bg-background transition-colors"
    >
      <div className="container">
        <h2 ref={textRef} className="text-display max-w-5xl">
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>
        <p className="text-body text-muted-foreground max-w-xl mt-8">
          경험 개선이 실제 성과로 이어진다는 것을 증명합니다.
          <br />
          우리는 단순한 디자인이 아닌, 비즈니스 성장을 만듭니다.
        </p>
      </div>
    </section>
  );
}
