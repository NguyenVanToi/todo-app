import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Task } from './../interfaces/Task';
import { TaskService } from './../services/task.service';
import { selectTasks } from './../state/selectors/task.selector';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  title = 'Todo';
  tasks: Task[] = [];

  public $tasks = this.store.select(selectTasks);
  constructor(private store: Store, private taskService: TaskService) {}

  ngOnInit() {}
}
