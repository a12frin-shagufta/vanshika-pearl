// src/components/Hero.jsx
import React from "react";

export default function Hero() {
  return (
    <section aria-label="Hero" className="mb-8">
      {/* FULL-BLEED BREAKOUT: forces full viewport width even inside centered parents */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <div className="w-full h-[55vh] sm:h-[60vh] md:h-[70vh] lg:h-[75vh]">
          {/* Desktop/tablet banner */}
          <img
            src="/images/herod.png"
            alt="Hero Desktop"
            className="hidden md:block w-full h-full object-cover block select-none pointer-events-none"
            draggable={false}
          />

          {/* Mobile banner */}
          <img
            src="/images/herom1.png"
            alt="Hero Mobile"
            className="block md:hidden w-full h-full object-contain block select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
