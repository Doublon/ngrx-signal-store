import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../../store/todos.store';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [MatFormField, MatInput, MatIcon, MatSuffix, MatLabel, MatButtonToggleGroup, MatButtonToggle, MatSelectionList, MatListOption],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);

  filter = viewChild(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter!.value = this.store.filter();
    });
  }

  async onAddTodo(title: string) {
    await this.store.add(title);
  }

  async onDeleteTodo(todo: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.delete(todo);
  }

  async onTodoToggled(id: string, completed: boolean) {
    await this.store.update(id, completed);
  }

  onFilterChangeTodos(event: MatButtonToggleChange) {
    const filter  = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
