import {
  Component,
  Signal,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemsService } from './items.service';
import { ChildComponent } from './child.component';
import { FormsModule } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { UsersHTTPService } from './users-http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ChildComponent],
  styles: `
    label {
      display: block;
    }

    .bold {
      font-weight: bold;
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
      <li
        (click)="chooseItem(item.id)"
        [ngClass]="{ bold: (chosenItem$ | async) == item.id }"
      >
        {{ item.name }}
      </li>
      }
    </ul>
    chosen ID: {{ chosenItem$ | async }} chosen ID (signal): {{ chosenItem() }}

    <label>
      <input type="checkbox" [(ngModel)]="showChild" />
      show child component
    </label>
    @if (showChild){
    <app-child />
    }

    <ul>
      @for(user of users(); track user.id){
      <li>ID: {{ user.id }}, name: {{ user.name }}</li>
      }
    </ul>
  `,
})
export class AppComponent {
  itemsSvc = inject(ItemsService);

  usersHTTPSvc = inject(UsersHTTPService);

  users$ = this.usersHTTPSvc.getUsers();

  users = toSignal(this.usersHTTPSvc.getUsers());

  showChild = false;

  chosenItem$ = new Subject<number>();

  chooseItem(id: number) {
    this.chosenItem$.next(id);
  }

  chosenItem = toSignal(this.chosenItem$, {});

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
