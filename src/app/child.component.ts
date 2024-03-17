import { Component, Injector, effect, inject } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: ` <h3>child component</h3>`,
})
export class ChildComponent {
  itemsSvc = inject(ItemsService);

  #injector = inject(Injector);

  ngOnInit(): void {
    effect(
      (onCleanup) => {
        const timerId = setInterval(() => {
          console.log(this.itemsSvc.items().length);
        }, 1000);

        onCleanup(() => {
          console.log('effect cleaned up');
          clearInterval(timerId);
        });
      },
      {
        injector: this.#injector,
      }
    );
  }
}
