"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [status, setStatus] = useState<
    "loading" | "success" | "already-verified" | "error"
  >("loading");
  const [message, setMessage] = useState("");
  const verificationAttempted = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      // Prevent multiple verification attempts
      if (verificationAttempted.current) return;
      verificationAttempted.current = true;

      // Use window.location to get search params on the client side
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      console.log("Token from URL:", token);

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link. No token provided.");
        return;
      }

      try {
        const API_URL =
          process.env.NEXT_PUBLIC_BASE_URL_BE || "http://localhost:8000/api";
        console.log("API URL:", API_URL);

        const verifyUrl = `${API_URL}/auth/verify-email?token=${token}`;
        console.log("Making verification request to:", verifyUrl);

        const response = await fetch(verifyUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
          // Check if the message indicates email is already verified
          if (
            data.message &&
            data.message.toLowerCase().includes("already verified")
          ) {
            setStatus("already-verified");
            setMessage(
              data.message || "Your email is already verified. You can log in."
            );
          } else {
            setStatus("success");
            setMessage(
              data.message || "Email verified successfully! You can now log in."
            );
          }

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login?verified=true");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(
            data.message || "Failed to verify email. The link may have expired."
          );
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("error");
        setMessage(
          "An error occurred while verifying your email. Please try again later."
        );
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="container max-w-md mx-auto px-4 py-12 animate-fade-in">
      <div className="gradient-border">
        <div className="card text-center p-8">
          <h1 className="text-4xl font-bold gradient-text mb-6">
            Email Verification
          </h1>

          {status === "loading" && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-t-pink border-r-pink border-b-transparent border-l-transparent rounded-full"></div>
              <p className="mt-4 text-light-gray">
                Verifying your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-500/20 border border-green-500 text-white px-4 py-6 rounded mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-green-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-xl mb-4">{message}</p>
              <p className="text-light-gray">Redirecting you to login...</p>
            </div>
          )}

          {status === "already-verified" && (
            <div className="bg-blue-500/20 border border-blue-500 text-white px-4 py-6 rounded mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-blue-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xl mb-4">{message}</p>
              <p className="text-light-gray">Redirecting you to login...</p>
            </div>
          )}

          {status === "error" && (
            <div className="bg-pink/20 border border-pink text-white px-4 py-6 rounded mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-pink mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="text-xl mb-4">{message}</p>
              <div className="mt-6">
                <Link
                  href="/login"
                  className="text-blue hover:text-pink transition-colors"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="text-light-gray">
              Need help?{" "}
              <Link
                href="/contact"
                className="text-blue hover:text-pink transition-colors"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
