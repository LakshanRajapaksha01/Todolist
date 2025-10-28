import React from "react";
import type { Task } from "../types/Task";
import TaskCard from "./TaskCard";
import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => Promise<void>;
  isLoading: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onComplete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="task-list">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <p>No tasks yet. Add your first task!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2 className="task-list-header"></h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
};

export default TaskList;
