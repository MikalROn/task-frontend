import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../model/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-popup-editar',
  templateUrl: './popup-editar.component.html',
  styleUrls: ['./popup-editar.component.css'],
  imports: [FormsModule, CommonModule]
})
export class PopupEditarComponent {

  @Input() task!: Task; 
  @Output() taskEdited = new EventEmitter<Task>();
  @Output() response = new EventEmitter<boolean>;
  isVisible: boolean = false;


  constructor() { }

  open(task: Task): void {
    this.isVisible = true;
    this.task = task;
  }

  onSave() {
    this.taskEdited.emit(this.task);
    this.isVisible = false;
    this.response.emit(true);
  }

  onCancel() {
    this.isVisible = false;
    this.response.emit(false);
  }
}
