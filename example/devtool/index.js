/**
 * Created by ndyumin on 09.09.2016.
 */
const sum = (s, u) => Object.assign({}, s, {a: s.a + u});
const initial = {a: 0, c: {b:  'abc'}};
const _store = store(initial);

const numberEvent = _store.eventCreatorFactory(sum);

const resetEvent = _store.eventCreatorFactory((s, u) => u.state);

const devtool = window.devToolsExtension(function(s, u) {
    return u.type === '@@INIT' ? initial : u.reduce(s, u.update);
});

devtool.subscribe(()=> resetEvent({
    _type: '@@RESET',
    state: devtool.getState()
}));

_store._eventLog(ev => {
    if (ev.update._type !== '@@RESET') {
        devtool.dispatch(Object.assign(ev, {type: ev.reduce.name}))
    }
});

_store.subscribe(v => {
    document.getElementById('result').innerHTML = v.a;
});
document.getElementById('inc').addEventListener('click', () => numberEvent(1));
document.getElementById('dec').addEventListener('click', () => numberEvent(-1));
numberEvent(1);
numberEvent(2);
numberEvent(3);
numberEvent(4);