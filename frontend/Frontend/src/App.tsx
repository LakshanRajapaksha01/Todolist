import { useState, useEffect } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { taskService } from "./services/taskService";
import type { Task, CreateTaskDto } from "./types/Task";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Fetch tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError("Backend is not running. Start the backend to see tasks.");
      console.error("Error loading tasks:", err);
      setTasks([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (newTask: CreateTaskDto) => {
    await taskService.createTask(newTask);
    // Reload tasks to get the updated list (limited to 5 most recent)
    await loadTasks();
  };

  const handleCompleteTask = async (id: number) => {
    await taskService.completeTask(id);
    // Remove the completed task from the list
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Create Your Todo List</h1>
          <p> Manage Your day Effectively </p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <p>{error}</p>
            <button onClick={loadTasks}>Retry</button>
          </div>
        )}

        <div className="content-container">
          <AddTaskForm onSubmit={handleCreateTask} />
          <TaskList
            tasks={tasks}
            onComplete={handleCompleteTask}
            isLoading={isLoading}
          />
        </div>
      </main>

      <footer className="app-footer">
        
      </footer>
    </div>
  );
}

export default App;
