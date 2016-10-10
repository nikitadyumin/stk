# State management toolkit


## Basics
`.subscribe(Observer)`

`.subscribe(onNext, onError, onComplete)`
subscribe for state updates

example
```javascript
stk.store(10).subscribe(state => console.log(state));
stk.store(20).subscribe({
    next(state) {
        console.log(state);
    }
});
```

`.dispatch(Event)`
dispatches an event (produced with an eventCreator)
```javascript
const sum = (x, y) => x + y;
const store = stk.store(10);
store.dispatch({
    update: 20,
    reduce: sum
});
store.subscribe(state => console.log(state)); // 10, 30
```

`.eventCreatorFactory(fnReducer)`
given a reducer returns an event creator that produces events (events can't have side effects)
```javascript
const sum = (x, y) => x + y;
const store = stk.store(10);
const numberEvent = store.eventCreatorFactory(sum);
numberEvent(20)
store.subscribe(state => console.log(state)); // 10, 30
```

`.commandCreatorFactory(fnExecutor)`
given an executor function returns a command creator that produces commands (that perform side effects)

`.plug(Observable, reducer)`
'plugs' an observable to the store, so that every value from the observable results into an event (with the given reducer)


## Advanced
`.view(project)`
given a project function (project(Events[], initialState)) produces a view that is a way to observe events flowing in the store

`.transaction()`
starts a transaction that later can be either committed to the state or cancelled

`._eventLog(Observer)`
subscribes an Observer to the raw event log flowing through the store

### Flush strategies:
to avoid array overflowing and control computational cost of project stores are created with `flush` strategies.
A flush strategy specifies a policy for transitioning form an array of events and an initial state to a new initial state (which includes some of the events) and a reduced events array.
`immediateFlushStrategy` flush every event (warning: transactions will not work)
`neverFlushStrategy` no flush at all (good for the cases with a low events number - e.g. less than 10 mln)
`count100kFlushStrategy` flush upon reaching 100 000 events (default for stk)

store(initialState[, flushStrategy]) // flush strategy is specified in a store constructor as an optional 2nd argument
built-in strategies can be found under stk.flushStrategies path.
It is possible to specify custom flush strategy under the following API:
```javascript
function customImmediateFlushStrategy(projectFunction){
    return function (eventsArray, initialState) {
        const newEventsArray = [];
        const newInitialState = projectFunction(eventsArray, initialState);
        return [newEventsArray, newInitialState];
    };
}
```

## Redux DevTools Extension
STK works with Redux Devtools Extension:
- Install the [tools](https://github.com/zalmoxisus/redux-devtools-extension)
- Connect one of the stores to the DevTools:
```javascript
const initial = 0;
const store = stk.store(initial);
stk.devtools.addStore(store, initial);
```