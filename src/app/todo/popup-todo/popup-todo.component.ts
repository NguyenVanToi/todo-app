import { TaskService } from './../../services/task.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/interfaces/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  createTask,
  deleteTask,
  updateTask,
} from 'src/app/state/actions/task.actions';

@Component({
  selector: 'app-popup-todo',
  templateUrl: './popup-todo.component.html',
  styleUrls: ['./popup-todo.component.scss'],
})
export class PopupTodoComponent implements OnInit {
  @Input() task: Task;

  formTask: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private taskService: TaskService,
    private store: Store
  ) {}

  ngOnInit() {
    this.formTask = this.fb.group({
      name: [this.task?.name, Validators.required],
      description: [this.task?.description],
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async onSubmit() {
    console.log('this.formTask.value :>> ', this.formTask.value);
    // eslint-disable-next-line no-underscore-dangle
    if (this.task && this.task._id) {
      // patch
      const updatedTask = { ...this.task, ...this.formTask.value };
      this.taskService.updateTask(updatedTask).subscribe((data) => {
        console.log('ta :>> ', data);
        this.store.dispatch(updateTask({ task: data }));
        this.modalCtrl.dismiss();
      });
    } else {
      // create task
      const newTask = {
        ...this.formTask.value,
        createdAt: new Date(),
        isFinished: false,
      };
      this.taskService.createTask(newTask).subscribe((task) => {
        console.log('task :>> ', task);
        this.store.dispatch(createTask({ task }));
        this.modalCtrl.dismiss();
      });
    }
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(
      (data) => {
        this.store.dispatch(deleteTask({ task }));
      },
      (error) => {
        console.log('error :>> ', error);
      }
    );
  }
}
