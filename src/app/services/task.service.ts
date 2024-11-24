import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly URL = '/api/task'; // Lembar da configuração de proxy burro 

  constructor(private httpCLient: HttpClient) { }

  list() {
    return this.httpCLient.get<Task[]>(this.URL).pipe(
      first()
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

}
