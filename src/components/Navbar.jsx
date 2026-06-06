import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getCartCount, openCartDrawer } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/collection" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-sm" : ""}`}>
      {/* Social strip */}
      {/* <div className="w-full bg-[#C4A265]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-center gap-5">
            <a href="#" aria-label="instagram" className="text-[#ffff] hover:text-[#D4BC8B] transition-colors"><FaInstagram className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="tiktok" className="text-[#8C7B6E] hover:text-[#D4BC8B] transition-colors"><FaTiktok className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="whatsapp" className="text-[#8C7B6E] hover:text-[#D4BC8B] transition-colors"><FaWhatsapp className="w-3.5 h-3.5" /></a>
          </div>
        </div>
      </div> */}

      {/* Main header */}
      <div className="bg-[#FAF6F1]/95 backdrop-blur-md border-b border-[#E8DDD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen((s) => !s)}
                className="p-2 text-[#5C4A32] hover:text-[#C4A265] transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
              </button>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                      isActive
                        ? "text-[#C4A265] border-b border-[#C4A265] pb-1"
                        : "text-[#5C4A32] hover:text-[#C4A265]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Logo center */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none">
              <NavLink to="/" className="block">
                <img src="/images/logo4.png" alt="logo" className="h-10 md:h-16" />
              </NavLink>
            </div>

            {/* Cart */}
            <div className="flex items-center">
              <button
                onClick={openCartDrawer}
                className="relative p-2 text-[#5C4A32] hover:text-[#C4A265] transition-colors"
                aria-label="Open cart"
              >
                <CiShoppingCart className="h-5 w-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#C4A265] text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-[#FAF6F1] border-b border-[#E8DDD3]`}>
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 text-xs tracking-[0.2em] uppercase transition-colors ${
                  isActive ? "text-[#C4A265]" : "text-[#5C4A32] hover:text-[#C4A265]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
