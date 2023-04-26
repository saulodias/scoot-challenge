import { Component, OnInit } from '@angular/core';
import Todo from '../interfaces/todo.interface';
import { TodoServerService } from '../services/todo-server.service';
import PriorityEnum from '../enums/priority.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  limit = 10;
  total = 0;
  filters = { description: { value: '' }, priority: { value: undefined } };

  descriptionFilter = '';
  priorityFilter: PriorityEnum | null = null;

  priorityOptions = [
    { name: 'All', code: null },
    { name: 'High', code: PriorityEnum.HIGH },
    { name: 'Normal', code: PriorityEnum.NORMAL },
    { name: 'Low', code: PriorityEnum.LOW },
  ];

  constructor(private todoServerService: TodoServerService) {}

  ngOnInit() {}

  loadTodos(event: any) {
    if (event.filters) {
      this.filters = event.filters;
    }
    
    this.todoServerService
      .getAllTodos(
        event.first,
        this.limit,
        this.filters?.description?.value,
        this.filters?.priority?.value,
      )
      .subscribe((response) => {
        this.total = response.total;
        this.todos = response.items.map((todo) => {
          return {
            description: todo.description,
            dueDate: new Date(todo.dueDate).toLocaleDateString(),
            priority: todo.priority,
          };
        });
      });
  }

  filter(event: any) {}

  getPriority(completed: boolean): PriorityEnum {
    return completed ? PriorityEnum.LOW : PriorityEnum.NORMAL;
  }

  getPriorityText(priority: PriorityEnum): string {
    switch (priority) {
      case PriorityEnum.HIGH:
        return 'High';
      case PriorityEnum.NORMAL:
        return 'Normal';
      case PriorityEnum.LOW:
        return 'Low';
      default:
        return '';
    }
  }

  getStatusSeverity(priority: PriorityEnum): string {
    switch (priority) {
      case PriorityEnum.HIGH:
        return 'danger';
      case PriorityEnum.NORMAL:
        return 'warning';
      case PriorityEnum.LOW:
        return 'info';
      default:
        return 'primary';
    }
  }
}
