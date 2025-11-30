// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const { getCartCount } = useContext(ShopContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Catalog", path: "/collection" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="w-full top-0 z-50 bg-[#fffdf8a0]">
      {/* thin social strip */}
      <div className="w-full bg-[#FBF2F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center h-8">
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              {/* <a href="#" aria-label="facebook" className="hover:text-amber-700"><FaFacebookF className="w-3 h-3" /></a> */}
              <a href="#" aria-label="instagram" className="hover:text-amber-700"><FaInstagram className="w-4 h-4" /></a>
              {/* <a href="#" aria-label="youtube" className="hover:text-amber-700"><FaYoutube className="w-3 h-3" /></a> */}
              <a href="#" aria-label="tiktok" className="hover:text-amber-700"><FaTiktok className="w-4 h-4" /></a>
               <a href="#" aria-label="tiktok" className="hover:text-amber-700"><FaWhatsapp className="w-4 h-4" /></a>
              {/* <a href="#" aria-label="twitter" className="hover:text-amber-700"><FaTwitter className="w-3 h-3" /></a> */}
              {/* <a href="#" aria-label="pinterest" className="hover:text-amber-700"><FaPinterest className="w-3 h-3" /></a> */}
            </div>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-25 md:h-[100px]">
          {/* Mobile: Left menu icon */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop: Left nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm ${isActive ? "text-gray-800 underline underline-offset-4" : "text-gray-700 hover:text-pink-800"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Logo center - always centered */}
          <div className="flex-shrink-0 flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none">
            <NavLink to="/" className="block">
              {/* swap src to your logo path */}
              <img src="/images/logo4.png" alt="logo" className=" h-12 md:h-20" />
            </NavLink>
          </div>

          {/* Right controls */}
          <div className="flex items-center space-x-4">
            {/* Desktop search (optional) */}
            {/* <button
              onClick={() => navigate("/search")}
              className="hidden md:block p-2 rounded hover:bg-gray-100 text-gray-700"
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button> */}

            {/* Cart icon - visible on both mobile and desktop */}
            <NavLink to="/cart" className="relative p-2 rounded hover:bg-gray-100 text-gray-700">
              <CiShoppingCart className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-0 -right-0 w-5 h-5 bg-[#eba5aa] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {getCartCount()}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* mobile menu dropdown */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} border-t border-gray-100 bg-[#fffdf8]`}>
        <div className="px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-2 py-2 rounded text-base ${isActive ? "text-amber-800" : "text-gray-700 hover:bg-gray-50"}`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile search (optional) */}
          {/* <button 
            onClick={() => { 
              navigate("/search"); 
              setIsMenuOpen(false); 
            }} 
            className="block w-full text-left px-2 py-2 rounded text-base text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center space-x-2">
              <FiSearch className="h-4 w-4" />
              <span>Search</span>
            </div>
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;