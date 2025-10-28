import type { Task, CreateTaskDto } from '../types/Task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const taskService = {
  // Get all tasks (only returns 5 most recent incomplete tasks)
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/api/Tasks`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  // Get single task by ID
  async getTask(id: number): Promise<Task> {
    const response = await fetch(`${API_URL}/api/Tasks/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch task');
    }
    return response.json();
  },

  // Create new task
  async createTask(task: CreateTaskDto): Promise<Task> {
    const response = await fetch(`${API_URL}/api/Tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  // Mark task as completed
  async completeTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/Tasks/${id}/complete`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to complete task');
    }
  },

  // Delete task
  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/Tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};
