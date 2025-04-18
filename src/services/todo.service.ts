// services/todo.service.ts
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoApiResponse,
  TodosApiResponse,
  ApiError,
} from "../types/todo.types";
import { getAccessToken } from "./auth.service";

// API base URL - should be stored in .env
const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL_BE || "http://localhost:8000/api";

/**
 * Helper function to handle API requests
 */
const apiRequest = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: any
): Promise<T> => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw { message: "Not authenticated" } as ApiError;
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        message:
          data.message || data.errors?.join(", ") || "API request failed",
        status: response.status,
        errors: data.errors,
      } as ApiError;
    }

    return data as T;
  } catch (error) {
    console.error(`API Error (${method} ${endpoint}):`, error);
    if ((error as ApiError).message) {
      throw error;
    }
    throw { message: "Network error. Please try again later." } as ApiError;
  }
};

/**
 * Get all todos for the current user
 */
export const getAllTodos = async (): Promise<Todo[]> => {
  const response = await apiRequest<TodosApiResponse>("/todos");
  return response.todos;
};

/**
 * Get a single todo by ID
 */
export const getTodoById = async (id: string): Promise<Todo> => {
  const response = await apiRequest<TodoApiResponse>(`/todos/${id}`);
  return response.todo;
};

/**
 * Create a new todo
 */
export const createTodo = async (
  todoData: CreateTodoRequest
): Promise<Todo> => {
  const response = await apiRequest<TodoApiResponse>(
    "/todos",
    "POST",
    todoData
  );
  return response.todo;
};

/**
 * Update a todo
 */
export const updateTodo = async (
  id: string,
  todoData: UpdateTodoRequest
): Promise<Todo> => {
  const response = await apiRequest<TodoApiResponse>(
    `/todos/${id}`,
    "PUT",
    todoData
  );
  return response.todo;
};

/**
 * Toggle todo completion status
 */
export const toggleTodoStatus = async (id: string): Promise<Todo> => {
  const response = await apiRequest<TodoApiResponse>(
    `/todos/${id}/toggle`,
    "PATCH"
  );
  return response.todo;
};

/**
 * Delete a todo
 */
export const deleteTodo = async (id: string): Promise<void> => {
  await apiRequest<{ message: string }>(`/todos/${id}`, "DELETE");
};
