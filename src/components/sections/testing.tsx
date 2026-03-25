"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "motion/react";
import { TextReveal } from "@/components/animations/text-reveal";
import { HoverCard } from "@/components/animations/motion-primitives";

// 3D Particle visualization (three.js direct usage)
function TestingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useRef(new Float32Array(count * 3));
  const colors = useRef(new Float32Array(count * 3));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 8;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 8;

      // Green = pass, Red = fail
      const pass = Math.random() > 0.1;
      colors.current[i * 3] = pass ? 0.2 : 0.8;
      colors.current[i * 3 + 1] = pass ? 0.8 : 0.2;
      colors.current[i * 3 + 2] = 0.3;
    }
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.03) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

const testingAreas = [
  {
    title: "Unit & Integration",
    description: "Every component tested in isolation and in context.",
  },
  {
    title: "E2E Automation",
    description: "Full user journeys validated across browsers and devices.",
  },
  {
    title: "Performance Audit",
    description: "Lighthouse 95+, Core Web Vitals optimized, bundle analyzed.",
  },
  {
    title: "Accessibility",
    description: "WCAG 2.1 AA compliance. Every user matters.",
  },
];

export function Testing() {
  return (
    <section id="testing" className="section bg-foreground text-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* 3D Visualization */}
          <div className="h-[400px] rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
              <ambientLight intensity={0.5} />
              <TestingParticles />
            </Canvas>
          </div>

          {/* Content */}
          <div>
            <span className="text-caption uppercase tracking-[0.3em] mb-4 block opacity-60">
              Superior Testing Methodologies
            </span>
            <TextReveal as="h2" className="text-headline mb-6">
              Not just pretty — proven
            </TextReveal>
            <p className="text-body opacity-70 mb-8">
              QA는 개발 후가 아니라, 기획 단계부터 시작됩니다. 예쁘기만 한
              사이트는 만들지 않습니다.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {testingAreas.map((area, i) => (
                <HoverCard
                  key={area.title}
                  className="bg-background/5 border border-background/10 rounded-xl p-5"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4 className="font-medium mb-1">{area.title}</h4>
                    <p className="text-sm opacity-60">{area.description}</p>
                  </motion.div>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
