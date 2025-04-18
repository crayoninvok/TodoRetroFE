"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useRegister";
import { RegisterRequest } from "@/types/auth.types";

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectPath?: string;
}

export default function RegisterForm({
  onSuccess,
  redirectPath = "/login?verified=pending",
}: RegisterFormProps = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const {
    register,
    isLoading,
    error: apiError,
    isSuccess,
    clearError,
  } = useRegister();

  // Clear API error when form values change
  useEffect(() => {
    if (apiError) {
      clearError();
    }
  }, [name, email, password, confirmPassword, clearError, apiError]);

  const validateForm = (): boolean => {
    if (!name || !email || !password || !confirmPassword) {
      setFormError("Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return false;
    }

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }

    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userData: RegisterRequest = {
      name,
      email,
      password,
    };

    try {
      await register(userData);

      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Redirect to specified path
      router.push(redirectPath);
    } catch (err) {
      // Error is already handled by the hook
      // and will be displayed from the apiError state
    }
  };

  // Use API error if available, otherwise use form validation error
  const displayError = apiError || formError;

  return (
    <div className="container max-w-md mx-auto px-4 animate-fade-in">
      <div className="gradient-border">
        <div className="card">
          <div className="text-center mb-8 animate-slide-up">
            <h1 className="text-4xl font-bold gradient-text mb-2">Register</h1>
            <p className="text-light-gray">Create your Fraud account</p>
          </div>

          {displayError && (
            <div className="bg-pink/20 border border-pink text-white px-4 py-3 rounded mb-6 animate-shake">
              <p>{displayError}</p>
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-500/20 border border-green-500 text-white px-4 py-3 rounded mb-6">
              <p>
                Registration successful! Please check your email to verify your
                account.
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block text-white font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-white font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input w-full"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-white font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input w-full"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-light-gray">
                Must be at least 8 characters long
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-white font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input w-full"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center pt-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 accent-pink cursor-pointer"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-light-gray">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-blue hover:text-pink transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue hover:text-pink transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full button bg-gradient-to-r from-pink to-blue hover:from-pink/90 hover:to-blue/90 py-3 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div
            className="mt-8 text-center text-light-gray animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-white hover:text-pink transition-colors"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-dark-purple text-light-gray">
                OR REGISTER WITH
              </span>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-4 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <button
              type="button"
              onClick={() => console.log("Google sign-in")}
              className="flex justify-center items-center gap-2 px-4 py-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-white">Google</span>
            </button>
            <button
              type="button"
              onClick={() => console.log("Facebook sign-in")}
              className="flex justify-center items-center gap-2 px-4 py-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              <span className="text-white">Facebook</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
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
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}
