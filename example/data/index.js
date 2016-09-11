/**
 * Created by ndyumin on 09.09.2016.
 */
const state = data({a:4});
const sum = (s, u) => Object.assign({}, s, {a: s.a + u});

state.subscribe({
    next(v) {
        console.log(10, v);
        document.body.innerHTML = v.a;
    }
});

const subs = state.subscribe({
    next(v) {
        console.log(11, v);
    }
});

state.reduce(Rx.Observable.of(1,2,3), sum);
subs.unsubscribe();
state.reduce(Rx.Observable.of(1,2,3,4), sum);
