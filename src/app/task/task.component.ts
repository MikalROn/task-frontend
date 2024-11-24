
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Task } from '../model/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TaskService } from '../services/task.service';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common'; // Importação do CommonModule

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CommonModule]
})
export class TaskComponent implements OnInit{
    tasks: Task[] = [];

    @Output() add = new EventEmitter(false);
    @Output() edit = new EventEmitter(false);
    @Output() remove = new EventEmitter(false);

    
    readonly displayedColumns = ['id', 'descricao', 'completo', 'actions'];

    constructor(private taskService: TaskService) {}


    ngOnInit(): void {
      this.taskService.list().subscribe({
        next: (data) => (this.tasks = data),
        error: (err) => console.error('Erro ao carregar tarefas:', err),
      });
    }

    onAdd() {
      this.add.emit(true);
    }
  
    onEdit(task: Task) {
      this.edit.emit(task);
    }
  
    onDelete(task: Task) {
      this.remove.emit(task);
    }
}
