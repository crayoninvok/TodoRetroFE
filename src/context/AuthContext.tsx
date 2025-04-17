"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/auth.types";
import { getAccessToken, clearTokens } from "../services/auth.service";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = async () => {
      try {
        const token = getAccessToken();

        if (!token) {
          setIsLoading(false);
          return;
        }

        // You can implement a function to validate the token
        // and fetch user data here

        // For now, we'll just set isLoading to false
        setIsLoading(false);
      } catch (error) {
        setUser(null);
        clearTokens();
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const logout = () => {
    setUser(null);
    clearTokens();
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
