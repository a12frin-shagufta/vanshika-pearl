import React from "react";
import { FaShippingFast, FaPalette, FaGem } from "react-icons/fa";

const features = [
  {
    id: 1,
    title: "Fast Shipping",
    text: "We understand the urgency of your needs. Our streamlined delivery process ensures your products reach your doorstep swiftly and safely.",
    icon: <FaShippingFast className="text-2xl text-[#C4A265]" />,
  },
  {
    id: 2,
    title: "Creative Designs",
    text: "Our designs are a fusion of artistry and functionality. Each piece is meticulously crafted, bearing the mark of unparalleled sophistication.",
    icon: <FaPalette className="text-2xl text-[#C4A265]" />,
  },
  {
    id: 3,
    title: "Quality Materials",
    text: "We take pride in using only the finest materials to create products that not only captivate but also withstand the test of time.",
    icon: <FaGem className="text-2xl text-[#C4A265]" />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-[#F5F0EB] islamic-pattern-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-light text-[#3D2B1F]">Our Promise</h2>
          <div className="w-12 h-px bg-[#C4A265] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f) => (
            <article
              key={f.id}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-white border border-[#E8DDD3] flex items-center justify-center mb-6 group-hover:border-[#C4A265] transition-colors duration-300 shadow-sm">
                {f.icon}
              </div>

              <h3 className="text-sm tracking-[0.2em] uppercase text-[#3D2B1F] mb-4 font-medium">
                {f.title}
              </h3>

              <p className="text-sm text-[#8B7355] leading-relaxed max-w-xs">
                {f.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
