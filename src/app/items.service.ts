import { Injectable, signal } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  #items = signal(
    [
      { id: 1, name: 'Andy' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]
    // { equal: _.isEqual }
  );

  items = this.#items.asReadonly();

  clearItems() {
    this.#items.set([
      { id: 1, name: 'Andy' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  }

  append(name: string) {
    this.#items.update((prev) => [...prev, { id: prev.length + 1, name }]);
  }
}
