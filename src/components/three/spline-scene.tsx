"use client";

import { Suspense } from "react";
import Spline from "@splinetool/react-spline";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className = "" }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
