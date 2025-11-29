// src/components/Hero.jsx
import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    desktop: "/images/herod.png",
    mobile: "/images/herom1.png",
    alt: "Elegant jewelry hero 1",
  },
  // You can duplicate or replace these with other images
  {
    id: 2,
    desktop: "/images/3.png",
    mobile: "/images/2.png",
    alt: "Elegant jewelry hero 2",
  },
  {
    id: 3,
    desktop: "/images/herod.png",
    mobile: "/images/herom1.png",
    alt: "Elegant jewelry hero 3",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  // auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000); // 5s
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (index) => {
    setCurrent((index + total) % total);
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <section aria-label="Hero" className="mb-8">
      {/* FULL-BLEED BREAKOUT */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Desktop / tablet */}
              <img
                src={slide.desktop}
                alt={slide.alt}
                className="hidden md:block w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
              {/* Mobile */}
              <img
                src={slide.mobile}
                alt={slide.alt}
                className="block md:hidden w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          ))}

          {/* Gradient overlay (optional, for text if you add later) */}
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" /> */}

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center text-sm backdrop-blur-sm"
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center text-sm backdrop-blur-sm"
                aria-label="Next slide"
              >
                ›
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(index)}
                  className={`h-2.5 w-2.5 rounded-full border border-white/70 transition-all ${
                    index === current
                      ? "bg-white"
                      : "bg-white/30 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
