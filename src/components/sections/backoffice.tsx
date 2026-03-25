"use client";

import { motion } from "motion/react";
import { TextReveal } from "@/components/animations/text-reveal";
import { LottiePlayer } from "@/components/animations/lottie-player";
import { TiltCard, AnimatedCounter } from "@/components/animations/react-bits";

const stats = [
  { value: 40, suffix: "%", label: "운영 비용 절감" },
  { value: 3, suffix: "x", label: "업무 처리 속도" },
  { value: 99, suffix: "%", label: "시스템 안정성" },
];

const steps = [
  { title: "Audit", description: "현재 시스템과 워크플로우 전수 조사" },
  { title: "Design", description: "최적화된 프로세스 아키텍처 설계" },
  { title: "Migrate", description: "무중단 마이그레이션 실행" },
  { title: "Optimize", description: "지속적 모니터링 및 개선" },
];

export function Backoffice() {
  return (
    <section id="backoffice" className="section bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
              Optimal Back-office Restructuring
            </span>
            <TextReveal as="h2" className="text-headline mb-6">
              Systems that scale with you
            </TextReveal>
            <p className="text-body text-muted-foreground mb-8">
              백오피스는 보이지 않지만, 비즈니스의 심장입니다. 우리는 운영
              효율화, 시스템 정비, 워크플로우 최적화를 통해 보이지 않는 곳에서
              성장을 만듭니다.
            </p>

            {/* Stats with AnimatedCounter */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold">
                    <AnimatedCounter value={stat.value} />
                    {stat.suffix}
                  </div>
                  <p className="text-caption mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Process Steps */}
            <div className="flex flex-col gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <span className="font-medium">{step.title}</span>
                    <span className="text-muted-foreground ml-2 text-sm">
                      {step.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Lottie Animation placeholder */}
          <TiltCard className="perspective-[1000px]">
            <div className="bg-muted rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
              {/* Lottie placeholder - replace path with actual Lottie JSON */}
              <LottiePlayer
                animationData={{
                  v: "5.7.1",
                  fr: 30,
                  ip: 0,
                  op: 60,
                  w: 400,
                  h: 400,
                  nm: "placeholder",
                  ddd: 0,
                  assets: [],
                  layers: [
                    {
                      ddd: 0,
                      ind: 1,
                      ty: 4,
                      nm: "circle",
                      sr: 1,
                      ks: {
                        o: { a: 0, k: 100 },
                        r: { a: 1, k: [{ t: 0, s: [0], e: [360] }, { t: 60, s: [360] }] },
                        p: { a: 0, k: [200, 200, 0] },
                        a: { a: 0, k: [0, 0, 0] },
                        s: { a: 0, k: [100, 100, 100] },
                      },
                      ao: 0,
                      shapes: [
                        {
                          ty: "el",
                          d: 1,
                          s: { a: 0, k: [100, 100] },
                          p: { a: 0, k: [0, 0] },
                        },
                        {
                          ty: "st",
                          c: { a: 0, k: [0.4, 0.4, 0.4, 1] },
                          o: { a: 0, k: 100 },
                          w: { a: 0, k: 2 },
                          lc: 2,
                          lj: 2,
                          d: [{ n: "d", v: { a: 0, k: 10 } }, { n: "g", v: { a: 0, k: 5 } }, { n: "o", v: { a: 0, k: 0 } }],
                        },
                      ],
                      ip: 0,
                      op: 60,
                      st: 0,
                    },
                  ],
                }}
                className="w-48 h-48 opacity-30"
              />
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
