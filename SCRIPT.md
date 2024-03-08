# 2. Access an Angular Signal's value and display it within the component template

- Call the signal as a function. Technically, an Angular Signal IS a function which returns current signal value

```html
<span>{{ signal() }}</span>
```

- Whenever signal value changes, the component's template is guaranteed to get updated.

- Signals can be accessed directly in component template's control flow syntax, like IF or FOR. In case of elements which COULD be undefined, Angular will be able to narrow down the type

```ts
nameFilter = signal<string | undefined>(undefined);
```

```html
{{ nameFilter().toLowerCase() }}
```

(Object is possibly 'undefined'.)

- Signals can also hold arrays. Let's create items signal with simple objects:

```ts
items = signal([
  { id: 1, name: "Andy" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
]);
```

In order to display the items, use the new @for loop inside the template:

```html
<ul>
  @for (item of filteredItems(); track 'id') {
  <li>{{ item.name }}</li>
  }
</ul>
```

# 3. Narrow down signal value type within if statement

Sometimes it can be impossible to use a convenient syntax such as the optional chaining operator in order to narrow down the type within a single expression - you might need an angular template IF statement

in this case typescript will NOT narrow down the signal value type. That's because the function gets called twice and Typescript CANNOT guarantee the value will be the same both times.

What you can do is wrap the signal within a getter, so that TS treats it as a property

```ts
  #item = signal<string | undefined>('hey');

  get item(){
    return this.#item()
  }
```

our signal is hidden behind a private ITEM property and the we expose the public GETTER only.
Now the if type narrowing works as expected.

# 4. Access an Angular Signal's value inside event handler methods

- Create a method on the component class

````ts
```ts
handleClick(){
    console.log( this.items() )
}
````

and run the signal function inside it. Then, bind the method to an event within the component template:

```html
<button (click)="handleClick()"></button>
```

Whenever we click the button, we see the signal value being logged.

The difference between calling the signal function within the template (SHOW TEMPLATE) and the typescript class code (SHOW METHOD) is that the code in the template is REACTIVE. Whenever the signal value changes, the component view will be updated. However, the call within the method is IMPERATIVE - current value is pulled only when the event happens.

# 5. Create an Angular Computed signal which depends on another signal

- create a property which gets assigned a computed signal.

```ts
lastItem = computed(() => this.items().slice(-1));
```

The computed function requires us to pass a FACTORY callback which creates the expected value. `lastItem` holds the last element of the array.

Quite often, computed signals depend on multiple signals. Computed visible items will hold only the items which match a string filter.

```ts
filteredItems = computed(() => {});
```

Let's add a new signal which will hold the name filter:

```ts
nameFilter = signal("");
```

We'll also make the filter editable via an input:

```html
<input type="text" [value]="nameFilter()" (input)="updateNameFilter($event)" />
```

let's also create the `updateNameFilter` method to process the event:

```ts
  updateNameFilter($event: Event) {
    this.nameFilter.set(($event.target as HTMLInputElement)['value']);
  }
```

Only the items that match the filter will get displayed.

```ts
filteredItems = computed(() => {
  // case-sensitive:
  // return this.items().filter(item => item.name.includes(this.nameFilter()))

  // case-insensitive:
  const nameFilter = this.nameFilter().toLowerCase();
  return this.items().filter((item) => {
    return item.name.toLowerCase().includes(nameFilter);
  });
});
```

# 6. Create an Angular Computed signal on top of another computed

Create a new property and assign a computed which simply reads any existing computed signals:

```ts
visibleItems = computed(() => this.filteredItems());
```

Let's create a new signal which will define the sorting order

```ts
ascOrder = signal(true);

