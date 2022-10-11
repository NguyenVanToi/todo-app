import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Task } from 'src/app/interfaces/Task';

// Use createFeatureSelector to retrieve only the books part of our application state
export const selectTasks = createFeatureSelector('tasks');

// Use createSelector to select data from state (can contain up to 8 different feature slices)
export const selectTaskCollection = createSelector(
  selectTasks,
  (tasks: Task[]) => tasks.map((items) => items)
);
