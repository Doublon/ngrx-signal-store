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

    async updateTodo(todo: Todo): Promise<Todo> {
        await sleep(1000);
        const index = TODOS.findIndex(t => t.id === todo.id);
        TODOS[index] = todo;
        return todo;
    }

    async deleteTodoById(id: string): Promise<void> {
        await sleep(1000);
        const index = TODOS.findIndex(t => t.id === id);
        TODOS.splice(index, 1);
    }
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}