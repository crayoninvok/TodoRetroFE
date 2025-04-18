"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/auth.types";
import LoginForm from "@/components/(logincomponents)/LoginForm";
import SocialLogin from "@/components/(logincomponents)/SocialLogin";
import BackgroundEffects from "@/components/(logincomponents)/BackgroundEffect";

export default function LoginClient() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.replace("/tasks");
    }
  }, [user, router]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const verified = urlParams.get("verified");
      const redirect = urlParams.get("redirect");

      if (verified === "true") {
        console.log("User has verified their email");
      }

      if (redirect === "true") {
        setRedirectMessage("Please log in to access your tasks");
      }
    }
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchElement = document.getElementById("glitch-effect");
      if (glitchElement) {
        glitchElement.classList.add("active");
        setTimeout(() => {
          glitchElement.classList.remove("active");
        }, 200);
      }
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setTimeout(() => {
      router.push("/tasks");
    }, 1500);
  };

  return (
    <main className="pt-16 pb-12 min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundEffects />

      <div className="container max-w-md mx-auto px-4 relative z-10">
        <div id="glitch-effect" className="glitch-overlay"></div>

        <div className={`gradient-border ${isPageLoaded ? "active" : ""}`}>
          <div className="card relative backdrop-blur-lg">
            <div className="scan-line"></div>
            <div className="crt-flicker"></div>

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

      {/* Kamu bisa biarkan bagian <style jsx> jika memang dibutuhkan */}
    </main>
  );
}
