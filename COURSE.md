1. [x] create an Angular Signal which stores a value
2. [x] access an Angular Signal's value and display it within the component template
3. [x] narrow down signal value type within if statement
4. [x] access an Angular Signal's value inside event handler methods
5. [ ] create an Angular Computed signal which depends on another signal
6. [ ] create an Angular Computed signal on top of another computed
7. [ ] update an Angular Signal's value and make Computed Signal re-evaluate and emit notification
8. [ ] make an Angular Signal Readonly
9. [ ] share Angular Signal state using Services
10. [ ] use Angular Signals within an Angular OnPush-based Component
11. [ ] make an Angular Signal compare object values instead of references
12. [ ] create an Angular Signal Effect
13. [ ] synchronize Angular Signal or Computed value to localStorage
14. [ ] read an Angular Signal value while being untracked
15. [ ] manually destroy an Angular Signal Effect
16. [ ] bind an Angular Signal Effect to an Injector for automatic cleanup
17. [ ] set up an Angular Signal Effect cleanup handler
18. [ ] turn an RxJS observable into an Angular Signal with toSignal
19. [ ] provide an initial value within toSignal
20. [ ] handle observable errors within toSignal
21. [ ] turn an Angular Signal into an RxJS observable

listenOnce - effect utility: https://twitter.com/Enea_Jahollari/status/1757444009826353276

# Angular Signal Components

1. [ ] create an Angular Component Signal `input` function to receive data passed from the parent component
2. [ ] create an Angular Component `output` function to emit events
3. [ ] map Angular Component `output` to and from RxJS Observables
4. [ ] share state across Angular Components using Angular Signal Models

input types:
https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAbzsAdmArjANHF6QBGAplAIIwxTAGZFwC+cAZlBCHAOQACAhigOboANjygB6AMbQiHANwAoeWLFwAMkXiomJIigl0AJhGQwAznABWEAnACEtuIokjT5gGIRjCRXF-NPcAC8yGiYABQAzACUCn5wygB6APw+fkyeAExBIRgwkThIlHym6VAgAFxwYQBuPELoRJV4hCRRQQB8VcCmAHI8PTV1DW1JcOgoBkRMqEQGcJW19URt9DHycYkp62meEdmouQB0UEQAjujAJwZhhVDFpRVViw1N+MRQbYGdYd19A8-LOCjcaTaYoWbzOAAlZrDZiZKpXzpCAAFn2oRgxzOFyuNyKKBK0EezXe5Eo1Foq22vk2iPiKgA6gALHRwIgADzAQmAEmAmnM4P0rlEAE9HNT-BAAKzo3IAHhJJDgAB9cMIhO0wnghEIohLaRLkQA2WWYLHnS6zBVvEia2F+A30IA

signal queries demo: https://stackblitz.com/edit/angular-signal-queries?file=src%2Fmain.ts
signal model demo: https://stackblitz.com/edit/angular-model-inputs?file=src%2Fmain.ts
model inputs: https://github.com/angular/angular/pull/54252
output function demo: https://stackblitz.com/edit/angular-output-fn?file=src%2Fmain.ts

With the model input you will pass a signal directly instead of a value with the signal input.

The will allow the parent component to subscribe to the child model and update the local signal.

it provides a two-way binding 😅

The 2-way bindable signal inputs called the model inputs will allow inputs to be writable.

It maybe lead to dirty usecases, but fundamentally there is nothing wrong to update that input.

# Angular Deferrable Views

1. [ ] Defer loading components with Angular defer block
2. [ ] Defer loading directives with Angular defer block
3. [ ] Defer loading pipes with Angular defer block
4. [ ] Display @placeholder and @loading blocks while loading Angular defer block
5. [ ] Display @error block while loading Angular defer block
6. [ ] Trigger Angular defer block with `on idle`
7. [ ] Trigger Angular defer block with `on viewport`
8. [ ] Trigger Angular defer block with `on interaction`
9. [ ] Trigger Angular defer block with `on hover`
10. [ ] Trigger Angular defer block with `on immediate`
11. [ ] Trigger Angular defer block with `on timer`
12. [ ] Trigger Angular defer block with `when` clause
13. [ ] Prefetch Angular deferrable views with `prefetch` clause

making sure each of them is standalone
show what happens if they're not

- (how do I) create an NGRX Signal Store with initial value using withState
- (how do I) provide the NGRX Signal Store within a Component, a Route, or globally
- (how do I) display the NGRX Signal Store state inside an Angular Component
- (how do I) track NGRX Signal Store state within a Reactive Context using getState
- (how do I) define NGRX Signal Store Computed Signals
- (how do I) define NGRX Signal Store Methods which update the store state
- (how do I) update NGRX Signal Store state using store methods
- (how do I) update NGRX Signal Store state using batch updates
- (how do I) use an external Angular provider within withState, withComputed or withMethod
- (how do I) initialize the NGRX Signal Store state from external APIs using Promises
- (how do I) initialize the NGRX Signal Store state from external APIs using RxJS Observables
- (how do I) configure lifecycle hooks for an NGRX Signal Store
- (how do I) implement a filtered listing using NGRX Signal Store
