import { createAction, props } from '@ngrx/store';
import { Task } from './../../interfaces/Task';

export const fetchTask = createAction(
  '[Task Fetch] Fetch data of Task',
  props<{ tasks: Task[] }>()
);
