import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  list(page = 0, size = 5, projectId?: number) {
    const params: any = { page, size };
    if (projectId != null) params.projectId = projectId;
    return this.http.get(`${this.base}/tasks`, { params });
  }

  create(payload: {
    title: string;
    description?: string;
    status: string;
    projectId: number;
  }) {
    return this.http.post(`${this.base}/tasks`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/tasks/${id}`);
  }

  projects() {
    return this.http.get(`${this.base}/tasks/projects`);
  }
}
