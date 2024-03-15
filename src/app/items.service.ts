import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  #items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  items = this.#items.asReadonly();

  clearItems() {
    this.#items.set([]);
  }

  append(name: string) {
    this.#items.update((prev) => [...prev, { id: prev.length + 1, name }]);
  }
}
