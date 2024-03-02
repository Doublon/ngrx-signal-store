import { Injectable } from "@angular/core";
import { TODOS } from "../model/mock-data";
import { Todo } from "../model/todo.model";

@Injectable({
    providedIn: 'root'
})
export class TodosService {
    async getTodosAll(): Promise<Todo[]> {
        await sleep(1000);
        return TODOS;
    }

    async addTodo(todo: Partial<Todo>): Promise<Todo> {
        await sleep(1000);
        // TODOS.push(todo);
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...todo
        } as Todo;
    }
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}