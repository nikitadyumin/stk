/**
 * Created by ndyumin on 15.09.2016.
 */

const {removeItem} = require('./arrays');
const {fromCallbacks, notifyAll} = require('./observers');
const symbolObservable = require('symbol-observable');

function project(events, initial) {
    return events.reduce(function (state, event) {
        return event.reduce(state, event.update);
    }, initial);
}

const eventCreatorFactory = reduce => update => ({
    reduce,
    update
});

const commandCreatorFactory = executor => executor;

function store(initial) {
    let events = [];
    let replicas = [];

    return {
        [symbolObservable]: function () {
            return this;
        },
        _eventLog (observer) {
            if (typeof observer === 'function') {
                observer = fromCallbacks(...arguments);
            }
            events.forEach(observer.next);
            replicas.push(observer);

            return {
                unsubscribe() {
                    replicas = removeItem(replicas, observer);
                }
            };
        },
        subscribe(observer) {
            if (typeof observer === 'function') {
                observer = fromCallbacks(...arguments);
            }

            return this.view(project).subscribe(observer);
        },
        plug(observable, reducer) {
            const event = this.eventCreatorFactory(reducer);
            return observable.subscribe({
                next: event
            });
        },
        view(projectFn) {
            let _viewObservers = [];
            const onEvent = this._eventLog;

            return {
                subscribe (observer) {
                    if (typeof observer === 'function') {
                        observer = fromCallbacks(...arguments);
                    }
                    _viewObservers.push(observer);
                    const projectAndNotify = () =>
                        observer.next(projectFn(events, initial));

                    projectAndNotify();

                    const subscription = onEvent(projectAndNotify);

                    return {
                        unsubscribe() {
                            subscription.unsubscribe();
                            _viewObservers = removeItem(_viewObservers, observer);
                        }
                    };
                }
            }
        },
        transaction() {
            const _branchRev = events.length;
            const _altEvents = [];
            const branch = store(initial);
            const subs = this._eventLog(branch.dispatch);
            const bSubs = branch._eventLog(ev => _altEvents.push(ev));
            return {
                store: () => branch,
                dispatch: branch.dispatch,
                commit: () => {
                    subs.unsubscribe();
                    bSubs.unsubscribe();
                    events = events.slice(0, _branchRev).concat(_altEvents);
                    _altEvents.length = 0;
                    notifyAll(replicas, eventCreatorFactory(s=>s)())
                },
                cancel: () => {
                    subs.unsubscribe();
                    bSubs.unsubscribe();
                    _altEvents.length = 0;
                }
            };
        },
        dispatch(event) {
            events.push(event);
            notifyAll(replicas, event);
        },
        commandCreatorFactory,
        eventCreatorFactory(reduce) {
            return update =>
                this.dispatch({
                    reduce,
                    update
                });
        }
    };
}

module.exports = {
    store,
    eventCreatorFactory,
    commandCreatorFactory,
    defaultProjection: project
};