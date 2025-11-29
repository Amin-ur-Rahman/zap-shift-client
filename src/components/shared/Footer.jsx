import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ------------logo and a little intro/ outro should I say--------------- */}
        <div className="text-center mb-8">
          <Logo></Logo>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* --------------nav links----------------- */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm">
          <Link
            to="/services"
            className="text-primary hover:text-primary transition-colors"
          >
            Services
          </Link>
          <Link
            to="/coverage"
            className="text-primary hover:text-primary transition-colors"
          >
            Coverage
          </Link>
          <Link
            to="/about"
            className="text-primary hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/pricing"
            className="text-primary hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="/blog"
            className="text-primary hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className="text-primary hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* social links------------------------ */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-white text-lg" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
            aria-label="Twitter"
          >
            <FaXTwitter className="text-white text-lg" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook className="text-white text-lg" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube className="text-white text-xl" />
          </a>
        </div>

        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ZapShift. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
