import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface Project {
  id: number;
  name: string;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: string;
  projectId: number;
  projectName: string;
  createdAt: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
  projectId: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  list(page = 0, size = 5, projectId?: number) {
    const params: any = { page, size };
    if (projectId != null) params.projectId = projectId;
    return this.http.get<Page<TaskResponse>>(`${this.base}/tasks`, { params });
  }

  create(payload: CreateTaskRequest) {
    return this.http.post<TaskResponse>(`${this.base}/tasks`, payload);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.base}/tasks/${id}`);
  }

  getProjects() {
    return this.http.get<Project[]>(`${this.base}/tasks/projects`);
  }
}
