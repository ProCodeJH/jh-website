"use client";

import { motion } from "motion/react";
import Link from "next/link";
import type { BlogPost as BlogPostType } from "@/lib/blog";
import { TextReveal } from "@/components/animations/text-reveal";

export function BlogPost({ post }: { post: BlogPostType }) {
  // Content is from our own static data (lib/blog.ts), not user input.
  // Safe to render as HTML since we control the source.
  const htmlContent = markdownToHtml(post.content);

  return (
    <article className="section pt-32">
      <div className="container max-w-3xl">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to blog
          </Link>
        </motion.div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted">
              {post.category}
            </span>
            <span className="text-caption">{post.date}</span>
            <span className="text-caption">{post.readTime}</span>
          </div>

          <TextReveal as="h1" className="text-headline" trigger="load" delay={0.1}>
            {post.title}
          </TextReveal>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-body text-muted-foreground mt-4"
          >
            {post.excerpt}
          </motion.p>
        </header>

        {/* Content - static data from lib/blog.ts, safe to render */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-li:text-muted-foreground
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground mb-4">
            프로젝트에 대해 이야기하고 싶으신가요?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </article>
  );
}

/** Simple markdown to HTML for our own static blog content only */
function markdownToHtml(markdown: string): string {
  return markdown
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\- (.*$)/gm, "<li>$1</li>")
    .replace(/\n\n/g, "<br/><br/>")
    .trim();
}
