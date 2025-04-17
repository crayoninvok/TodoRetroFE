// hooks/useRegister.ts
import { useState } from "react";
import {
  RegisterRequest,
  RegisterResponse,
  ApiError,
} from "../types/auth.types";
import { registerUser } from "../services/auth.service";

interface UseRegisterReturn {
  register: (userData: RegisterRequest) => Promise<RegisterResponse>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  clearError: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const register = async (
    userData: RegisterRequest
  ): Promise<RegisterResponse> => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await registerUser(userData);
      setIsSuccess(true);
      return response;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "An unexpected error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    isLoading,
    error,
    isSuccess,
    clearError,
  };
};
