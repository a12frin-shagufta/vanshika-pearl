import React from "react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#D9CDBF] text-[#8C7B6E] py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Decorative separator */}
        <div className="flex items-center justify-center mb-12">
          <div className="h-px w-16 bg-[#C4A265]/30" />
          <div className="mx-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" fill="#C4A265" opacity="0.45"/></svg>
          </div>
          <div className="h-px w-16 bg-[#C4A265]/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <img src="/images/logo4.png" alt="" className="h-16 w-auto mb-5 opacity-75" />
            <div className="flex gap-4 mt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#8C7B6E]/60 hover:text-[#C4A265] transition-colors"><FaInstagram className="w-4 h-4" /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#8C7B6E]/60 hover:text-[#C4A265] transition-colors"><FaTiktok className="w-4 h-4" /></a>
              <a href="" target="_blank" rel="noopener noreferrer" className="text-[#8C7B6E]/60 hover:text-[#C4A265] transition-colors"><FaWhatsapp className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#A0845C] mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[{ to: "/", label: "Home" }, { to: "/collection", label: "Shop" }, { to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }].map(l => (
                <li key={l.to}><Link to={l.to} className="text-xs text-[#7A6A5E]/80 hover:text-[#A0845C] transition-colors tracking-wide">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#A0845C] mb-5">Policies</h3>
            <ul className="space-y-2.5">
              {[{ to: "/refund-policy", label: "Refund Policy" }, { to: "/terms-conditions", label: "Terms & Conditions" }, { to: "/privacy-policy", label: "Privacy Policy" }].map(l => (
                <li key={l.to}><Link to={l.to} className="text-xs text-[#7A6A5E]/80 hover:text-[#A0845C] transition-colors tracking-wide">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[10px] tracking-[0.25em] uppercase text-[#A0845C] mb-5">Contact Us</h3>
            <ul className="space-y-2.5 text-xs text-[#7A6A5E]/80 tracking-wide">
              <li>vanshinecollection@gmail.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#C4A265]/20 text-center">
          <p className="text-[10px] text-[#7A6A5E]/50 tracking-widest uppercase">
            &copy; {new Date().getFullYear()} vanshinecollection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;