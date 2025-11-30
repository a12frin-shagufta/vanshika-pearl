// src/components/AboutSection.jsx
import React from "react";

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* IMAGE - Larger and cleaner */}
          <div className="w-full lg:w-1/2">
            <img
              src="/images/about.png"
              alt="Happy girl"
              className="w-full h-80 lg:h-96 rounded-3xl object-cover shadow-xl"
            />
          </div>

          {/* TEXT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a paragraph. Click here to add your own text and edit me.
              It's easy. Just click "Edit Text" or double click me to add
              your own content and make changes to the font.
            </p>

            <button className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition duration-200">
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;