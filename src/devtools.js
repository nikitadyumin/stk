/**
 * Created by ndyumin on 02.10.2016.
 */


module.exports = function addStore(_store, initial) {
    const resetEvent = _store.createEvent((s, u) => u.state);
    const devtool = window.devToolsExtension(function(s, u) {
        return u.type === '@@INIT' ? initial : u.reduce(s, u.update);
    });

    devtool.subscribe(()=> resetEvent({
        _type: '@@RESET',
        state: devtool.getState()
    }));

    _store._eventLog(ev => {
        if (ev.update && ev.update._type !== '@@RESET') {
            devtool.dispatch(Object.assign(ev, {type: ev.reduce.name}))
        }
    });

    return devtool;
};
