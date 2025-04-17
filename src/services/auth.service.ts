// services/auth.service.ts
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ApiError,
} from "../types/auth.types";

// API base URL - should be stored in .env
const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL_BE || "http://localhost:8000/api";

/**
 * Register a new user
 */
export const registerUser = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    console.log("Registering user:", userData.email);
    console.log("API URL:", API_URL);

    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Registration response status:", response.status);
    const data = await response.json();
    console.log("Registration response data:", data);

    if (!response.ok) {
      throw {
        message: data.message || "Registration failed",
        status: response.status,
      };
    }

    return data;
  } catch (error) {
    console.error("Registration error:", error);
    if ((error as ApiError).message) {
      throw error;
    }
    throw { message: "Network error. Please try again later." };
  }
};

/**
 * Login user
 */
export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    console.log("Logging in user:", credentials.email);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log("Login response status:", response.status);

    if (!response.ok) {
      throw {
        message: data.message || "Login failed",
        status: response.status,
      };
    }

    // Store tokens in localStorage
    if (data.accessToken && data.refreshToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    if ((error as ApiError).message) {
      throw error;
    }
    throw { message: "Network error. Please try again later." };
  }
};

/**
 * Store auth tokens in localStorage
 */
export const storeTokens = (
  accessToken: string,
  refreshToken: string
): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};

/**
 * Clear auth tokens from localStorage
 */
export const clearTokens = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

/**
 * Get stored access token
 */
export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

/**
 * Get stored refresh token
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  const refreshToken = getRefreshToken();

  if (refreshToken) {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with clearing tokens even if API call fails
    }
  }

  clearTokens();
};
