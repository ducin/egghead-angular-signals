import { Component, Injector, effect, inject } from '@angular/core';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  template: ` <h3>child component</h3>
    <button (click)="cleanUp()">clean up</button>`,
})
export class ChildComponent {
  itemsSvc = inject(ItemsService);

  timerEffect = effect(
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
      manualCleanup: true,
    }
  );

  cleanUp() {
    this.timerEffect.destroy();
  }
}
