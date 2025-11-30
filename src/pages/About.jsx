// src/components/AboutSection.jsx
import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="w-full bg-[#ffebea]  py-16 md:py-24">
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
            About Me
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos ullam ab cum porro accusantium suscipit. Dolorum odit numquam pariatur quaerat iure dolorem, nihil corporis commodi ab, doloremque nobis reprehenderit repellat?
            </p>
            <Link to='/contact'>
            <button className="px-8 py-3 bg-[#eba5aa] text-white font-semibold rounded-sm transition duration-200">
              Contact us
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;