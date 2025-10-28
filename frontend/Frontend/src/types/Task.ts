export interface Task {
  id: number;
  title: string;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}
