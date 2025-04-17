"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Higher-Order Component for protecting routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedRoute(props: P) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // If authentication check is complete and user is not logged in
      if (!isLoading && !user) {
        router.replace("/login-required");
      }
    }, [user, isLoading, router]);

    // Show loading state while checking authentication
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-dark-purple">
          <div className="text-center">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-t-pink border-r-pink border-b-transparent border-l-transparent rounded-full"></div>
            <p className="mt-4 text-light-gray">Loading...</p>
          </div>
        </div>
      );
    }

    // If user is logged in, render the protected component
    if (user) {
      return <Component {...props} />;
    }

    // Return null while redirecting
    return null;
  };
}

// Alternative: Component-based protection
export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login-required");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-purple">
        <div className="text-center">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-t-pink border-r-pink border-b-transparent border-l-transparent rounded-full"></div>
          <p className="mt-4 text-light-gray">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
