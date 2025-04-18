"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, setUser } = useAuth();
  const router = useRouter();

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
    setIsProfileMenuOpen(false);
  }, [pathname]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileMenu = document.getElementById("profile-menu");
      const profileButton = document.getElementById("profile-button");

      if (
        profileMenu &&
        profileButton &&
        !profileMenu.contains(event.target as Node) &&
        !profileButton.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Handle logout
 const handleLogout = async () => {
   try {
     await logout(); // Wait for the logout API call to complete
     setUser(null); // Update auth context

     // Close menus
     setIsProfileMenuOpen(false);
     setIsMobileMenuOpen(false);

     // Make sure router exists before trying to navigate
     if (router) {
       // Ensure this runs after state updates
       setTimeout(() => {
         router.push("/");
       }, 0);
     }
   } catch (error) {
     console.error("Logout error:", error);
   }
 };

  // Navigation links for both desktop and mobile
  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Tasks", path: "/tasks", icon: "✓" },
    { name: "About", path: "/about", icon: "ℹ️" },
  ];

  // Get first name for display
  const getFirstName = () => {
    if (!user || !user.name) return "User";
    return user.name.split(" ")[0];
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const nameParts = user.name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

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
            {/* Hamburger Menu Button with white color for visibility */}
            <button
              className="md:hidden text-white focus:outline-none transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-8 flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-full bg-white origin-center transition-all duration-300 ${
                    isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white origin-center transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "transform -rotate-45 -translate-y-2"
                      : ""
                  }`}
                ></span>
              </div>
            </button>

            <Link href="/" className="flex items-center group">
              <span className="text-3xl font-bold gradient-text relative">
                Fraud
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

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  id="profile-button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink/20 to-blue/20 hover:from-pink/30 hover:to-blue/30 text-white px-3 py-1.5 rounded-full transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink to-blue flex items-center justify-center text-white font-semibold">
                    {getUserInitials()}
                  </div>
                  <span>{getFirstName()}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${
                      isProfileMenuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                  <div
                    id="profile-menu"
                    className="absolute right-0 mt-2 w-48 bg-dark-purple/95 backdrop-blur-md border border-white/10 rounded-md shadow-lg shadow-pink/10 overflow-hidden z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-white font-semibold truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-white/70 truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-pink hover:bg-white/10 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Empty div for mobile spacing */}
          <div className="md:hidden w-8">
            {user && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-pink to-blue flex items-center justify-center text-white font-semibold"
              >
                {getUserInitials()}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu with transparent background */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] animate-fadeIn"
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
        >
          <div className="flex flex-col h-full p-6 relative overflow-hidden">
            {/* Header with logo and close button */}
            <div
              className="flex justify-between items-center mb-8 animate-slideInDown"
              style={{ animation: "slideInDown 0.4s ease-out forwards" }}
            >
              <span className="text-3xl font-bold gradient-text">Fraud</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:text-pink transition-colors duration-300"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
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

            {/* User profile info when logged in */}
            {user && (
              <div
                className={`px-6 py-4 rounded-xl mb-6 border border-[#3D1B3B]/50 ${
                  isMenuMounted
                    ? "animate-slideInRight opacity-100"
                    : "opacity-0"
                }`}
                style={{
                  animation: isMenuMounted
                    ? "slideInRight 0.4s ease-out forwards"
                    : "none",
                  animationDelay: "0.1s",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-pink to-blue flex items-center justify-center text-white text-xl font-bold">
                    {getUserInitials()}
                  </div>
                  <div>
                    <p className="text-white text-lg font-semibold">
                      {user.name}
                    </p>
                    <p className="text-white/70 text-sm">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation links with icons - ALL WITH SAME STYLING */}
            <ul className="flex flex-col gap-4 mt-6">
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
                    animationDelay: `${(index + (user ? 1 : 0)) * 0.1}s`,
                  }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-center px-6 py-4 rounded-xl text-xl font-medium transition-all duration-300 ${
                      pathname === link.path
                        ? "bg-pink text-white shadow-lg shadow-pink/20"
                        : "bg-transparent text-white hover:bg-[#3D1B3B] border border-[#3D1B3B]/50"
                    }`}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 mr-3">
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Auth buttons or User profile/logout */}
            <div className="flex flex-col gap-4 mt-10">
              {user ? (
                <button
                  onClick={handleLogout}
                  className={`bg-transparent text-pink px-6 py-4 rounded-xl text-xl font-medium hover:bg-[#3D1B3B] transition-all duration-300 border border-pink/30 flex items-center justify-center ${
                    isMenuMounted
                      ? "animate-slideInRight opacity-100"
                      : "opacity-0"
                  }`}
                  style={{
                    animation: isMenuMounted
                      ? "slideInRight 0.4s ease-out forwards"
                      : "none",
                    animationDelay: `${(navLinks.length + 1) * 0.1}s`,
                  }}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 mr-3">
                    🚪
                  </span>
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`bg-transparent text-white px-6 py-4 rounded-xl text-xl font-medium hover:bg-[#3D1B3B] transition-all duration-300 border border-[#3D1B3B]/50 flex items-center justify-center ${
                      isMenuMounted
                        ? "animate-slideInRight opacity-100"
                        : "opacity-0"
                    }`}
                    style={{
                      animation: isMenuMounted
                        ? "slideInRight 0.4s ease-out forwards"
                        : "none",
                      animationDelay: `${navLinks.length * 0.1 + 0.1}s`,
                    }}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 mr-3">
                      🔑
                    </span>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`bg-transparent text-white px-6 py-4 rounded-xl text-xl font-medium hover:bg-[#3D1B3B] transition-all duration-300 border border-[#3D1B3B]/50 flex items-center justify-center ${
                      isMenuMounted
                        ? "animate-slideInRight opacity-100"
                        : "opacity-0"
                    }`}
                    style={{
                      animation: isMenuMounted
                        ? "slideInRight 0.4s ease-out forwards"
                        : "none",
                      animationDelay: `${navLinks.length * 0.1 + 0.2}s`,
                    }}
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 mr-3">
                      ✨
                    </span>
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Footer - TRANSPARENT BACKGROUND */}
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
              <div className="p-6 bg-transparent rounded-xl border border-[#3D1B3B]/50 text-center">
                <p className="text-white text-base font-medium">
                  Fraud © {new Date().getFullYear()}
                </p>
                <p className="text-white/70 text-sm mt-1">
                  Synthwave-inspired task app
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
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
