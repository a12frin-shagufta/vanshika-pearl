// WholesaleBanner.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function WholesaleBanner() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-[#2a1f0e] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[280px]">
        {/* Left — Text */}
        <div className="flex flex-col justify-center px-10 py-14 md:py-16 relative">
          {/* Dot pattern background */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #C4A265 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10">
            {/* Eyebrow */}
            <p
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.45em" }}
              className="text-[#C4A265] text-[9px] uppercase mb-4"
            >
              For Stockists &amp; Planners
            </p>

            {/* Heading */}
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-[#f5f0e8] text-4xl md:text-5xl font-light leading-tight mb-5"
            >
              Wholesale &amp; <br />
              <em className="italic text-[#C4A265]">Bulk Orders</em> Welcome
            </h2>

            {/* Divider */}
            <div
              className="w-12 h-px mb-5"
              style={{
                background: "linear-gradient(to right, #C4A265, transparent)",
              }}
            />

            {/* Body */}
            <p className="text-[rgba(245,240,232,0.55)] text-sm leading-relaxed max-w-sm mb-8">
              Boutiques, Islamic gift shops, masjid stores and event planners —
              carry our designs in small editions or made to order.
            </p>

            {/* CTA */}
            <button
            onClick={() => navigate("/wholesale/products")}
              style={{ fontFamily: "'Cinzel', serif", letterSpacing: "0.35em" }}
              className="inline-block bg-transparent border border-[#C4A265] text-[#C4A265] px-8 py-3 text-[9px] uppercase hover:bg-[#C4A265] hover:text-[#0d0b08] transition-all duration-300 w-fit"
            >
              Apply for Wholesale
            </button>
          </div>
        </div>

        {/* Right — Image */}
        <div className="relative hidden md:block">
          <img
            src="/images/i8.jpeg"
            alt="Wholesale Islamic Art"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
          />
          {/* Left fade into dark bg */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1f0e] via-[rgba(42,31,14,0.3)] to-transparent" />
        </div>
      </div>
    </section>
  );
}
