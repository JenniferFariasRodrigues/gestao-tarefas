import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  TaskService,
  TaskResponse,
  Project,
  Page,
  CreateTaskRequest,
} from '../core/services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(TaskService);


  pageIndex = 0;
  pageSize = 5;
  page?: Page<TaskResponse>;


  projects: Project[] = [];

  loading = false;
  lastUpdated: Date | null = null;

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['OPEN', Validators.required],
    projectId: [null as unknown as number, Validators.required],
  });

  ngOnInit(): void {
    this.loadProjects();
    this.loadPage();
  }

  loadProjects(): void {
    this.service.getProjects().subscribe({
      next: (p) => (this.projects = p),
    });
  }

  loadPage(): void {
    this.loading = true;
    this.service.list(this.pageIndex, this.pageSize).subscribe({
      next: (p) => (this.page = p),
      error: () => (this.loading = false),
      complete: () => {
        this.loading = false;
        this.lastUpdated = new Date();
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload = this.form.value as CreateTaskRequest;
    this.service.create(payload).subscribe({
      next: () => {
        this.form.reset({ status: 'OPEN', projectId: null, title: '', description: '' });
      },
      complete: () => this.loadPage(),
    });
  }

  remove(id: number): void {
    if (!id) return;
    if (confirm('Excluir tarefa?')) {
      this.service.delete(id).subscribe({
        complete: () => this.loadPage(),
      });
    }
  }

  reload(): void {
    this.loadPage();
  }
}
