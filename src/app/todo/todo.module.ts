import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoPageRoutingModule } from './todo-routing.module';

import { PopupTodoComponent } from './popup-todo/popup-todo.component';
import { TodoPage } from './todo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [TodoPage, PopupTodoComponent],
  exports: [PopupTodoComponent],
})
export class TodoPageModule {}
