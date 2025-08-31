import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Tarefas</h2>

    <button (click)="reload()">Recarregar</button>

    <table *ngIf="tasks().length; else empty" border="1" cellpadding="6">
      <thead>
        <tr>
          <th>ID</th><th>Título</th><th>Status</th><th>Projeto</th><th>Criada em</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let t of tasks()">
          <td>{{ t.id }}</td>
          <td>{{ t.title }}</td>
          <td>{{ t.status }}</td>
          <td>{{ t.projectName }}</td>
          <td>{{ t.createdAt | date:'short' }}</td>
        </tr>
      </tbody>
    </table>

    <ng-template #empty>
      <p>Nenhuma tarefa encontrada.</p>
    </ng-template>
  `,
})
export class TaskListComponent {
  tasks = signal<Task[]>([]);
  page = 0;
  size = 5;

  constructor(private svc: TaskService) {
    this.load();
  }

  load() {
    this.svc.list(this.page, this.size).subscribe({
      next: (page) => this.tasks.set(page.content),
      error: (err) => console.error(err),
    });
  }

  reload() { this.load(); }
}
