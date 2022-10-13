import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fetchTask, updateTask } from '../state/actions/task.actions';
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
  title = 'Today';
  tasks: Task[] = [];

  public $tasks = this.store.select(selectTasks) as Observable<Task[]>;
  constructor(
    private store: Store,
    private taskService: TaskService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);
    const filter = { createdAt: { $gte: startOfDay, $lt: endOfDay } };
    this.taskService.fetchTask(filter).subscribe((tasks: Task[]) => {
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

  updateStatus(e, task: Task) {
    e.stopPropagation();
    console.log('updateStatus', task);
    return;
    const updatedTask: Task = { ...task, isFinished: !task.isFinished };
    this.taskService.updateTask(updatedTask).subscribe((data) => {
      console.log('updatedTask :>> ', data);
      this.store.dispatch(updateTask({ task: data }));
    });
  }

  changeTask(task: Task) {
    console.log('task :>> ', task);
  }
}
