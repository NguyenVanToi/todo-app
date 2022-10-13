import { Task } from 'src/app/interfaces/Task';
import {
  createTask,
  deleteTask,
  updateTask,
} from './../state/actions/task.actions';
import { createReducer, on } from '@ngrx/store';
import { fetchTask } from '../state/actions/task.actions';

export const initialState: any = [];

export const taskReducer = createReducer(
  initialState,
  on(fetchTask, (state, { tasks }) => tasks),
  on(createTask, (state, { task }) => [...state, task]),
  on(updateTask, (state, { task }) => {
    // eslint-disable-next-line no-underscore-dangle
    const idx = state.findIndex((item: Task) => item._id === task._id);
    const results = [...state];
    if (idx >= 0) {
      results[idx] = { ...task };
    }
    return results;
  }),
  on(deleteTask, (state, { task }) =>
    // eslint-disable-next-line no-underscore-dangle
    state.filter((item: Task) => item._id !== task._id)
  )
);
