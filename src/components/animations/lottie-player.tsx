"use client";

import { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

interface LottiePlayerProps {
  animationData?: Record<string, unknown>;
  path?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  speed?: number;
}

export function LottiePlayer({
  animationData,
  path,
  loop = true,
  autoplay = true,
  className = "",
  speed = 1,
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop,
      autoplay,
      ...(animationData ? { animationData } : { path }),
    });

    animRef.current.setSpeed(speed);

    return () => {
      animRef.current?.destroy();
    };
  }, [animationData, path, loop, autoplay, speed]);

  return <div ref={containerRef} className={className} />;
}
