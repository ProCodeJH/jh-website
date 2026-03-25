"use client";

import { motion } from "motion/react";
import { TextReveal } from "@/components/animations/text-reveal";
import { SpotlightCard } from "@/components/animations/react-bits";
import { InfiniteMarquee } from "@/components/animations/motion-primitives";

const vlogs = [
  {
    id: 1,
    title: "A Day at JH Studio",
    titleKo: "JH 스튜디오의 하루",
    date: "2026-03-18",
    duration: "8:42",
    thumbnail: "#1a1a2e",
    tags: ["Daily", "Studio"],
  },
  {
    id: 2,
    title: "Client Meeting Behind",
    titleKo: "클라이언트 미팅 비하인드",
    date: "2026-03-12",
    duration: "12:15",
    thumbnail: "#16213e",
    tags: ["Behind", "Process"],
  },
  {
    id: 3,
    title: "Design Review Session",
    titleKo: "디자인 리뷰 현장",
    date: "2026-03-05",
    duration: "6:30",
    thumbnail: "#0f3460",
    tags: ["Design", "Team"],
  },
  {
    id: 4,
    title: "Setting Up New Workspace",
    titleKo: "새 작업 환경 세팅기",
    date: "2026-02-28",
    duration: "15:20",
    thumbnail: "#533483",
    tags: ["Setup", "Gear"],
  },
  {
    id: 5,
    title: "Late Night Coding Session",
    titleKo: "야근 코딩 세션",
    date: "2026-02-20",
    duration: "10:05",
    thumbnail: "#2c3333",
    tags: ["Coding", "Night"],
  },
  {
    id: 6,
    title: "Team Outing & Brainstorm",
    titleKo: "팀 워크숍 & 브레인스토밍",
    date: "2026-02-15",
    duration: "9:48",
    thumbnail: "#1a1a2e",
    tags: ["Team", "Creative"],
  },
];

export function VlogGallery() {
  return (
    <section className="section pt-32">
      <div className="container">
        {/* Header */}
        <div className="mb-16">
          <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
            Vlog
          </span>
          <TextReveal as="h1" className="text-headline" trigger="load" delay={0.2}>
            Behind the scenes
          </TextReveal>
          <p className="text-body text-muted-foreground mt-4 max-w-xl">
            브랜드의 사람 냄새, 현장감, 팀 분위기. 만드는 과정이 곧 브랜드입니다.
          </p>
        </div>

        {/* Marquee */}
        <InfiniteMarquee speed={20} className="mb-12 opacity-5">
          <span className="text-8xl font-bold tracking-tighter">
            BEHIND THE SCENES &bull; REAL STORIES &bull; OUR DAILY &bull;
          </span>
        </InfiniteMarquee>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vlogs.map((vlog, i) => (
            <motion.div
              key={vlog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              <SpotlightCard className="group rounded-2xl overflow-hidden border border-border bg-background cursor-pointer">
                {/* Thumbnail */}
                <div
                  className="aspect-video relative overflow-hidden"
                  style={{ backgroundColor: vlog.thumbnail }}
                >
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <svg
                        className="w-6 h-6 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Duration badge */}
                  <span className="absolute bottom-3 right-3 text-xs font-mono bg-black/60 text-white px-2 py-1 rounded">
                    {vlog.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex gap-2 mb-2">
                    {vlog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-muted rounded-md text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-title group-hover:text-muted-foreground transition-colors">
                    {vlog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {vlog.titleKo}
                  </p>
                  <span className="text-caption mt-2 block">{vlog.date}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
