import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';
import { ChildComponent } from './child.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ChildComponent],
  styles: `
    label {
      display: block;
    }
  `,
  template: `
    <h1>Angular signals</h1>
    last: {{ lastItem()?.name }}

    <button (click)="handleClick()">log items</button>
    <button (click)="itemsSvc.clearItems()">clear items</button>
    <button (click)="itemsSvc.append(newItemName())">new item</button>

    <label>
      new item:
      <input
        type="text"
        [value]="newItemName()"
        (input)="updateNewItemName($event)"
      />
    </label>
    <label>
      name filter:
      <input
        type="text"
        [value]="nameFilter()"
        (input)="updateNameFilter($event)"
      />
    </label>
    <ul>
      @for(item of visibleItems(); track 'id'){
      <li>{{ item.name }}</li>
      }
    </ul>
    <label>
      <input type="checkbox" [(ngModel)]="showChild" />
      show child component
    </label>
    @if (showChild){
    <app-child />
    }
  `,
})
export class AppComponent {
  itemsSvc = inject(ItemsService);

  showChild = false;

  handleClick() {
    console.log(this.itemsSvc.items());
  }

  lastItem = computed(() => this.itemsSvc.items().slice(-1)[0]);

  consoleLogEffect = effect(() => {
    console.log(
      'consoleLogEffect',
      this.itemsSvc.items(),
      untracked(() => this.nameFilter())
    );
  });

  newItemName = signal('');
  updateNewItemName($event: Event) {
    this.newItemName.set(($event.target as HTMLInputElement)['value']);
  }

  nameFilter = signal('');

  nameFilter$ = toObservable(this.nameFilter);

  constructor() {
    this.nameFilter$.subscribe(console.log);
  }

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
