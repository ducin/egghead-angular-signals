import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: ` <h1>Angular signals</h1>
    last: {{ lastItem()?.name }}

    <button (click)="handleClick()">log items</button>
    <button (click)="itemsSvc.clearItems()">clear items</button>
    <button (click)="itemsSvc.append(newItemName())">new item</button>

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
  itemsSvc = inject(ItemsService);

  handleClick() {
    console.log(this.itemsSvc.items());
  }

  lastItem = computed(() => this.itemsSvc.items().slice(-1)[0]);

  newItemName = signal('');
  updateNewItemName($event: Event) {
    this.newItemName.set(($event.target as HTMLInputElement)['value']);
  }

  nameFilter = signal('');

  updateNameFilter($event: Event) {
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
  }

  filteredItems = computed(() => {
    // return this.items().filter(item => item.name.includes(this.nameFilter()))
    const nameFilter = this.nameFilter().toLowerCase();
    return this.itemsSvc
      .items()
      .filter((item) => item.name.toLowerCase().includes(nameFilter));
  });

  ascOrder = signal(true);

  visibleItems = computed(() => {
    const order = this.ascOrder() ? 1 : -1;
    return this.filteredItems().sort((a, b) => {
      return a.name.localeCompare(b.name) * order;
    });
  });
}
