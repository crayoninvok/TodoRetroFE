"use client";

import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      setIsSubmitting(true);

      // Simulate a short delay for animation
      setTimeout(() => {
        onAddTask(taskTitle);
        setTaskTitle("");
        setIsSubmitting(false);
      }, 300);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 animate-fade-in">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="input pr-10"
            disabled={isSubmitting}
          />
          {taskTitle.length > 0 && (
            <button
              type="button"
              onClick={() => setTaskTitle("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-gray hover:text-white transition-colors duration-200"
              aria-label="Clear input"
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          className={`button relative overflow-hidden ${
            isSubmitting ? "opacity-70" : ""
          }`}
          disabled={isSubmitting || !taskTitle.trim()}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding...
            </span>
          ) : (
            <span className="flex items-center">
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
                className="mr-1"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Task
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
