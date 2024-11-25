
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import { Task } from '../model/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TasksService } from '../service/tasks.service';
import { CommonModule } from '@angular/common'; 
import { TaskPage } from '../model/taskPage';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, MatButtonModule, CommonModule,
    FormsModule
  ]
})
export class TaskComponent implements OnInit{
    @Input() tasks: Task[] = [];
    totalElements: number = 0;
    totalPages: number = 0;

    
    readonly displayedColumns = ['descricao', 'completo', 'actions'];

    constructor(private taskService: TasksService) {}


    ngOnInit(): void {
      this.taskService.list().subscribe(
        (dados: any) => {
          console.log(dados);
          this.tasks = dados.tasks; // Extraia o array de tarefas
          this.totalElements = dados.totalElements; // (Opcional) Use isso para controle da paginação
          this.totalPages = dados.totalPages;
        }
      );
    }

    onAdd() {
    }
  
    onEdit(task: Task) {
      console.log(task);
    }
  
    onDelete(task: Task) {
      console.log(task);
    }

    onFinish(task: Task) {
      console.log(task);
    }
}
