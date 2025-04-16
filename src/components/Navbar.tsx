"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Animation state for menu items
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set menu mount state after mobile menu opens for staggered animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMenuMounted(false);
      setTimeout(() => setIsMenuMounted(true), 100);
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  // Navigation links for both desktop and mobile
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Tasks", path: "/tasks" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-opacity-85 backdrop-blur-md py-2 shadow-lg shadow-pink/10"
            : "bg-opacity-40 backdrop-blur-sm py-4"
        } bg-dark-purple`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo area with hamburger menu on mobile */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-full bg-gradient-to-r from-pink to-blue origin-center transition-all duration-300 ${
                    isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-gradient-to-r from-yellow to-orange transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-gradient-to-r from-blue to-pink origin-center transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "transform -rotate-45 -translate-y-2"
                      : ""
                  }`}
                ></span>
              </div>
            </button>

            <Link href="/" className="flex items-center group">
              <span className="text-3xl font-bold gradient-text relative">
                Spektra
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow via-orange to-pink group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              {navLinks.map((link) => (
                <li key={link.path} className="relative">
                  <Link
                    href={link.path}
                    className={`text-white hover:text-pink transition-all duration-300 py-2 px-1 relative group ${
                      pathname === link.path ? "font-semibold text-pink" : ""
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink to-blue transition-all duration-300 ${
                        pathname === link.path
                          ? "w-full"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                    {pathname === link.path && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink/50 blur-sm"></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-white hover:text-pink transition-colors duration-300"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-pink to-blue text-white px-4 py-2 rounded-md hover:shadow-lg hover:shadow-pink/20 transition-all duration-300 hover:-translate-y-1"
            >
              Register
            </Link>
          </div>

          {/* Empty div for mobile spacing */}
          <div className="md:hidden w-8"></div>
        </div>
      </header>

      {/* Mobile Menu - with animations */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black z-[100] animate-fadeIn"
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          <div className="flex flex-col h-full p-6">
            {/* Close button */}
            <div
              className="flex justify-between items-center mb-8 animate-slideInDown"
              style={{ animation: "slideInDown 0.4s ease-out forwards" }}
            >
              <span className="text-3xl font-bold gradient-text">Spektra</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:text-pink transition-colors duration-300"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <ul className="flex flex-col gap-4 mt-4">
              {navLinks.map((link, index) => (
                <li
                  key={link.path}
                  className={`${
                    isMenuMounted
                      ? "animate-slideInRight opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    animation: isMenuMounted
                      ? "slideInRight 0.4s ease-out forwards"
                      : "none",
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-6 py-4 rounded-lg text-xl font-medium transition-all duration-300 ${
                      pathname === link.path
                        ? "bg-pink text-white scale-105 shadow-lg shadow-pink/20"
                        : "bg-[#3D1B3B] text-white hover:bg-pink/60 hover:scale-105"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth buttons for mobile */}
            <div
              className={`flex flex-col gap-3 mt-8 ${
                isMenuMounted ? "animate-slideInRight opacity-100" : "opacity-0"
              }`}
              style={{
                animation: isMenuMounted
                  ? "slideInRight 0.4s ease-out forwards"
                  : "none",
                animationDelay: "0.4s",
              }}
            >
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#3D1B3B] text-white px-6 py-4 rounded-lg text-xl font-medium text-center hover:bg-pink/30 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-pink to-blue text-white px-6 py-4 rounded-lg text-xl font-medium text-center hover:shadow-lg hover:shadow-pink/20 transition-all duration-300"
              >
                Register
              </Link>
            </div>

            {/* Footer */}
            <div
              className={`mt-auto pt-8 ${
                isMenuMounted ? "animate-slideInUp opacity-100" : "opacity-0"
              }`}
              style={{
                animation: isMenuMounted
                  ? "slideInUp 0.4s ease-out forwards"
                  : "none",
                animationDelay: "0.5s",
              }}
            >
              <div className="p-4 bg-[#3D1B3B] rounded-lg">
                <p className="text-white text-sm">
                  Spektra © {new Date().getFullYear()}
                </p>
                <p className="text-white/70 text-sm">
                  Synthwave-inspired task app
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
