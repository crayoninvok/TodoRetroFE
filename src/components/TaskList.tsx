"use client";
import { useState } from "react";
import { Todo, Priority } from "@/types/todo.types";

interface TaskListProps {
  tasks: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  isLoading = false,
}: TaskListProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Function to format the date
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get priority color
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "HIGH":
        return "text-pink";
      case "MEDIUM":
        return "text-yellow";
      case "LOW":
        return "text-blue";
      default:
        return "text-light-gray";
    }
  };

  // Handle task toggle with loading state
  const handleToggle = (id: string) => {
    if (!isLoading) {
      onToggleComplete(id);
    }
  };

  // Handle task delete with loading state
  const handleDelete = (id: string) => {
    if (!isLoading) {
      onDelete(id);
    }
  };

  // Toggle expanded view for a task
  const toggleExpanded = (id: string) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center text-light-gray">
        <div className="text-5xl mb-4">🎮</div>
        <p>No tasks found. Start your quest by adding a new task!</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 stagger-animation">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item-hover card p-4 relative ${
            task.completed ? "opacity-60" : ""
          }`}
        >
          {/* Main task row */}
          <div className="flex items-start gap-3">
            {/* Checkbox */}
            <button
              onClick={() => handleToggle(task.id)}
              className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                task.completed ? "bg-pink border-pink" : "border-light-gray"
              }`}
              disabled={isLoading}
            >
              {task.completed && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </button>

            {/* Task content */}
            <div className="flex-grow">
              <div
                onClick={() => toggleExpanded(task.id)}
                className="cursor-pointer"
              >
                <h3
                  className={`text-lg font-medium ${
                    task.completed
                      ? "line-through text-light-gray"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

                {/* Task brief info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mt-1 text-light-gray">
                  {/* Priority tag */}
                  <span className={`${getPriorityColor(task.priority)}`}>
                    {task.priority} Priority
                  </span>

                  {/* Due date */}
                  {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}

                  {/* Creation date */}
                  <span>Created: {formatDate(task.createdAt)}</span>
                </div>
              </div>

              {/* Expanded view */}
              {expandedTaskId === task.id && task.description && (
                <div className="mt-3 animate-slide-up bg-white/5 p-3 rounded">
                  <p className="text-sm text-light-gray">{task.description}</p>
                </div>
              )}
            </div>

            {/* Delete button */}
            <button
              onClick={() => handleDelete(task.id)}
              className="text-light-gray hover:text-pink transition-colors flex-shrink-0"
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
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
          </div>

          {/* Priority indicator line at bottom */}
          <div
            className={`absolute bottom-0 left-0 h-1 ${
              task.priority === "HIGH"
                ? "bg-pink"
                : task.priority === "MEDIUM"
                ? "bg-yellow"
                : "bg-blue"
            }`}
            style={{ width: task.completed ? "100%" : "30%" }}
          ></div>
        </li>
      ))}
    </ul>
  );
}
