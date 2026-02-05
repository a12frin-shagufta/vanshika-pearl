// src/components/AboutSection.jsx
import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#ffebea] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* changed items-center → items-start for better visual alignment */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

          {/* IMAGE — slightly bigger than text */}
          <div className="w-full lg:w-[55%] flex justify-center">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-lg border border-[#eba5aa]/20">
              <img
                src="/images/about1.png"
                alt="Vanshine handmade accessories"
                className="w-full h-[480px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#eba5aa]/10 rounded-full -z-10 hidden md:block"></div>
            </div>
          </div>

          {/* TEXT — slightly smaller column */}
          <div className="w-full lg:w-[45%] space-y-6 max-w-xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                About Vanshine
              </h2>
              <div className="w-16 h-1 bg-[#eba5aa] mb-5"></div>
            </div>

            <p className="text-base md:text-md text-gray-700 leading-relaxed">
              At Vanshine, we curate handcrafted fashion accessories made with intention, artistry, and heart.
              Our collection features beaded handbags, hand-wired jewelry, and beautifully crafted crochet pieces—each one handmade by talented women artisans around the world.
            </p>

            <p className="text-base md:text-md text-gray-700 leading-relaxed">
              We believe in fashion with purpose. Every purchase supports women's craftsmanship and empowers their creative independence.
              Whether you're gifting or treating yourself, you're choosing something meaningful, timeless, and made with love.
            </p>

            <div className="pt-4">
              <Link to="/contact">
                <button className="px-8 py-3 bg-[#eba5aa] text-white font-semibold rounded-lg hover:bg-[#e8959a] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Contact us
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
