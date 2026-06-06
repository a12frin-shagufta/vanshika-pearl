import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const artPieces = [
  { id: 1, src: "/images/i1.jpg", title: "Ayat al-Kursi", subtitle: "Pearl & Gold" },
  { id: 2, src: "/images/i2.jpg", title: "Ayat al-Kursi", subtitle: "Golden Geode" },
  { id: 3, src: "/images/i3.jpg", title: "Asma ul-Husna", subtitle: "The 99 Names" },
  { id: 4, src: "/images/i4.jpg", title: "Ayat al-Kursi", subtitle: "Silver · Allah & Muhammad" },
  { id: 5, src: "/images/i5.jpg", title: "Bismillah", subtitle: "In the Name of God" },
  { id: 6, src: "/images/i6.jpg", title: "MashaAllah", subtitle: "Emerald Geode" },
  { id: 7, src: "/images/i.jpg", title: "Ma sha Allah", subtitle: "La Quwwata Illa Billah" },
  { id: 8, src: "/images/art8.jpeg", title: "Ayat al-Kursi", subtitle: "Rose Quartz" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`bg-[#FAF7F2] transition-all duration-1000 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 flex flex-wrap items-center gap-10">
        
        {/* Left Content */}
        <div className="flex-1 min-w-[240px]">
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#C4A265] mb-4">
            Handcrafted in New York
          </p>

          <h1 className="text-[clamp(2rem,4.5vw,3.4rem)] text-[#3D2B1F] leading-[1.12] font-normal mb-4">
            One of one.
            <br />
            <em>Never the same</em>
            <br />
            piece twice.
          </h1>

          <p className="text-xs text-[#8C7B6E] leading-7 max-w-[300px] mb-6">
            Resin Islamic art poured, painted and finished by hand.
            When a piece sells, it's gone for good.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button to="/collection" solid>
              Shop the Collection
            </Button>

            <Button to="/contact">
              Request a Custom Piece
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 min-w-[260px] relative overflow-hidden aspect-[4/3]">
          <img
            src={artPieces[0].src}
            alt={artPieces[0].title}
            className="w-full h-full object-cover block"
          />

          <div className="absolute inset-3 border border-white/50 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

function Button({ to, children, solid = false }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-6 py-3 text-[9px] tracking-[0.25em] uppercase transition-all duration-300
        ${
          solid
            ? "bg-[#C4A265] text-[#FAF7F2] hover:bg-[#a98a50]"
            : "border border-[#C4A26580] text-[#3D2B1F] hover:border-[#C4A265] hover:bg-[#C4A265]/10"
        }`}
    >
      {children}
    </Link>
  );
}