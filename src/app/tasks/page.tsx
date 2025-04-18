"use client";

import { useState } from "react";
import { withAuth } from "@/hoc/withAuth";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { useTodos } from "@/hooks/useTodos";
import { CreateTodoRequest, Priority } from "@/types/todo.types";

function TasksPage() {
  const { todos, isLoading, error, addTodo, toggleComplete, removeTodo } =
    useTodos();

  const [filterMode, setFilterMode] = useState<"all" | "active" | "completed">(
    "all"
  );

  // Handle adding a new task
  const handleAddTask = async (
    title: string,
    description?: string,
    dueDate?: string,
    priority?: Priority
  ) => {
    try {
      const todoData: CreateTodoRequest = {
        title,
        description,
        dueDate,
        priority: priority || "MEDIUM",
      };
      await addTodo(todoData);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Filter tasks based on selected mode
  const filteredTodos = todos.filter((todo) => {
    if (filterMode === "all") return true;
    if (filterMode === "active") return !todo.completed;
    if (filterMode === "completed") return todo.completed;
    return true;
  });

  // Task metrics
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;
  const pendingCount = totalCount - completedCount;

  // Clear completed tasks
  const clearCompletedTasks = async () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    for (const todo of completedTodos) {
      try {
        await removeTodo(todo.id);
      } catch (err) {
        console.error(`Failed to remove completed todo ${todo.id}:`, err);
      }
    }
  };

  return (
    <main className="pt-24 pb-12">
      <div className="container">
        <div className="gradient-border animate-fade-in max-w-3xl mx-auto">
          <div className="card">
            <h1 className="text-3xl font-bold mb-2 gradient-text animate-slide-up">
              My Tasks
            </h1>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-pink/20 text-white rounded animate-slide-up">
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {isLoading && todos.length === 0 ? (
              // Loading state
              <div className="flex justify-center items-center py-16">
                <div className="w-10 h-10 border-4 border-blue border-t-pink rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Task metrics */}
                <div className="mb-6 flex flex-wrap justify-between items-center text-sm text-light-gray">
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "100ms" }}
                  >
                    {totalCount > 0 ? (
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded bg-blue/20 text-white">
                          Total: {totalCount}
                        </span>
                        <span className="px-2 py-1 rounded bg-pink/20 text-white">
                          Pending: {pendingCount}
                        </span>
                        <span className="px-2 py-1 rounded bg-yellow/20 text-white">
                          Completed: {completedCount}
                        </span>
                      </div>
                    ) : (
                      <span>No tasks yet</span>
                    )}
                  </div>

                  {/* Filter options */}
                  {totalCount > 0 && (
                    <div
                      className="flex mt-4 md:mt-0 gap-2 animate-slide-up"
                      style={{ animationDelay: "200ms" }}
                    >
                      <button
                        onClick={() => setFilterMode("all")}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          filterMode === "all"
                            ? "bg-white/10 text-white"
                            : "text-light-gray hover:text-white"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilterMode("active")}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          filterMode === "active"
                            ? "bg-white/10 text-white"
                            : "text-light-gray hover:text-white"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setFilterMode("completed")}
                        className={`px-3 py-1 rounded text-sm transition-all ${
                          filterMode === "completed"
                            ? "bg-white/10 text-white"
                            : "text-light-gray hover:text-white"
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  )}
                </div>

                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "300ms" }}
                >
                  <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />
                </div>

                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "400ms" }}
                >
                  <TaskList
                    tasks={filteredTodos}
                    onToggleComplete={toggleComplete}
                    onDelete={removeTodo}
                    isLoading={isLoading}
                  />
                </div>

                {/* Action buttons */}
                {completedCount > 0 && (
                  <div
                    className="mt-6 flex justify-end animate-slide-up"
                    style={{ animationDelay: "500ms" }}
                  >
                    <button
                      onClick={clearCompletedTasks}
                      className="text-sm text-light-gray hover:text-pink transition-colors flex items-center gap-1"
                      disabled={isLoading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      </svg>
                      Clear completed
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Export the component wrapped with authentication protection
export default withAuth(TasksPage);
