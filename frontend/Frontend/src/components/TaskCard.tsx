import React from "react";
import type { Task } from "../types/Task";
import "./TaskCard.css";

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => Promise<void>;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const [isCompleting, setIsCompleting] = React.useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete(task.id);
    } catch (err) {
      console.error("Failed to complete task:", err);
      setIsCompleting(false);
    }
  };

  return (
    <div className="task-card">
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
      </div>
      <button
        className="done-btn"
        onClick={handleComplete}
        disabled={isCompleting}
      >
        {isCompleting ? "Completing..." : "Done"}
      </button>
    </div>
  );
};

export default TaskCard;
