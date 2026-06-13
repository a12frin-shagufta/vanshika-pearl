import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  "/images/g1.jpeg",
  "/images/112.jpeg",
  "/images/113.jpeg",
  "/images/114.jpeg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
   <section className="relative h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] overflow-hidden bg-[#0d0b08]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] brightness-[0.80] ${
              current === index ? "scale-100" : "scale-105"
            }`}
          />
        </div>
      ))}

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,5,0.88)] via-[rgba(10,8,5,0.15)] to-[rgba(10,8,5,0.4)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,8,5,0.5)] via-transparent to-[rgba(10,8,5,0.5)]" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 z-10 text-center px-4">
        {/* Label */}
        <p
          style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.45em" }}
          className={`text-[#C4A265] text-[9px] uppercase mb-4 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Handcrafted with Devotion
        </p>

        {/* Title */}
        <h1
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
          className={`text-[#f5f0e8] text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-wide transition-all duration-700 delay-500 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Islamic{" "}
          <em className="italic text-[#C4A265] not-italic" style={{ fontStyle: "italic" }}>
            Art
          </em>
        </h1>

        {/* Gold divider */}
        <div
          className={`w-16 h-px my-5 transition-all duration-700 delay-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "linear-gradient(to right, transparent, #C4A265, transparent)" }}
        />

        {/* Subtitle */}
        <p
          style={{ letterSpacing: "0.45em" }}
          className={`text-[rgba(245,240,232,0.5)] text-[10px] uppercase mb-8 transition-all duration-700 delay-[900ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          A Curated Collection
        </p>

        {/* CTA */}
        <Link
          to="/collection"
          style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.4em" }}
          className={`bg-[#C4A265] text-[#0d0b08] px-10 py-[15px] text-[9px] uppercase hover:bg-[#f5f0e8] hover:tracking-[0.5em] transition-all duration-300 transition-all duration-700 delay-[1100ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          Shop Collection →
        </Link>
      </div>

      {/* Slide counter — bottom left */}
      <div
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
        className="absolute bottom-16 left-7 z-10 text-[rgba(196,162,101,0.55)] text-sm tracking-widest"
      >
        <span className="text-[#C4A265] text-xl">{String(current + 1).padStart(2, "0")}</span>
        {" "}/ {String(slides.length).padStart(2, "0")}
      </div>

      {/* Scroll hint — right side */}
      <div className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10 opacity-60">
        <p
          style={{ writingMode: "vertical-rl", letterSpacing: "0.3em" }}
          className="text-[#C4A265] text-[7px] uppercase"
        >
          Scroll
        </p>
        <div
          className="w-px h-10 animate-pulse"
          style={{ background: "linear-gradient(to bottom, transparent, #C4A265)" }}
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[5px] rounded-full transition-all duration-400 ${
              current === index
                ? "w-6 bg-[#C4A265]"
                : "w-[5px] bg-[rgba(245,240,232,0.3)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}