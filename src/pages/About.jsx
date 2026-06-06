import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#F5F0EB] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative overflow-hidden max-w-md">
              <img
                src="/images/about1.png"
                alt="Vanshine handmade accessories"
                className="w-full h-[420px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#C4A265]/40" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C4A265]/40" />
            </div>
          </div>

          {/* Text */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-4">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F] mb-6">
              About Vanshine
            </h2>
            <div className="w-12 h-px bg-[#C4A265] mb-8" />

            <p className="text-sm md:text-base text-[#5C4A32] leading-relaxed mb-5">
              At Vanshine, we curate handcrafted fashion accessories made with intention, artistry, and heart.
              Our collection features beaded handbags, hand-wired jewelry, and beautifully crafted crochet pieces — each one handmade by talented women artisans around the world.
            </p>

            <p className="text-sm md:text-base text-[#5C4A32] leading-relaxed mb-8">
              We believe in fashion with purpose. Every purchase supports women's craftsmanship and empowers their creative independence.
              Whether you're gifting or treating yourself, you're choosing something meaningful, timeless, and made with love.
            </p>

            <Link to="/contact">
              <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase border border-[#3D2B1F] text-[#3D2B1F] hover:bg-[#3D2B1F] hover:text-white transition-all duration-300">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