visibleItems = computed(() => {
  const order = this.ascOrder() ? 1 : -1;
  return this.filteredItems().sort((a, b) => {
    return a.name.localeCompare(b.name) * order;
  });
});
```

A computed can be created on top of other computed signals AS LONG AS there are no cyclic dependencies. But even if you do that, angular will catch it for you:

```ts
a = signal(1);
b = computed(() => this.a() + this.c());
c = computed(() => this.a() - this.b());
```

Above signals have no "live consumers". It means that nothing directly requires to grab the value of the signals: neither templates nor effects.

```html
{{ b() }}
```

but once there is a live consumer, the computed signals have to re-evaluate their current values and at this point Angular will find cycles and throw an appropriate error.
(SHOW ERROR)

# 7. Update an Angular Signal's value and make Computed Signal emit updates

- you can update the signal value in two ways:
  (INTELLISENSE)
  via `set` method and via `update` method.
- run the `set` method to REPLACE the signal value entirely:

```ts
clear(){
  this.items.set([])
}
```

whenever the `clear` method gets called, the previous signal value is lost and a new array becomes the new value.

- in order to create a new signal value using the PREVIOUS value, use the `update` method and pass the callback:

```ts
append(){
  this.items.update(previous => [...previous, {
    id: previous.length,
    name:
  }])
}
```

- Both `set` and `update` method exist on thw `WritableSignal` type. A computed, on the other hand, is NOT writable - it's type is just a `Signal` (implicitly, readonly).

# 8. Make an Angular Signal Readonly

- Create a new property. Call the `.asReadonly()` signal method and assign it to the property.

```ts
value = this.signal.asReadonly();
```

- A popular usecase for readonly signals are services.
  (CLI)
  Let's create a new service. Create a private signal on this service, so that components which inject it don't have direct access to the signal.

```ts
Service {
  #items = signal([
    { id: 1, name: 'Andy' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
}
```

- create public methods which implement the allowed ways to alter the signal value:
  (cut/paste)

```ts
  append(){...}
  clear(){...}
```

- Finally, expose the signals value as a readonly signal:

```ts
items = this.#items.asReadonly();
```

Note that the public `items` and hashmark private `items` are SEPARATE properties.

- The component injects the service

```ts
itemsService = inject(ItemsService);
```

The component can change the signal value only through the public methods, and NOT directly.
(intellisense - set/update unavailable)
And the only way to read the signal value is through the readonly signal:

```html
<!-- use it inside the template -->
```

- Although a readonly signal represents the very same source signal, it doesn't have the `set` and `update` methods.

- Though a readonly signal and a computed are two different things, they behave the same way.

# 9. Share Angular Signal state using Services

# 10. Make an Angular Signal compare object values instead of references

# 11. Use Angular Signals within an Angular OnPush-based Component

# 12. Create an Angular Signal Effect

# 13. Synchronize Angular Signal or Computed value to localStorage

# 14. Read an Angular Signal value while being untracked

- Use the `untracked()` function to access any angular signal without it being tracked later on:

```ts
untrackedSignal = computed(() => {
  existing() + untracked(anotherSignal());
});
```

In this example, the `untrackedSignal` will re-evaluate only when the `existing` one changes. Whenever that happens, it will simply pull the current value of the `anotherSignal` value. But when the value of `anotherSignal` changes, the `untrackedSignal` computed will NOT be notified. The change will not be propagated.

- Angular signals can be read in two scenarios: INSIDE so called "reactive contexts" and outside of them. Think of reactive contexts as signal consumers - they have to re-evaluate or re-execute whenever the signal they depend on changes. The reactive contexts are:
  (highlight with cursor)
  computed
  effect
  template
  whenever a signal changes, each of them refresh in their own way.
  On the other hand, an event handler method is NOT a reactive context. The signal value is just read whenever the event is emitted. There's no reactivity involved.

# 15. Manually destroy an Angular Signal Effect

# 16. Bind an Angular Signal Effect to an Injector for automatic cleanup

# 17. Set up an Angular Signal Effect cleanup handler

# 18. Turn an RxJS observable into an Angular Signal with toSignal

# 19. Provide an initial value within toSignal

with requiredSync

# 20. Handle observable errors within toSignal

emit `error`, rejectErrors

# 21. Turn an Angular Signal into an RxJS observable
