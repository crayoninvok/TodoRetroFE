// hooks/useTodos.ts
import { useState, useCallback, useEffect } from "react";
import {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  ApiError,
} from "../types/todo.types";
import {
  getAllTodos,
  createTodo,
  updateTodo,
  toggleTodoStatus,
  deleteTodo,
} from "../services/todo.service";

interface UseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  fetchTodos: () => Promise<void>;
  addTodo: (todoData: CreateTodoRequest) => Promise<Todo>;
  updateTodo: (id: string, todoData: UpdateTodoRequest) => Promise<Todo>;
  toggleComplete: (id: string) => Promise<Todo>;
  removeTodo: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAllTodos();
      setTodos(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to fetch todos");
      console.error("Error fetching todos:", apiError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData: CreateTodoRequest): Promise<Todo> => {
    setError(null);

    try {
      const newTodo = await createTodo(todoData);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      return newTodo;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to create todo");
      throw apiError;
    }
  };

  const updateTodoItem = async (
    id: string,
    todoData: UpdateTodoRequest
  ): Promise<Todo> => {
    setError(null);

    try {
      const updatedTodo = await updateTodo(id, todoData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to update todo");
      throw apiError;
    }
  };

  const toggleComplete = async (id: string): Promise<Todo> => {
    setError(null);

    try {
      const updatedTodo = await toggleTodoStatus(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to toggle todo status");
      throw apiError;
    }
  };

  const removeTodo = async (id: string): Promise<void> => {
    setError(null);

    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || "Failed to delete todo");
      throw apiError;
    }
  };

  const clearError = () => setError(null);

  return {
    todos,
    isLoading,
    error,
    fetchTodos,
    addTodo,
    updateTodo: updateTodoItem,
    toggleComplete,
    removeTodo,
    clearError,
  };
};
