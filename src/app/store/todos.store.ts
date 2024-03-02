import { inject } from "@angular/core";
import { Todo } from "../model/todo.model";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TodosService } from "../services/todos.service";

export type TodosFilter = 'all' | 'pending' | 'completed';

type TodosStats = {
    todos: Todo[];
    loading: boolean;
    filter: TodosFilter;
};

const initialState: TodosStats = {
    todos: [],
    loading: false,
    filter: 'all'
};


export const TodosStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store, todosService = inject(TodosService)) => ({
        async loadAll() {
            patchState(store, { loading: true });
            const todos = await todosService.getTodosAll();
            patchState(store, { todos, loading: false });
        }
    }))
);