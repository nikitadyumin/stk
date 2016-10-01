# State management toolkit


## Basics
`.subscribe(Observer)`

`.subscribe(onNext, onError, onComplete)`
subscribe for state updates

example
```
stk.store(10).subscribe(state => console.log(state));
stk.store(20).subscribe({
    next(state) {
        console.log(state);
    }
});
```

`.dispatch(Event)`
dispatches an event (produced with an eventCreator)
```
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
```
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
