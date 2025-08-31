import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import {
  TaskService,
  TaskResponse,
  Project,
  Page,
  CreateTaskRequest,
} from '../core/services/task.service';
import { finalize, tap } from 'rxjs';

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

  readonly minLoadingMs = 800;

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
    if (this.loading) return;
    this.loading = true;
    const started = performance.now();

    this.service.list(this.pageIndex, this.pageSize).pipe(
      tap(p => this.page = p),
      finalize(() => {
        const elapsed = performance.now() - started;
        const remaining = Math.max(0, this.minLoadingMs - elapsed);

        setTimeout(() => {
          this.loading = false;
          this.lastUpdated = new Date();
        }, remaining);
      })
    ).subscribe({
      error: () => {
      }
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

  async remove(id: number) {
    const { isConfirmed } = await Swal.fire({
      title: 'Excluir tarefa?',
      text: 'Essa ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280'
    });

    if (!isConfirmed) return;

    this.service.delete(id).subscribe({
      next: () => {
        this.reload();
        Swal.fire({
          icon: 'success',
          title: 'Tarefa excluída!',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao excluir',
          text: 'Tente novamente mais tarde.'
        });
      }
    });
  }

  reload(): void {
    this.loadPage();
  }
}
