
import { Component, EventEmitter, Input,  Output} from '@angular/core';

import { Task } from '../model/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule]
})
export class TaskComponent {

    @Input() task: Task[] = [];
    @Output() add = new EventEmitter(false);
    @Output() edit = new EventEmitter(false);
    @Output() remove = new EventEmitter(false);

    readonly displayedColumns = ['id', 'descricao', 'completo', 'actions'];

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
