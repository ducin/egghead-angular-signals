import { Injectable, signal, effect } from '@angular/core';
import _ from 'lodash';

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

  items = this.#items.asReadonly();

  clearItems() {
    this.#items.set([]);
  }

  append(name: string) {
    this.#items.update((prev) => [...prev, { id: prev.length + 1, name }]);
  }
}
