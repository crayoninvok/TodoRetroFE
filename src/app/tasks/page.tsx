"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { withAuth } from "@/hoc/withAuth";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Task } from "@/types/Task";

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMode, setFilterMode] = useState<"all" | "active" | "completed">(
    "all"
  );

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        // Parse the JSON string and convert string dates back to Date objects
        const parsedTasks = JSON.parse(savedTasks).map(
          (task: {
            id: string;
            title: string;
            completed: boolean;
            createdAt: string;
          }) => ({
            ...task,
            createdAt: new Date(task.createdAt),
          })
        );
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Failed to parse tasks from localStorage:", error);
      }
    }

    // Simulate loading for aesthetic purposes
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Filter tasks based on selected mode
  const filteredTasks = tasks.filter((task) => {
    if (filterMode === "all") return true;
    if (filterMode === "active") return !task.completed;
    if (filterMode === "completed") return task.completed;
    return true;
  });

  // Task metrics
  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const pendingCount = totalCount - completedCount;

  return (
    <main className="pt-24 pb-12">
      {" "}
      {/* Added proper top padding to account for fixed navbar */}
      <div className="container">
        <div className="gradient-border animate-fade-in max-w-3xl mx-auto">
          <div className="card">
            <h1 className="text-3xl font-bold mb-2 gradient-text animate-slide-up">
              My Tasks
            </h1>

            {isLoading ? (
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
                  <TaskForm onAddTask={addTask} />
                </div>

                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "400ms" }}
                >
                  <TaskList
                    tasks={filteredTasks}
                    onToggleComplete={toggleTaskComplete}
                    onDelete={deleteTask}
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
