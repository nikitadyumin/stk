/**
 * Created by ndyumin on 09.09.2016.
 */
const stk = require('../src/');
const symbolObservable = require('symbol-observable');
const rxjs = require('rxjs');

const state = stk.data({a:4});
const sum = (s, u) => Object.assign({}, s, {a: s.a + u});
state.subscribe({
    next(v) {
        console.log(10, v);
    }
});
const subs = state.subscribe({
    next(v) {
        console.log(11, v);
    }
});
state.reduce(rxjs.Observable.of(1,2,3), sum);
state.subscribe({
    next(v) {
        console.log(1, v);
    }
});
state.subscribe({
    next(v) {
        console.log(2, v);
    }
});

subs.unsubscribe();

state.reduce(rxjs.Observable.of(1,2,3,4), sum);


console.log(state[symbolObservable]() === state );