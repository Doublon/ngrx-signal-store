import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodosStore } from './store/todos.store';
import { TodosListComponent } from "./component/todos-list/todos-list.component";
import {MatSpinner} from '@angular/material/progress-spinner';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, TodosListComponent, MatSpinner]
})
export class AppComponent implements OnInit {

  store = inject(TodosStore);

  ngOnInit() {
    this.loadAll().then(  
      () => console.log('Todos loaded')
    );
  }

  private async loadAll() {
    await this.store.loadAll();
  }
}
