"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { TextReveal } from "@/components/animations/text-reveal";
import { HoverCard } from "@/components/animations/motion-primitives";

const categoryColors: Record<string, string> = {
  Insight: "bg-blue-500/10 text-blue-600",
  Column: "bg-purple-500/10 text-purple-600",
  Behind: "bg-amber-500/10 text-amber-600",
  Philosophy: "bg-emerald-500/10 text-emerald-600",
};

export function BlogList() {
  const posts = getBlogPosts();

  return (
    <section className="section pt-32">
      <div className="container">
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Blog
          </span>
          <TextReveal as="h1" className="text-headline" trigger="load" delay={0.2}>
            Insights and Stories
          </TextReveal>
          <p className="text-body text-muted-foreground mt-4 max-w-xl">
            인사이트, 칼럼, 프로젝트 비하인드, 운영 철학. SEO 유입과 브랜드
            신뢰를 동시에.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <HoverCard className="group border border-border rounded-2xl p-8 bg-background hover:bg-muted transition-colors h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        categoryColors[post.category] || "bg-muted"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span className="text-caption">{post.date}</span>
                    <span className="text-caption">{post.readTime}</span>
                  </div>

                  <h2 className="text-title mb-3 group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-body text-muted-foreground">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </HoverCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
