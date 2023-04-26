import { Component, OnInit } from '@angular/core';
import Todo from '../interfaces/todo.interface';
import { TodoServerService } from '../services/todo-server.service';
import PriorityEnum from '../enums/priority.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoServerService: TodoServerService) { }

  ngOnInit() {
    this.todoServerService.getAllTodos().subscribe((todos) => {
      this.todos = todos.map((todo) => {
        return {
          description: todo.description,
          dueDate: new Date(todo.dueDate).toLocaleDateString(),
          priority: todo.priority
        };
      });
    });
  }

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

  getPriorityClass(priority: PriorityEnum): string {
    switch (priority) {
      case PriorityEnum.HIGH:
        return 'p-text-danger';
      case PriorityEnum.NORMAL:
        return 'p-text-secondary';
      case PriorityEnum.LOW:
        return 'p-text-success';
      default:
        return '';
    }
  }
}