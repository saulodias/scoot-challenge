import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    DataViewModule,
    TagModule
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoListModule { }
