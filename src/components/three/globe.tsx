"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.9, 0.9, 0.9],
      glowColor: [0.1, 0.1, 0.1],
      markers: [
        { location: [37.5665, 126.978], size: 0.08 }, // Seoul
        { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
        { location: [40.7128, -74.006], size: 0.06 }, // NYC
        { location: [51.5074, -0.1278], size: 0.06 }, // London
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
      ],
      onRender: (state: Record<string, number>) => {
        state.phi = phi;
        phi += 0.003;
        state.width = width * 2;
        state.height = width * 2;
      },
    } as Parameters<typeof createGlobe>[1]);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[500px] max-h-[500px]"
        style={{ contain: "layout paint size", opacity: 0.85 }}
      />
    </div>
  );
}
