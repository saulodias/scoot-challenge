import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    TagModule
  ],
  exports: [
    TodoListComponent
  ],
  providers: [MessageService]
})
export class TodoListModule { }
