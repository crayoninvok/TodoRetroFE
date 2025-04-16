"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const router = useRouter();

  // Animation trigger for page elements
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      // For demo purposes, just redirect after "authentication"
      setIsLoading(false);
      router.push("/tasks");
    }, 1500);
  };

  return (
    <main className="pt-16 pb-12 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>

      {/* Animated background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink/10 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[800px] h-[800px] bg-blue/10 rounded-full blur-[120px] animate-float-delayed"></div>
      </div>

      <div className="container max-w-md mx-auto px-4 relative z-10">
        {/* Glitch effect overlay */}
        <div id="glitch-effect" className="glitch-overlay"></div>

        <div className={`gradient-border ${isPageLoaded ? "active" : ""}`}>
          <div className="card relative backdrop-blur-lg">
            {/* Scan line effect */}
            <div className="scan-line"></div>

            {/* CRT flicker effect */}
            <div className="crt-flicker"></div>

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

            {error && (
              <div className="bg-pink/20 border border-pink text-white px-4 py-3 rounded mb-6 animate-shake relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink/20 to-transparent animate-pulse"></div>
                <p className="relative z-10 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={`space-y-6 ${
                isPageLoaded ? "animate-stagger-in" : ""
              }`}
            >
              <div className="space-y-2 input-group">
                <label
                  htmlFor="email"
                  className="inline-flex items-center font-medium text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full pl-10 neon-input"
                    placeholder="Enter your email"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink">
                    <span className="text-lg">@</span>
                  </div>
                  <div className="input-glow"></div>
                </div>
              </div>

              <div className="space-y-2 input-group">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="inline-flex items-center font-medium text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue hover:text-pink transition-colors relative group"
                  >
                    Forgot password?
                    <span className="absolute left-0 bottom-0 w-0 h-px bg-pink group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full pl-10 neon-input"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="input-glow"></div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full button bg-gradient-to-r from-pink to-blue hover:from-pink/90 hover:to-blue/90 py-3 relative overflow-hidden group ${
                    isLoading ? "opacity-70 cursor-not-allowed" : "button-glow"
                  }`}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink to-blue opacity-0 group-hover:opacity-50 group-hover:animate-pulse-fast"></span>
                  {isLoading ? (
                    <span className="flex items-center justify-center relative z-10">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span className="loading-text">
                        Logging in<span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </span>
                  ) : (
                    <span className="relative z-10 login-btn-text">Login</span>
                  )}
                </button>
              </div>
            </form>

            <div
              className={`mt-8 text-center text-light-gray ${
                isPageLoaded ? "animate-fade-in-late" : ""
              }`}
            >
              <p>
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-white hover:text-pink transition-colors relative inline-block group"
                >
                  <span className="relative z-10">Register</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-pink to-blue group-hover:w-full transition-all duration-300"></span>
                </Link>
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

            <div
              className={`grid grid-cols-2 gap-4 ${
                isPageLoaded ? "animate-fade-in-late" : ""
              }`}
            >
              <button className="flex justify-center items-center gap-2 px-4 py-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink/0 to-pink/0 group-hover:from-pink/10 group-hover:to-blue/10 transition-all duration-500"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-50 w-0 group-hover:w-full transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-50 w-0 group-hover:w-full transition-all duration-500"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue to-transparent opacity-50 h-0 group-hover:h-full transition-all duration-500"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue to-transparent opacity-50 h-0 group-hover:h-full transition-all duration-500"></div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white relative z-10"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-white relative z-10">Google</span>
              </button>
              <button className="flex justify-center items-center gap-2 px-4 py-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink/0 to-pink/0 group-hover:from-pink/10 group-hover:to-blue/10 transition-all duration-500"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-50 w-0 group-hover:w-full transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink to-transparent opacity-50 w-0 group-hover:w-full transition-all duration-500"></div>
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue to-transparent opacity-50 h-0 group-hover:h-full transition-all duration-500"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue to-transparent opacity-50 h-0 group-hover:h-full transition-all duration-500"></div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white relative z-10"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span className="text-white relative z-10">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Gradient border animation */
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

        /* Input styling */
        .neon-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 50, 150, 0.2);
          transition: all 0.3s;
          position: relative;
        }

        .neon-input:focus {
          border-color: #ff3296;
          box-shadow: 0 0 0 2px rgba(255, 50, 150, 0.3),
            0 0 20px rgba(255, 50, 150, 0.2);
          background: rgba(20, 10, 30, 0.9);
        }

        .input-group {
          position: relative;
          opacity: 0;
          transform: translateY(10px);
        }

        /* Grid background */
        .grid-bg {
          background-image: linear-gradient(
              rgba(50, 100, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(50, 100, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
          background-position: center center;
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

        /* Login button text */
        .login-btn-text {
          position: relative;
          letter-spacing: 1px;
          text-shadow: 0 0 5px rgba(255, 50, 150, 0.5);
        }

        /* Loading animation */
        .loading-text .dot {
          animation: loadingDots 1.4s infinite;
          opacity: 0;
        }

        .loading-text .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-text .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        /* Button glow effect */
        .button-glow {
          box-shadow: 0 0 10px rgba(255, 50, 150, 0.3);
          transition: all 0.3s;
        }

        .button-glow:hover {
          box-shadow: 0 0 20px rgba(255, 50, 150, 0.5);
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

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(15px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }

        @keyframes float-delayed {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(15px) translateX(-15px);
          }
          100% {
            transform: translateY(0) translateX(0);
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

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }

        @keyframes loadingDots {
          0%,
          80%,
          100% {
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
        }

        @keyframes pulse-fast {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.3;
          }
        }

        /* Page entry animations */
        .animate-power-up {
          animation: powerUp 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
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

        .animate-stagger-in .input-group:nth-child(1) {
          animation: fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          animation-delay: 0.3s;
        }

        .animate-stagger-in .input-group:nth-child(2) {
          animation: fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          animation-delay: 0.4s;
        }

        .animate-stagger-in .pt-2 {
          opacity: 0;
          transform: translateY(10px);
          animation: fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          animation-delay: 0.5s;
        }

        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-late {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 0.7s;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 12s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
