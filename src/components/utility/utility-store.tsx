"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TextReveal } from "@/components/animations/text-reveal";
import { TiltCard } from "@/components/animations/react-bits";
import { MagneticButton } from "@/components/animations/magnetic-button";

const categories = ["All", "Templates", "Tools", "Guides"];

const products = [
  {
    id: 1,
    name: "Design System Starter Kit",
    category: "Templates",
    price: "Free",
    description:
      "Figma + Code 연동 디자인 시스템 스타터. 컬러, 타이포, 컴포넌트 포함.",
    tags: ["Figma", "React", "Tailwind"],
    featured: true,
  },
  {
    id: 2,
    name: "Landing Page Blueprint",
    category: "Templates",
    price: "\\49,000",
    description:
      "전환율 최적화된 랜딩 페이지 템플릿. Hero부터 CTA까지 13섹션 구조.",
    tags: ["Next.js", "Motion", "GSAP"],
    featured: true,
  },
  {
    id: 3,
    name: "SEO Audit Checklist",
    category: "Tools",
    price: "Free",
    description: "100+ 항목 SEO 점검 체크리스트. 기술 SEO부터 콘텐츠 전략까지.",
    tags: ["SEO", "Notion"],
    featured: false,
  },
  {
    id: 4,
    name: "Project Estimation Calculator",
    category: "Tools",
    price: "\\29,000",
    description:
      "프로젝트 견적 자동 산출기. 범위, 복잡도, 일정 기반 정밀 견적.",
    tags: ["Excel", "Notion"],
    featured: false,
  },
  {
    id: 5,
    name: "UX Research Playbook",
    category: "Guides",
    price: "\\79,000",
    description:
      "사용자 리서치 실전 가이드북. 인터뷰, 설문, 유저빌리티 테스트 포함.",
    tags: ["PDF", "Notion"],
    featured: true,
  },
  {
    id: 6,
    name: "Maintenance SOP Template",
    category: "Guides",
    price: "\\39,000",
    description:
      "웹사이트 유지보수 표준 운영 절차서. 모니터링, 업데이트, 장애 대응.",
    tags: ["Notion", "PDF"],
    featured: false,
  },
];

export function UtilityStore() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="section pt-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Utility Store
          </span>
          <TextReveal as="h1" className="text-headline" trigger="load" delay={0.2}>
            Tools that work
          </TextReveal>
          <p className="text-body text-muted-foreground mt-4 max-w-xl">
            실무에서 검증된 디지털 도구와 템플릿. 바로 쓸 수 있는 것만 올립니다.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
              data-cursor-hover
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard className="h-full">
                  <div className="border border-border rounded-2xl p-6 h-full flex flex-col bg-background hover:bg-muted/50 transition-colors">
                    {product.featured && (
                      <span className="text-xs font-medium px-2 py-0.5 bg-foreground text-background rounded-full self-start mb-3">
                        Featured
                      </span>
                    )}

                    <h3 className="text-title mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-lg font-bold">
                        {product.price}
                      </span>
                      <MagneticButton strength={0.2}>
                        <button className="px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                          {product.price === "Free" ? "Download" : "Get it"}
                        </button>
                      </MagneticButton>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-4">
            맞춤형 도구가 필요하신가요?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
          >
            커스텀 의뢰하기
          </a>
        </motion.div>
      </div>
    </section>
  );
}
