"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap";

export function useCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  const moveCursor = useCallback((e: MouseEvent) => {
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
        ease: "power2.out",
      });
    }
    if (outlineRef.current) {
      gsap.to(outlineRef.current, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isTouch = "ontouchstart" in window;
    if (isTouch) return;

    window.addEventListener("mousemove", moveCursor);

    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    const addHover = () => document.body.classList.add("cursor-hover");
    const removeHover = () => document.body.classList.remove("cursor-hover");

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [moveCursor]);

  return { dotRef, outlineRef };
}
