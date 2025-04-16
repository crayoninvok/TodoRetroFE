// app/components/TaskList.tsx
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
}: TaskListProps) {
  // Group tasks by completion status
  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);

  if (tasks.length === 0) {
    return (
      <div className="text-center p-8 bg-opacity-10 bg-white rounded">
        <p className="text-light-gray">
          No tasks yet. Add some tasks to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      {incompleteTasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-white">Tasks to Do</h2>
          {incompleteTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 text-white">Completed</h2>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
