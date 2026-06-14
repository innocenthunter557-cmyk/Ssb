"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const slides = [
  "/hero/hero1.jpg",
  "/hero/hero2.jpg",
  "/hero/hero3.jpg",
];

export default function LuxuryHero() {
  return (
    <Swiper modules={[Autoplay]} autoplay={{ delay: 3500 }} loop>
      {slides.map((image) => (
        <SwiperSlide key={image}>
          <div
            className="h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="bg-black/40 p-10 rounded-xl text-center">
              <h1 className="text-white text-7xl font-bold">Sri Sai Boutique</h1>
              <p className="text-white mt-4 text-xl">Luxury Bridal Collections</p>
              <a href="#collections" className="gold-btn mt-8 inline-block">
                Explore Collection
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
