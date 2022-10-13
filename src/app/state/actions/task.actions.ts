import { createAction, props } from '@ngrx/store';
import { Task } from './../../interfaces/Task';

export const fetchTask = createAction(
  '[Task Fetch] Fetch data of Task',
  props<{ tasks: Task[] }>()
);

export const createTask = createAction(
  '[Task Create] Create a task',
  props<{ task: Task }>()
);
export const updateTask = createAction(
  '[Task Update] Update a task',
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  '[Task Delete] Delete a task',
  props<{ task: Task }>()
);
