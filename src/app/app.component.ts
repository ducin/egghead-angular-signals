import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <h1>Angular signals</h1>
    last: {{ lastItem().name }}

    <button (click)="handleClick()">log items</button>
    <ul>
      @for(item of filteredItems(); track 'id'){
      <li>{{ item.name }}</li>
      }
    </ul>`,
})
export class AppComponent {
  handleClick() {
    console.log(this.items());
  }

  lastItem = computed(() => this.items().slice(-1)[0]);

  items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  nameFilter = signal('Andy');

  filteredItems = computed(() => {
    // return this.items().filter(item => item.name.includes(this.nameFilter()))
    const nameFilter = this.nameFilter().toLowerCase();
    return this.items().filter((item) =>
      item.name.toLowerCase().includes(nameFilter)
    );
  });
}
