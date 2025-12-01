// src/pages/Contact.jsx (or wherever you keep it)
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";


const Contact = () => {
  const BUSINESS_EMAIL = "centsandsoul@gmail.com";
  const INSTAGRAM_URL = "https://www.instagram.com/vanshinecollection/";

   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const CONTACT_ENDPOINT = `${backendUrl}/api/contact/submit`;

  // simple local form state (you can connect to backend later)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


 

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(CONTACT_ENDPOINT, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      toast.success("Message sent successfully! 💌");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // change to your own images
  const heroImage =
    "/images/hero.png";
  const instaImages = [
    "/images/i4.png",
     "/images/i3.png",
      "/images/i2.png",
      "/images/i1.png",
  ];

  return (
    <div className="min-h-screen bg-[#f8f2ee] flex flex-col">
      {/* Top banner */}
      <section className="bg-[#f4ece7] py-12 md:py-16 border-b border-[#e5d7cf]">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="mb-3 text-3xl">🎀</div>
          <h1 className="text-2xl md:text-3xl font-serif tracking-[0.18em] uppercase text-[#3a2d2a] mb-3">
            Send an Inquiry
          </h1>
          <p className="text-sm md:text-base text-[#7d6b63]">
            Questions, thoughts, or a quick hello? Send a message below or reach
            us at{" "}
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="underline underline-offset-2"
            >
              {BUSINESS_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Main content: image + form */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 py-12 md:py-16"
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-start">
            {/* Left image */}
            <div className="overflow-hidden">
              <div className=" shadow-md">
                <img
                  src={heroImage}
                  alt="Working at a laptop"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right form */}
            <div className="bg-white shadow-md border border-[#f1e3da] px-6 md:px-8 py-8">
              <p className="tracking-[0.25em] text-[11px] text-[#b9a79c] mb-2 uppercase">
                Get in touch
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-[#3a2d2a] mb-6">
                We&apos;d love to hear from you!
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-[11px] tracking-[0.18em] uppercase text-[#a28f84]">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-[#f1e3da] bg-[#fbf7f4] px-3 py-2 text-[#4c3b33] focus:outline-none focus:ring-1 focus:ring-[#d9b7a4]"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-[11px] tracking-[0.18em] uppercase text-[#a28f84]">
                      Email*
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-[#f1e3da] bg-[#fbf7f4] px-3 py-2 text-[#4c3b33] focus:outline-none focus:ring-1 focus:ring-[#d9b7a4]"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-1 text-[11px] tracking-[0.18em] uppercase text-[#a28f84]">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-[#f1e3da] bg-[#fbf7f4] px-3 py-2 text-[#4c3b33] focus:outline-none focus:ring-1 focus:ring-[#d9b7a4]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-1 text-[11px] tracking-[0.18em] uppercase text-[#a28f84]">
                    Message*
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-[#f1e3da] bg-[#fbf7f4] px-3 py-2 text-[#4c3b33] resize-none focus:outline-none focus:ring-1 focus:ring-[#d9b7a4]"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
  type="submit"
  disabled={isSubmitting}
  className={`w-full bg-[#d9b7a4] text-white tracking-[0.22em] text-[11px] py-3 uppercase shadow-sm transition-colors ${
    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#c79f8a]"
  }`}
>
  {isSubmitting ? "Sending..." : "Submit"}
</button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Latest on Instagram */}
      <section className="bg-[#f4ece7] py-8 md:py-10 border-t border-[#e5d7cf]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="tracking-[0.2em] text-xs uppercase text-[#3a2d2a]">
              Latest on Instagram
            </h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.18em] uppercase text-[#b19a8f]"
            >
              @vanshinecollection
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {instaImages.map((src, idx) => (
              <div key={idx} className="aspect-[2/2] overflow-hidden bg-[#e8ddd6]">
                <img
                  src={src}
                  alt={`Instagram ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
