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

  public fetchTask(filter: any): Observable<Task[]> {
    return this.http
      .get(this.uri, {
        params: {
          filter: JSON.stringify(filter),
        },
      })
      .pipe(map((tasks) => tasks as Task[]));
  }

  public createTask(task: Task): Observable<Task> {
    return this.http
      .post(this.uri, task)
      .pipe(map((createdTask) => createdTask as Task));
  }

  public updateTask(updateTask: Task): Observable<Task> {
    return (
      this.http
        // eslint-disable-next-line no-underscore-dangle
        .patch(`${this.uri}/${updateTask._id}`, updateTask)
        .pipe(map((task) => task))
    );
  }

  public deleteTask(task: Task): Observable<object> {
    return this.http.delete(this.uri);
  }
}
