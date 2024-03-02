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
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}