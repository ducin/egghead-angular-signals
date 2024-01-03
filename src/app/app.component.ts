import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <h1>Hello, {{ title }}</h1>
    <ul>
    @for (item of lastItem(); track 'id') {
      <li>{{item.name}}</li>
    }
    </ul>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'signals';

  items = signal([
    {id: 1, name: 'Andy'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'},
  ])

  lastItem = computed(() => 
  this.items().slice(-1))
}
