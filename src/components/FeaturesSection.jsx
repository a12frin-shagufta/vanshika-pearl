// src/components/FeaturesSection.jsx
import React from "react";
import { FaShippingFast, FaPalette, FaGem } from "react-icons/fa";

/**
 * FeaturesSection
 * - Responsive 3-column layout that stacks on small screens
 * - Soft circular icon badges with elegant gradient backgrounds
 * - Light, airy design with cute & elegant aesthetics
 *
 * Usage: <FeaturesSection />
 */

const features = [
  {
    id: 1,
    title: "FAST SHIPPING",
    text:
      "We understand the urgency of your hair needs. That's why our streamlined delivery process ensures your beauty and hair products reach your doorstep swiftly.",
    icon: <FaShippingFast className="text-3xl md:text-4xl text-[#f5d3d5]" />,
    // gradient: "from-rose-100 to-pink-100",
    borderColor: "border-pink-200",
    // iconBg: "bg-gradient-to-br from-rose-50 to-pink-50"
  },
  {
    id: 2,
    title: "CREATIVE DESIGNS",
    text:
      "Our designs are a fusion of artistry and functionality. Each piece is meticulously crafted, bearing the mark of unparalleled sophistication and refined design.",
    icon: <FaPalette className="text-3xl md:text-4xl text-[#f5d3d5]" />,
//    gradient: "from-[#eba5aa] to-[#f5d3d5]",
    borderColor: "border-pink-200",
    //  iconBg: "bg-gradient-to-br from-rose-50 to-pink-50"
  },
  {
    id: 3,
    title: "QUALITY MATERIALS",
    text:
      "We take pride in using only the finest materials to create products that not only captivate but also withstand time. We prioritize dedication to ethical practices.",
    icon: <FaGem className="text-3xl md:text-4xl  text-[#f5d3d5]" />,
//    gradient: "from-[#eba5aa] to-[#f5d3d5]",
    borderColor: "border-pink-200",
    //  iconBg: "bg-gradient-to-br from-rose-50 to-pink-50"
  },
];

export default function FeaturesSection() {
  return (
    <section className=" text-gray-700 py-10 mb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {features.map((f) => (
            <article
              key={f.id}
              className="flex flex-col items-center text-center group hover:transform hover:scale-105 transition-all duration-300"
              aria-labelledby={`feature-${f.id}-title`}
            >
              {/* Elegant icon container */}
              <div className="relative mb-10">
                {/* Outer glow effect */}
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${f.gradient} blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                
                {/* Main icon circle */}
                <div className={`relative w-32 h-32 rounded-full ${f.iconBg} border-2 ${f.borderColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {/* Subtle inner shadow */}
                  <div className="absolute inset-2 rounded-full bg-white/50 shadow-inner"></div>
                  
                  {/* Icon with subtle lift effect */}
                  <div className="relative transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300">
                    {f.icon}
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm opacity-70"></div>
                  <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-white rounded-full shadow-sm opacity-50"></div>
                </div>

                {/* Connecting line animation */}
                <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b ${f.gradient} opacity-40 group-hover:h-12 group-hover:opacity-60 transition-all duration-300`}></div>
              </div>

              {/* Content */}
              <h3
                id={`feature-${f.id}-title`}
                className="text-black/80 text-xl font-light tracking-widest mb-5 group-hover:text-gray-900 transition-colors duration-300"
                style={{ letterSpacing: "2px" }}
              >
                {f.title}
              </h3>

              <p className="max-w-[34rem] text-base text-gray-400 leading-7 group-hover:text-gray-700 transition-colors duration-300">
                {f.text}
              </p>

              {/* Subtle decorative elements */}
              <div className="mt-6 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${f.gradient}`}></div>
                <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${f.gradient}`}></div>
                <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${f.gradient}`}></div>
              </div>
            </article>
          ))}
        </div>

        {/* Section decorative border */}
        <div className="mt-20 pt-8 border-t border-gray-100 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-rose-200 via-violet-200 to-cyan-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}