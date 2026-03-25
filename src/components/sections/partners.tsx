"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { TextReveal } from "@/components/animations/text-reveal";
import "swiper/css";

type PartnerLogo = {
  name: string;
  className: string;
  letterSpacing?: string;
};

const partners: PartnerLogo[] = [
  {
    name: "Google",
    className: "text-2xl font-normal tracking-wide",
  },
  {
    name: "Samsung",
    className: "text-xl font-black tracking-tighter uppercase",
  },
  {
    name: "NAVER",
    className: "text-2xl font-extrabold tracking-tight",
  },
  {
    name: "kakao",
    className: "text-2xl font-bold tracking-widest lowercase",
  },
  {
    name: "LINE",
    className: "text-2xl font-black tracking-[0.2em] uppercase",
  },
  {
    name: "Coupang",
    className: "text-2xl font-semibold italic tracking-tight",
  },
  {
    name: "toss",
    className: "text-3xl font-black tracking-tighter lowercase",
  },
  {
    name: "HYUNDAI",
    className: "text-lg font-light tracking-[0.4em] uppercase",
  },
  {
    name: "SK",
    className: "text-3xl font-black tracking-widest",
  },
  {
    name: "LG",
    className: "text-3xl font-extralight tracking-[0.5em]",
  },
];

export function Partners() {
  return (
    <section id="partners" className="section bg-muted">
      {/* Top separator */}
      <div className="container">
        <div className="h-px bg-border mb-12" />
      </div>

      <div className="container mb-12">
        <span className="text-caption uppercase tracking-[0.3em] mb-4 block">
          Partners & Companions
        </span>
        <TextReveal as="h2" className="text-headline max-w-2xl">
          Trusted by industry leaders
        </TextReveal>
      </div>

      {/* Infinite Logo Loop */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={60}
        slidesPerView={3}
        loop
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="partner-swiper"
      >
        {[...partners, ...partners].map((partner, i) => (
          <SwiperSlide key={`${partner.name}-${i}`}>
            <div className="flex items-center justify-center h-20 opacity-30 hover:opacity-90 transition-opacity duration-300">
              <span className={`text-foreground select-none ${partner.className}`}>
                {partner.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom separator */}
      <div className="container">
        <div className="h-px bg-border mt-12" />
      </div>
    </section>
  );
}
