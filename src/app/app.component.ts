import { Component, Signal, computed, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  template: `
    <h1>Angular signals</h1>
    <input
      type="text"
      [value]="nameFilter()"
      (input)="updateNameFilter($event)"
    />
    <input type="text" [(ngModel)]="nameFilter" />
    <ul>
      @for (item of visibleItems(); track 'id') {
      <li>{{ item.name }}</li>
      }
    </ul>
    {{ nameFilter().toLowerCase() }}
    <!-- {{ b() }} cycle here -->
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  // nameFilter = signal<string | undefined>(undefined)
  nameFilter = signal('');

  updateNameFilter($event: Event) {
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
  }

  lastItem = computed(() => this.items().slice(-1));

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

  a = signal('John');
  b: Signal<string> = computed(() => this.a() + this.c());
  c: Signal<string> = computed(() => this.a() + this.b());
}
