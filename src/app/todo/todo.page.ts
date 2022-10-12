import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchTask } from '../state/actions/task.actions';
import { Task } from './../interfaces/Task';
import { TaskService } from './../services/task.service';
import { selectTasks } from './../state/selectors/task.selector';
import { PopupTodoComponent } from './popup-todo/popup-todo.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  title = 'Todo';
  tasks: Task[] = [];

  public $tasks = this.store.select(selectTasks) as Observable<Task[]>;
  constructor(
    private store: Store,
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.taskService.fetchTask().subscribe((tasks: Task[]) => {
      console.log('task', tasks);
      this.store.dispatch(fetchTask({ tasks }));
    });
  }

  async addTodo(task?: Task) {
    const modal = await this.modalCtrl.create({
      component: PopupTodoComponent,
      componentProps: task,
      cssClass: 'custom-modal',
    });
    await modal.present();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
