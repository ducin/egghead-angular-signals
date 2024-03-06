import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <h1>Angular signals</h1>
    {{ item }}

    @if(item){
    {{ item.toLowerCase() }}
    }

    <ul>
      @for(item of items(); track 'id'){
      <li>{{ item.name }}</li>
      }
    </ul>`,
})
export class AppComponent {
  #item = signal<string | undefined>('hey');

  get item() {
    return this.#item();
  }

  items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
}
