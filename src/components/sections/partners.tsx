"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { TextReveal } from "@/components/animations/text-reveal";
import "swiper/css";

const partners = [
  "Google",
  "Samsung",
  "Naver",
  "Kakao",
  "LINE",
  "Coupang",
  "Toss",
  "Hyundai",
  "SK",
  "LG",
];

export function Partners() {
  return (
    <section id="partners" className="section bg-muted">
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
          <SwiperSlide key={`${partner}-${i}`}>
            <div className="flex items-center justify-center h-20 opacity-40 hover:opacity-100 transition-opacity duration-300">
              <span className="text-2xl font-bold tracking-tight text-muted-foreground">
                {partner}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
