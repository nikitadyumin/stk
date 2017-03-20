/**
 * Created by ndyumin on 09.09.2016.
 */
const sum = (s, u) => Object.assign({}, s, {a: s.a + u});
const initial = {a: 0, c: {b:  'abc'}};
const _store = store(initial);

const numberEvent = _store.createEvent(sum);

devtools.addStore(_store, initial);

_store.subscribe(v => {
    document.getElementById('result').innerHTML = v.a;
});
document.getElementById('inc').addEventListener('click', () => numberEvent(1));
document.getElementById('dec').addEventListener('click', () => numberEvent(-1));
numberEvent(1);
numberEvent(2);
numberEvent(3);
numberEvent(4);