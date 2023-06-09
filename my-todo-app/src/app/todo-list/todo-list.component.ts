import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import PriorityEnum from '../enums/priority.enum';
import Todo from '../interfaces/todo.interface';
import { TodoServerService } from '../services/todo-server.service';

const idError = new Error('A valid id must be provided.');

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  first = 0;
  limit = 10;
  total = 0;
  filters = { description: { value: '' }, priority: { value: undefined } };

  newTodoDialogVisible = false;
  newTodo: Todo = {
    description: '',
    dueDate: new Date(),
    priority: PriorityEnum.NORMAL,
  };

  descriptionFilter = '';
  priorityFilter: PriorityEnum | null = null;

  priorityOptions = [
    { name: 'High', code: PriorityEnum.HIGH },
    { name: 'Normal', code: PriorityEnum.NORMAL },
    { name: 'Low', code: PriorityEnum.LOW },
  ];

  priorityFilterOptions = [
    { name: 'All', code: null },
    ...this.priorityOptions,
  ];

  clonedTodos: { [key: string]: Todo } = {};

  constructor(
    private todoServerService: TodoServerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loadTodos(event?: any) {
    if (event?.filters) {
      this.filters = event.filters;
    }

    if (event?.first != null) {
      this.first = event.first;
    }

    this.todoServerService
      .getAllTodos(
        event?.first ?? this.first,
        this.limit,
        this.filters?.description?.value,
        this.filters?.priority?.value
      )
      .subscribe((response) => {
        this.total = response.total;
        this.todos = response.items.map((todo) => {
          return {
            id: todo.id,
            description: todo.description,
            dueDate: new Date(todo.dueDate),
            priority: todo.priority,
          };
        });
      });
  }

  filter(event: any) {}

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

  getPrioritySeverity(priority: PriorityEnum): string {
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

  onRowEditInit(todo: Todo) {
    if (todo.id == null) throw idError;

    this.clonedTodos[todo.id] = { ...todo };
  }

  onRowEditSave(todo: Todo) {
    if (todo.id == null) throw idError;

    delete this.clonedTodos[todo.id];

    this.todoServerService.updateTodo(todo.id, todo).subscribe((response) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: response.message,
      });

      this.loadTodos();
    });
  }

  deleteTodo(todo: Todo) {
    const accept = () => {
      if (todo.id == null) throw idError;

      this.todoServerService.deleteTodo(todo.id).subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: 'Sucessfully deleted item.',
        });

        this.loadTodos();
      });
    };

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this item?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept,
    });
  }

  priorityChange(priority: number, todo: Todo) {
    if (todo.id == null) throw idError;

    this.clonedTodos[todo.id].priority = priority;
  }

  onRowEditCancel(todo: Todo, index: number) {
    if (todo.id == null) throw idError;

    this.todos[index] = this.clonedTodos[todo.id];
    delete this.clonedTodos[todo.id];
  }

  saveTodo() {
    this.todoServerService.saveTodo(this.newTodo).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'info',
          summary: 'Info',
          detail: `Succesfully saved new item 
          with ${this.getPriorityText(
            response.priority
          )} priority and due on ${new Date(
            response.dueDate
          ).toLocaleDateString()}.`,
        });
        
        this.newTodo = {
          description: '',
          dueDate: new Date(),
          priority: PriorityEnum.NORMAL,
        };

        this.newTodoDialogVisible = false;

        this.loadTodos();
      },
      error: (error) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.error,
        }),
    });
  }

  showNewTodoDialog() {
    this.newTodoDialogVisible = true;
  }
}
