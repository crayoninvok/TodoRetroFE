"use client";
import { useState, FormEvent } from "react";
import { Priority } from "@/types/todo.types";

interface TaskFormProps {
  onAddTask: (
    title: string,
    description?: string,
    dueDate?: string,
    priority?: Priority
  ) => void;
  isLoading?: boolean;
}

export default function TaskForm({
  onAddTask,
  isLoading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("MEDIUM");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(
        title.trim(),
        description.trim() || undefined,
        dueDate || undefined,
        priority
      );
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("MEDIUM");
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="input pr-24"
            disabled={isLoading}
            required
          />
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-light-gray hover:text-white transition-colors"
          >
            {isExpanded ? "Less ↑" : "More ↓"}
          </button>
        </div>

        {isExpanded && (
          <div className="animate-slide-up">
            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="input min-h-24"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-light-gray mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input"
                  disabled={isLoading}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm text-light-gray mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="input"
                  disabled={isLoading}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="button px-6 py-3"
            disabled={isLoading || !title.trim()}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
                Adding...
              </span>
            ) : (
              "Add Task"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
