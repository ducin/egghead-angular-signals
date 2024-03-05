import { Component, computed, model, signal } from '@angular/core';
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
    {{nameFilter().toLowerCase()}}
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  // nameFilter = signal('')
  nameFilter = signal<string | undefined>(undefined)

  updateNameFilter($event: Event) {
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
  }

  lastItem = computed(() => this.items().slice(-1));

  visibleItems = computed(() => {
    // return this.items().filter(item => item.name.includes(this.nameFilter()))
    const nameFilter = this.nameFilter().toLowerCase();
    return this.items().filter((item) => {
      return item.name.toLowerCase().includes(nameFilter);
    });
  });
}
