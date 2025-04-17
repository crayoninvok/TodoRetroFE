"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginRequiredPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [isAnimated, setIsAnimated] = useState(false);

  // Start animation after component mounts
  useEffect(() => {
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
  }, []);

  // Countdown timer to redirect to login page
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/login?redirect=true");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-dark-purple">
      <div className="container max-w-lg mx-auto px-4">
        <div className={`gradient-border ${isAnimated ? "active" : ""}`}>
          <div className="card text-center p-8 relative backdrop-blur-lg">
            {/* Scan line effect */}
            <div className="scan-line"></div>

            {/* CRT flicker effect */}
            <div className="crt-flicker"></div>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-pink/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-pink"
                >
                  <rect
                    width="18"
                    height="11"
                    x="3"
                    y="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold gradient-text mb-4">
              Authentication Required
            </h1>

            <p className="text-light-gray mb-6">
              You need to be logged in to access the tasks page. Please sign in
              with your account or create a new one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/login?redirect=true"
                className="flex-1 bg-gradient-to-r from-pink to-blue text-white font-bold py-3 px-6 rounded hover:from-blue hover:to-pink transition-all duration-300 relative group"
              >
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 bg-gradient-to-r from-pink to-blue opacity-0 group-hover:opacity-100 rounded transition-all duration-300 blur-lg"></span>
              </Link>

              <Link
                href="/signup"
                className="flex-1 bg-dark-purple/50 border border-white/20 text-white font-bold py-3 px-6 rounded hover:bg-white/10 transition-all duration-300"
              >
                Create Account
              </Link>
            </div>

            <div className="text-light-gray text-sm">
              Redirecting to login page in{" "}
              <span className="text-pink">{countdown}</span> seconds...
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

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(90deg, #ff3296, #3264ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
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
      `}</style>
    </main>
  );
}
