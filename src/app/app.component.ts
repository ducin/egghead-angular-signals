import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <h1>Angular signals</h1>
    last: {{ lastItem()?.name }}

    <button (click)="handleClick()">log items</button>
    <button (click)="clearItems()">clear items</button>
    <button (click)="append(newItemName())">new item</button>

    <input
      type="text"
      [value]="newItemName()"
      (input)="updateNewItemName($event)"
    />
    <input
      type="text"
      [value]="nameFilter()"
      (input)="updateNameFilter($event)"
    />
    <ul>
      @for(item of visibleItems(); track 'id'){
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

  readonlyItems = this.items.asReadonly();

  clearItems() {
    this.items.set([]);
  }

  mutateItems() {
    var removed = this.items().splice(0);
    var mutated = this.items();
    console.log({ removed, mutated });
  }

  newItemName = signal('');
  updateNewItemName($event: Event) {
    this.newItemName.set(($event.target as HTMLInputElement)['value']);
  }

  append(name: string) {
    this.items.update((prev) => [...prev, { id: prev.length + 1, name }]);
  }

  nameFilter = signal('');

  updateNameFilter($event: Event) {
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
  }

  filteredItems = computed(() => {
    // return this.items().filter(item => item.name.includes(this.nameFilter()))
    const nameFilter = this.nameFilter().toLowerCase();
    return this.items().filter((item) =>
      item.name.toLowerCase().includes(nameFilter)
    );
  });

  ascOrder = signal(true);

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems().sort((a, b) => {
      return a.name.localeCompare(b.name) * order;
    });
  });
}
