import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskService, TaskResponse, Project, Page, CreateTaskRequest } from '../core/services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(TaskService);

  pageIndex = 0; pageSize = 5;
  page?: Page<TaskResponse>;
  projects: Project[] = [];

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    status: ['OPEN', Validators.required],
    projectId: [null as unknown as number, Validators.required],
  });

  ngOnInit() { this.loadProjects(); this.loadPage(); }
  loadProjects() { this.service.getProjects().subscribe(p => this.projects = p); }
  loadPage() { this.service.list(this.pageIndex, this.pageSize).subscribe(p => this.page = p); }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.service.create(this.form.value as CreateTaskRequest).subscribe(() => {
      this.form.reset({ status: 'OPEN', projectId: null }); this.loadPage();
    });
  }

  remove(id: number) { if (confirm('Excluir tarefa?')) this.service.delete(id).subscribe(() => this.loadPage()); }
  reload() { this.loadPage(); }
}
