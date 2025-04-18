// types/todo.types.ts

export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: Priority;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  dueDate?: string | null;
  priority?: Priority;
}

export interface TodoApiResponse {
  message: string;
  todo: Todo;
}

export interface TodosApiResponse {
  todos: Todo[];
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: string[];
}
