import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private uri = `${environment.api}/${environment.apiVersion}/tasks`;
  constructor(private http: HttpClient) {}

  public fetchTask(): Observable<Task[]> {
    return this.http.get(this.uri).pipe(map((tasks) => tasks as Task[]));
  }
}
