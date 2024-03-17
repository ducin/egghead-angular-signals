import { Component, Injector, effect, inject } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: ` <h3>child component</h3>
    <button (click)="cleanUp()">clean up the effect</button>`,
})
export class ChildComponent {
  itemsSvc = inject(ItemsService);

  #injector = inject(Injector);

  ngOnInit() {
    effect(
      () => {
        const timerId = setInterval(() => {
          console.log('ngOnInit/timerEffect', this.itemsSvc.items().length);
        }, 1000);
      },
      {
        injector: this.#injector,
      }
    );
  }

  timerEffect = effect(
    (onCleanup) => {
      const timerId = setInterval(() => {
        console.log('timerEffect', this.itemsSvc.items().length);
      }, 1000);

      onCleanup(() => {
        console.log('effect cleaned up');
        clearInterval(timerId);
      });
    },
    {
      manualCleanup: true,
    }
  );

  cleanUp() {
    this.timerEffect.destroy();
  }
}
