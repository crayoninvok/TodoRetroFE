"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/auth.types";
import LoginForm from "@/components/(logincomponents)/LoginForm";
import SocialLogin from "@/components/(logincomponents)/SocialLogin";
import BackgroundEffects from "@/components/(logincomponents)/BackgroundEffect";

export default function LoginPage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const searchParams = useSearchParams();
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

  // Redirect already logged-in users to tasks page
  useEffect(() => {
    if (user) {
      router.replace("/tasks");
    }
  }, [user, router]);

  // Animation trigger for page elements
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Check for redirect parameters
  useEffect(() => {
    const verified = searchParams.get("verified");
    const redirect = searchParams.get("redirect");

    if (verified === "true") {
      console.log("User has verified their email");
    }

    if (redirect === "true") {
      setRedirectMessage("Please log in to access your tasks");
    }
  }, [searchParams]);

  // Random glitch effect interval
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchElement = document.getElementById("glitch-effect");
      if (glitchElement) {
        glitchElement.classList.add("active");
        setTimeout(() => {
          glitchElement.classList.remove("active");
        }, 200);
      }
    }, Math.random() * 5000 + 3000); // Random interval between 3-8 seconds

    return () => clearInterval(glitchInterval);
  }, []);

  const handleLogin = (userData: User) => {
    // Set user in the auth context
    setUser(userData);

    // Redirect to tasks page with animation delay
    setTimeout(() => {
      router.push("/tasks");
    }, 1500);
  };

  return (
    <main className="pt-16 pb-12 min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundEffects />

      <div className="container max-w-md mx-auto px-4 relative z-10">
        {/* Glitch effect overlay */}
        <div id="glitch-effect" className="glitch-overlay"></div>

        <div className={`gradient-border ${isPageLoaded ? "active" : ""}`}>
          <div className="card relative backdrop-blur-lg">
            {/* Scan line effect */}
            <div className="scan-line"></div>

            {/* CRT flicker effect */}
            <div className="crt-flicker"></div>

            {/* Redirect message */}
            {redirectMessage && (
              <div className="mb-6 p-3 bg-blue-500/20 border border-blue-500 rounded text-white text-center">
                {redirectMessage}
              </div>
            )}

            <div
              className={`text-center mb-8 ${
                isPageLoaded ? "animate-power-up" : ""
              }`}
            >
              <h1 className="text-4xl font-bold gradient-text mb-2 relative inline-block">
                <span className="login-text">Login</span>
                <span className="login-text-shadow">Login</span>
              </h1>
              <p className="text-light-gray glow-text">
                Welcome back to Spektra
              </p>
            </div>

            <LoginForm isPageLoaded={isPageLoaded} onLogin={handleLogin} />

            <div
              className={`mt-8 text-center text-light-gray ${
                isPageLoaded ? "animate-fade-in-late" : ""
              }`}
            >
              <p>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-white hover:text-pink transition-colors relative inline-block group"
                >
                  <span className="relative z-10">Register</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink to-blue group-hover:w-full transition-all duration-300"></span>
                </a>
              </p>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-dark-purple text-light-gray">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <SocialLogin isPageLoaded={isPageLoaded} />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Styling remains the same as before */
        .gradient-border {
          position: relative;
          border-radius: 0.75rem;
          padding: 0.25rem;
          background: linear-gradient(
            90deg,
            rgba(255, 50, 150, 0.2),
            rgba(50, 100, 255, 0.2)
          );
          background-size: 300% 300%;
          animation: gradientMove 8s ease infinite;
          opacity: 0;
          transform: translateY(20px) scale(0.98);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .gradient-border.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .gradient-border::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(90deg, #ff3296, #3264ff, #ff3296);
          background-size: 300% 300%;
          border-radius: 0.85rem;
          z-index: -1;
          animation: gradientMove 8s ease infinite;
          opacity: 0.7;
        }

        /* Card styling */
        .card {
          background-color: rgba(20, 10, 30, 0.8);
          border-radius: 0.5rem;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Scan line effect */
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          opacity: 0.5;
          animation: scanLine 8s linear infinite;
          z-index: 1;
        }

        /* CRT flicker */
        .crt-flicker {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.03);
          opacity: 0;
          pointer-events: none;
          animation: crtFlicker 0.15s infinite alternate;
          z-index: 0;
        }

        /* Glitch overlay */
        .glitch-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 50, 150, 0.05);
          opacity: 0;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 100;
        }

        .glitch-overlay.active {
          animation: glitch 0.2s ease;
        }

        /* Glow text */
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        /* Text animation */
        .login-text {
          position: relative;
          background: linear-gradient(90deg, #ff3296, #3264ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-text-shadow {
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(90deg, #ff3296, #3264ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0.4;
          filter: blur(8px);
          transform: translateY(2px);
        }

        /* Animation keyframes */
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(1000%);
          }
        }

        @keyframes crtFlicker {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 0.1;
          }
        }

        @keyframes glitch {
          0% {
            opacity: 1;
            transform: translateX(-10px) skew(-20deg);
          }
          20% {
            opacity: 0;
          }
          40% {
            opacity: 1;
            transform: translateX(10px) skew(20deg);
          }
          60% {
            opacity: 0;
          }
          80% {
            opacity: 1;
            transform: translateX(-5px) skew(-10deg);
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes powerUp {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-power-up {
          animation: powerUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .animate-fade-in-late {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 0.7s;
        }
      `}</style>
    </main>
  );
}
