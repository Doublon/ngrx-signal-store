import { computed, inject } from "@angular/core";
import { Todo } from "../model/todo.model";
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
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
            console.log('loadAll');
            patchState(store, { loading: true });
            const todos = await todosService.getTodosAll();
            patchState(store, { todos, loading: false });
        },

        async add(title: string) {
            const newTodo = await todosService.addTodo({title, completed: false});
            patchState(store, (state) => ({
                todos: [...state.todos, newTodo]
            }));
        },

        async update(id: string, completed: boolean) {
            const updatedTodo = await todosService.updateTodo(id, completed);
            patchState(store, (state) => ({
                todos: state.todos.map(t => t.id === updatedTodo.id ? updatedTodo : t)
            }));
        },

        async delete(id: string) {
            await todosService.deleteTodoById(id);
            patchState(store, (state) => ({
                todos: state.todos.filter(t => t.id !== id)
            }));
        },

        updateFilter(filter: TodosFilter) {
            patchState(store, { filter });
        }
    })),
    withComputed((state) => ({
        filteredTodos: computed(() => {
            const todos = state.todos();
            switch (state.filter()) {
                case 'pending':
                    return todos.filter(t => !t.completed);
                case 'completed':
                    return todos.filter(t => t.completed);
                default:
                    return todos;
            }
        })
    })),
    withHooks({
        onInit(store) {
            console.log('onInit');
            store.loadAll();
        }
    })
);