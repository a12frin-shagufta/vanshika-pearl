import React from 'react';
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" bg-[#FBF2F5] py-10 px-4 sm:px-6 lg:px-8 border-t border-black/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="flex flex-col items-center sm:items-start">
            <img 
              src="/images/logo.png" 
              alt="" 
              className="h-20 w-auto mb-4"
            />
            <p className="text-gray-600 text-sm mb-4 sm:mb-6 max-w-xs text-center sm:text-left">
              Handcrafted jewelry blending tradition with contemporary design
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400  transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a 
                href="" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400  transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-black/80 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                 <Link
    to="/"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="text-black/80 hover:text-gray-400 text-xs sm:text-sm transition-colors"
  >
    Home
  </Link>
              </li>
              <li>
                <Link 
                  to="/collection" 
                  className="text-gray-600 text-xs sm:text-sm transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 text-xs sm:text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-600 text-xs sm:text-sm transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-gray-600 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Policies</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link 
                  to="/refund-policy" 
                  className="text-gray-600 text-xs sm:text-sm transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-conditions" 
                  className="text-gray-600 text-xs sm:text-sm transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-gray-600 text-xs sm:text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-black/80 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h3>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <li>centsandsoul@gmail.com</li>
              {/* <li>+92 317 1731789</li> */}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="  mt-6 pt-6 text-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} vanshinecollection's profile picture
vanshinecollection
. All rights reserved. 
          </p>
          {/* <p className="text-xs text-gray-600 mt-1">
            Handmade with love in Pakistan
          </p> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;