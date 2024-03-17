import { Injectable, signal, effect } from '@angular/core';
import _ from 'lodash';

export function syncEffect<T>(key: string, valueGetter: () => T) {
  return effect(() => {
    localStorage.setItem('items', JSON.stringify(valueGetter()));
  });
}

type Item = {
  id: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  #items = signal(
    JSON.parse(localStorage.getItem('items')!) as Item[]
    // { equal: _.isEqual }
  );

  synchronizeItemsEffect = effect(() => {
    localStorage.setItem('items', JSON.stringify(this.#items()));
  });

  // synchronizeItemsEffect = syncEffect('items', () => this.#items());

  items = this.#items.asReadonly();

  clearItems() {
    this.#items.set([]);
  }

  append(name: string) {
    this.#items.update((prev) => [...prev, { id: prev.length + 1, name }]);
  }
}
