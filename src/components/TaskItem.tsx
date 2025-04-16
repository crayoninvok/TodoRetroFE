"use client";

import { Task } from "@/types/Task";
import { useState, useEffect } from "react";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecking(true);
    onToggleComplete(task.id);

    // Reset animation state after a delay
    setTimeout(() => {
      setIsChecking(false);
    }, 500);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
    return formattedDate;
  };

  return (
    <div
      className={`flex items-center justify-between p-3 mb-2 rounded transition-all duration-300 task-item-hover ${
        task.completed ? "bg-opacity-30 bg-blue" : "bg-opacity-10 bg-white"
      } ${isVisible ? "animate-slide-right opacity-100" : "opacity-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "translateX(5px)" : "translateX(0)",
        borderLeft: `4px solid ${
          task.completed ? "var(--secondary)" : "var(--primary)"
        }`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className={`relative ${isChecking ? "animate-pulse" : ""}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 accent-pink cursor-pointer"
          />
          {isChecking && (
            <span className="absolute inset-0 rounded-full bg-pink bg-opacity-20 animate-pulse"></span>
          )}
        </div>
        <div className="flex flex-col">
          <span
            className={`transition-all duration-300 ${
              task.completed ? "line-through text-light-gray" : "text-white"
            }`}
          >
            {task.title}
          </span>
          <span className="text-xs text-light-gray opacity-70">
            {formatDate(task.createdAt)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDelete(task.id)}
          className={`text-light-gray hover:text-pink transition-colors duration-300 opacity-0 ${
            isHovered ? "opacity-100" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
    </div>
  );
}
