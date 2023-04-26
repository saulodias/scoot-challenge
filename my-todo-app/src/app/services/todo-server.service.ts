import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Todo from '../interfaces/todo.interface';

@Injectable({
    providedIn: 'root'
})
export class TodoServerService {
    private readonly API_URL = 'http://localhost:3000/todos';

    constructor(private http: HttpClient) { }

    getAllTodos() {
        return this.http.get<Todo[]>(this.API_URL);
    }
}
