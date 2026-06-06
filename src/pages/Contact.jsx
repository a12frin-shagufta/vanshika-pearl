import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const Contact = () => {
  const BUSINESS_EMAIL = "vanshinecollection@gmail.com";
  const INSTAGRAM_URL = "https://www.instagram.com/vanshinecollection/";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const CONTACT_ENDPOINT = `${backendUrl}/api/contact/submit`;

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) { toast.error("Please fill in your name, email and message."); return; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { toast.error("Please enter a valid email address."); return; }
    try {
      setIsSubmitting(true);
      await axios.post(CONTACT_ENDPOINT, { name: formData.name.trim(), email: formData.email.trim(), subject: formData.subject.trim(), message: formData.message.trim() });
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally { setIsSubmitting(false); }
  };

  const heroImage = "/images/i1.jpg";
  const instaImages = ["/images/i4.png", "/images/i3.jpg", "/images/i4.jpg", "/images/i6.jpg"];

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col">
      {/* Banner */}
      <section className="bg-[#F5F0EB] py-14 md:py-18 border-b border-[#E8DDD3] islamic-pattern-bg">
        <div className="max-w-3xl mx-auto text-center px-4">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C4A265] mb-3">Reach Out</p>
          <h1 className="text-3xl md:text-4xl font-light text-[#3D2B1F] mb-4">Send an Inquiry</h1>
          <div className="w-12 h-px bg-[#C4A265] mx-auto mb-5" />
          <p className="text-sm text-[#8B7355]">
            Questions, thoughts, or a quick hello? Send a message below or reach us at{" "}
            <a href={`mailto:${BUSINESS_EMAIL}`} className="text-[#C4A265] underline underline-offset-2">{BUSINESS_EMAIL}</a>.
          </p>
        </div>
      </section>

      {/* Form section */}
      <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-1 py-14 md:py-18">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div className="overflow-hidden">
              <div className="relative">
                <img src={heroImage} alt="Contact" className="w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#C4A265]/30" />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#C4A265]/30" />
              </div>
            </div>

            <div className="bg-white border border-[#E8DDD3] px-6 md:px-8 py-8">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C4A265] mb-2">Get in touch</p>
              <h2 className="text-2xl md:text-3xl font-light text-[#3D2B1F] mb-6">We'd love to hear from you</h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8B7355]">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#E8DDD3] bg-[#FAF6F1] px-3 py-2.5 text-[#3D2B1F] text-sm focus:outline-none focus:border-[#C4A265] transition-colors" />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8B7355]">Email*</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-[#E8DDD3] bg-[#FAF6F1] px-3 py-2.5 text-[#3D2B1F] text-sm focus:outline-none focus:border-[#C4A265] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8B7355]">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full border border-[#E8DDD3] bg-[#FAF6F1] px-3 py-2.5 text-[#3D2B1F] text-sm focus:outline-none focus:border-[#C4A265] transition-colors" />
                </div>
                <div>
                  <label className="block mb-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8B7355]">Message*</label>
                  <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} className="w-full border border-[#E8DDD3] bg-[#FAF6F1] px-3 py-2.5 text-[#3D2B1F] text-sm resize-none focus:outline-none focus:border-[#C4A265] transition-colors" />
                </div>
                <div className="pt-2">
                  <button type="submit" disabled={isSubmitting}
                    className={`w-full py-3 text-xs tracking-[0.22em] uppercase transition-colors ${isSubmitting ? "bg-[#FAF7F2] text-[#C4B5A5] cursor-not-allowed" : "bg-[#C4A265] text-white hover:bg-[#C4A265]"}`}>
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Instagram */}
      <section className="bg-[#F5F0EB] py-10 border-t border-[#E8DDD3]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#3D2B1F]">Latest on Instagram</h3>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.18em] uppercase text-[#C4A265]">@vanshinecollection</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {instaImages.map((src, idx) => (
              <div key={idx} className="aspect-square overflow-hidden bg-[#E8DDD3]">
                <img src={src} alt={`Instagram ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
