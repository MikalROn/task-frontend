
import { Component, ViewChild , Input, OnInit, Output} from '@angular/core';

import { Task } from '../model/task';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TasksService } from '../service/tasks.service';
import { CommonModule } from '@angular/common'; 
import { TaskPage } from '../model/taskPage';
import { FormsModule } from '@angular/forms';
import { PopupExcluirComponent } from '../popups/popup-excluir/popup-excluir.component';
import { PopupEditarComponent } from "../popups/popup-editar/popup-editar.component";
import { error } from 'console';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  standalone: true,
  imports: [
    MatTableModule, MatIconModule, MatButtonModule, CommonModule,
    FormsModule, PopupExcluirComponent,
    PopupEditarComponent
]
})
export class TaskComponent implements OnInit{

    @ViewChild(PopupEditarComponent) popupEditar!: PopupEditarComponent;
    @ViewChild(PopupExcluirComponent) popupExcluir!: PopupExcluirComponent;
    @Input() tasks: Task[] = [];
    task: any = {descricao: "", completo: false};
    totalElements: number = 0;
    totalPages: number = 0;

    
    readonly displayedColumns = ['descricao', 'completo', 'actions'];

    constructor(private taskService: TasksService) {}


    carregarTasks(): void {
      this.taskService.list().subscribe(
        (dados: any) => {
          console.log(dados);
          this.tasks = dados.tasks; // Extraia o array de tarefas
          this.totalElements = dados.totalElements; // (Opcional) Use isso para controle da paginação
          this.totalPages = dados.totalPages;
        }
      );
    }

    ngOnInit(): void {
      this.carregarTasks();
    }

    onAdd() {
      const novaTask: any = {
        descricao: this.task.descricao,
        completo: false
      };
      console.log(novaTask);
    
      this.taskService.save(novaTask).subscribe(
        (task) => {
          this.carregarTasks();
        },
        (error) => {
          console.error('Erro ao adicionar tarefa:', error);
        }
      );
    }

    ngAfterViewInit(): void {
      // Garantir que o @ViewChild tenha sido inicializado
      if (this.popupExcluir) {
        console.log('popupExcluir está disponível');
      }
      if (this.popupEditar) {
        console.log('popupEditar está disponível');
      }
    }
  
    onEdit(task: Task) {
       let copiaTask = {...task}

       this.popupEditar.open(copiaTask);

       this.popupEditar.response.subscribe(
         (confirm: boolean) => {
            if (confirm) {
              this.popupEditar.taskEdited.subscribe(
                (task: Task) => {
                    this.taskService.save(task).subscribe(
                      () => this.carregarTasks(),
                      (error) => console.log(error) 
                    );    
                }, error => console.log(error)
               )
            }
          }
        );
        }
       

       
  
    onDelete(task: Task) {

      this.popupExcluir.open();

      this.popupExcluir.response.subscribe(
        (confirm: boolean) => {
          if (confirm) {
            this.taskService.remove(task._id).subscribe(
              () => {
                this.carregarTasks();
              },
              (error) => {
                console.error('Erro ao deletar tarefa:', error);
              }
            );
          }
        }
      );

      
    }

    onFinish(task: Task) {
      if(!task.completo){
        this.taskService.completeTask(task._id).subscribe(
          (task) => {
            this.carregarTasks();
          },
          (error) => {
            console.error('Erro ao completar tarefa:', error);
          }
        );
      }
      
    }
}
