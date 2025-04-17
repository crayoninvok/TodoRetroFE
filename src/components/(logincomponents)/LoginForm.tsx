"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { loginUser } from "@/services/auth.service";
import { LoginRequest, User } from "@/types/auth.types";

interface LoginFormProps {
  isPageLoaded: boolean;
  onLogin: (user: User) => void;
}

const LoginForm = ({ isPageLoaded, onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Check for verified=true parameter (from email verification flow)
  useEffect(() => {
    const verified = searchParams.get("verified");
    if (verified === "true") {
      setSuccessMessage("Your email has been verified. You can now log in.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const credentials: LoginRequest = { email, password };
      const response = await loginUser(credentials);

      // Set success message
      setSuccessMessage("Login successful! Redirecting...");

      // Call the onLogin callback provided by the parent component
      onLogin(response.user);
    } catch (err: unknown) {
      console.error("Login error:", err);
      // Type guard to check if the error has a message property
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof err.message === "string"
      ) {
        setError(err.message);
      } else {
        setError("Failed to login. Please check your credentials.");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded text-white">
          {successMessage}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-pink/20 border border-pink rounded text-white">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={isPageLoaded ? "animate-power-up" : ""}
      >
        <div className="mb-4">
          <label className="block text-light-gray text-sm mb-2" htmlFor="email">
            Email
          </label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-purple/50 border border-white/20 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue/50 transition-all"
              placeholder="your@email.com"
              required
            />
            <div className="input-glow"></div>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-light-gray text-sm mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-purple/50 border border-white/20 rounded py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue/50 transition-all"
              placeholder="••••••••"
              required
            />
            <div className="input-glow"></div>
          </div>
          <div className="mt-2 text-right">
            <a
              href="/forgot-password"
              className="text-sm text-blue hover:text-pink transition-colors"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-pink to-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:from-blue hover:to-pink transition-all duration-300 relative group disabled:opacity-70"
        >
          <span className="relative z-10">
            {loading ? "Logging in..." : "Login"}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-pink to-blue opacity-0 group-hover:opacity-100 rounded transition-all duration-300 blur-lg"></span>
        </button>
      </form>

      <style jsx>{`
        .input-container {
          position: relative;
        }

        .input-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        input:focus + .input-glow {
          opacity: 1;
          box-shadow: 0 0 15px rgba(50, 100, 255, 0.4);
        }

        /* Add better input styling */
        input {
          background-color: rgba(30, 15, 45, 0.8) !important;
          color: white !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Color the text and caret */
        input {
          caret-color: #ff3296; /* Pink cursor */
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
