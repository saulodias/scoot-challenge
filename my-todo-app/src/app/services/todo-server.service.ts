import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Todo from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoServerService {
  private readonly API_URL = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  getAllTodos(
    offset?: number,
    limit?: number,
    description?: string,
    priority?: number
  ) {
    let params = new HttpParams();
    if (offset !== undefined) {
      params = params.set('offset', offset);
    }
    if (limit !== undefined) {
      params = params.set('limit', limit);
    }

    // Filter
    if (description) {
      params = params.set('description', description);
    }
    if (priority != null) {
      params = params.set('priority', priority as number);
    }

    return this.http.get<{ items: Todo[]; total: number }>(this.API_URL, {
      params,
    });
  }

  saveTodo(todo: Todo) {
    const dueDate = (todo.dueDate as Date).getTime();
    const data = { ...todo, dueDate };

    return this.http.post<Todo>(this.API_URL, data);
  }

  updateTodo(id: string, todo: Todo) {
    const url = `${this.API_URL}/${id}`;
    const dueDate = (todo.dueDate as Date).getTime();

    const data = { ...todo, dueDate };

    return this.http.put<{ message: string }>(url, data);
  }

  deleteTodo(id: string) {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<{ message: string }>(url);
  }
}
