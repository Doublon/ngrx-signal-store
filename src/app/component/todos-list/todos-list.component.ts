import { Component, inject } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { TodosStore } from '../../store/todos.store';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [MatFormField, MatInput, MatIcon, MatSuffix, MatLabel, MatButtonToggleGroup, MatButtonToggle, MatSelectionList, MatListOption],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);

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
}
