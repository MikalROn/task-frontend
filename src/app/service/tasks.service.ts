import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { HttpClient } from '@angular/common/http';
import { of, catchError, first } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly URL = '/api/task';

  constructor(private httpCLient: HttpClient) { }

  list() {
    return this.httpCLient.get<Task[]>(this.URL).pipe(
      first(),
      catchError(error => {
        console.error('Erro ao buscar tasks', error);
        return of([]); // Array vazio
      })
    );
  }

  loadById(id: string) {
    return this.httpCLient.get<Task>(`${this.URL}/${id}`)
  }

  save(record: Partial<Task>) {

    if (record._id) {
      return this.update(record)
    } else {
      return this.create(record)
    }
  }

  private create (record: Partial<Task>) {
      return this.httpCLient.post<Task>(this.URL, record).pipe(first());
    }
  
  private update (record: Partial<Task>) {
    return this.httpCLient.put<Task>(`${this.URL}/${record._id}` , record).pipe(first());
  }

  remove(id: string) {
    return this.httpCLient.delete(`${this.URL}/${id}`).pipe(first());
  }

  completeTask(id: string) {
    return this.httpCLient.get<Task>(`${this.URL}/completar-task/${id}`).pipe(first());
  }

  cancelarConclusaoTask(id: string) {
    return this.httpCLient.get<Task>(`${this.URL}/cancelar-conclusao-task/${id}`)
    .pipe(first());
  }

}
