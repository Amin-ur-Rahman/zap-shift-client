import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="h-max w-full py-5 ">
      <div className="w-[90dvw] mx-auto my-5 px-4 sm:px-6 lg:px-8 rounded-2xl bg-white ">
        <div className="flex justify-between items-center h-20">
          {/* ----------------logo----------- */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ZapShift</span>
          </Link>

          {/* big screen navigation----------------- */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/services"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Services
            </Link>
            <Link
              to="/coverage"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Coverage
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/pricing"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/rider"
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Be a Rider
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/signin"
              className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/be-a-rider"
              className="btn btn-success bg-lime-400 hover:bg-lime-500 border-0 text-gray-900 font-semibold px-6 py-2.5 rounded-full flex items-center space-x-2"
            >
              <span>Be a rider</span>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <FiArrowRight className="text-white" />
              </div>
            </Link>
          </div>

          {/* -----------------menu button for small screeen------------- */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-900" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* -------------small screens navigations-------------- */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/services"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                to="/coverage"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Coverage
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link
                to="/rider"
                className="text-gray-700 hover:text-gray-900 font-medium py-2 transition-colors"
                onClick={toggleMenu}
              >
                Be a Rider
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <Link
                  to="/signin"
                  className="text-center px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link
                  to="/be-a-rider"
                  className="btn btn-success bg-primary hover:bg-lime-500 border-0 text-gray-900 font-semibold px-6 py-2.5 rounded-full flex items-center justify-center space-x-2"
                  onClick={toggleMenu}
                >
                  <span>Be a rider</span>
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <FiArrowRight className="text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
