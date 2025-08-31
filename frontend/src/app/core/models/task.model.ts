export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  projectId: number;
  projectName: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
