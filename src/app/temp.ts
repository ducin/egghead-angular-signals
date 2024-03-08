import { Component, ElementRef, viewChild, ɵoutput as output, signal, model, input, numberAttribute, booleanAttribute } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-component',
  template: ``,
})
export class MyComponent {
    onClick = output(); // Output EmitterRef<void>
    nameChange = output<string>(); // OutputRef<string>
    nameChange$ = new Subject<string>();
    // nameChange = outputFromObservable(this.nameChange$); // OutputRef<string>
    doSomething () {
        this.onClick.emit();
        this.nameChange.emit();
    }
}

@Component({
  template: '<div #el></div><my-component #cmp />'
})
export class TestComponent {
  divEl = viewChild<ElementRef>('el'); // Signal<ElementRef|undefined>

  divElRequired = viewChild.required<ElementRef>('el');  // Signal<ElementRef>

  cmp = viewChild(MyComponent);                          // Signal<MyComponent|undefined>

  cmpRequired = viewChild.required(MyComponent);         // Signal<MyComponent>
}




@Component({
  template: `<counter [(value)]="count"/> The current count is: {{count()}}`,
})
class App {
  count = signal(0);
}

@Component({
  selector: 'counter',
  standalone: true,
  template: `<button (click)="increment()">++</button>`
})
export class Counter {
  value = model(0);
  increment (): void {
    this.value.update(current => current + 1);
  }
}



@Component({
  template: `<counter [(value)]="count"/> The current count is: {{count()}}`,
})
class Another {
  count = input<number, unknown>(300, { transform: numberAttribute })
  show = input<boolean, unknown>(true, { transform: booleanAttribute })
  error = input<boolean, unknown>(true, { transform: numberAttribute })
}
