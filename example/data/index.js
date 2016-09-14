/**
 * Created by ndyumin on 09.09.2016.
 */
const actions = data({a:4});
const sum = (s, u) => Object.assign({}, s, {a: s.a + u});

actions.subscribe({
    next(v) {
        console.log(10, v);
        document.body.innerHTML = v.a;
    }
});

const subs = actions.subscribe({
    next(v) {
        console.log(11, v);
    }
});

actions.reduce(Rx.Observable.of(1,2,3), sum);
subs.unsubscribe();
actions.reduce(Rx.Observable.of(1,2,3,4), sum);
