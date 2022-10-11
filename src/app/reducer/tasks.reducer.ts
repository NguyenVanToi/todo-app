import { createReducer, on } from '@ngrx/store';
import { fetchTask } from '../state/actions/task.actions';

export const initialState: any = [];

export const taskReducer = createReducer(
  initialState,
  on(fetchTask, (state, { tasks }) => tasks)
);
