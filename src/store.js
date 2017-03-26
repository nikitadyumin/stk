/**
 * Created by ndyumin on 15.09.2016.
 */

const {removeItem} = require('./arrays');
const {fromCallbacks, notifyAll} = require('./observers');
const {count100kFlushStrategy} = require('./flushStrategies');
const symbolObservable = require('symbol-observable');

function defaultProjection(events, initial) {
    return events.reduce(function (state, event) {
        return event.reduce(state, event.update);
    }, initial);
}

const createEvent = reduce => update => ({
    reduce,
    update
});

const createCommand = executor => executor;

const markAsBranchEvent = ev => Object.assign({}, ev, {$$branch: true});
const markAsMasterEvent = ev => Object.assign({}, ev, {$$master: true});
const isBranchEvent = e => e.$$branch;
const isMasterEvent = e => e.$$master;
const not = fn => (...args) => !fn(...args);

const toString = o => JSON.stringify(o);
const compose = (f, d) => (...args) => f(d(...args)) ;

function store(initial, flushStrategy = count100kFlushStrategy) {
    let events = [];
    let replicas = [];

    const flush = flushStrategy(defaultProjection);
    return {
        [symbolObservable]: function () {
            return this;
        },
        _eventLog (observer) {
            if (typeof observer === 'function') {
                observer = fromCallbacks(...arguments);
            }
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

            return this.view(defaultProjection).subscribe(observer);
        },
        plug(observable, reducer) {
            const event = this.createEvent(reducer);
            return observable.subscribe({
                next: event
            });
        },
        view(projectFn, viewInitial = initial) {
            let viewObservers = [];
            const onEvent = this._eventLog;
            const flush = flushStrategy(projectFn);
            return {
                subscribe (observer) {
                    if (typeof observer === 'function') {
                        observer = fromCallbacks(...arguments);
                    }
                    viewObservers.push(observer);
                    const projectAndNotify = () =>
                        observer.next(projectFn(events, viewInitial));

                    projectAndNotify();

                    const subscription = onEvent(() => {
                        projectAndNotify();
                        [, viewInitial] = flush(events, viewInitial);
                    });

                    return {
                        unsubscribe() {
                            subscription.unsubscribe();
                            viewObservers = removeItem(viewObservers, observer);
                        }
                    };
                }
            }
        },
        _reset() {
            events.length = 0;
        },
        branch(autoRebase = false) {
            const _altEvents = [];
            const branch = store(initial);
            events.forEach(branch.dispatch);

            const bSubs = branch._eventLog(ev => _altEvents.push(ev));

            const rebase = () => {
                const alt = _altEvents.slice(0);
                _altEvents.length = 0;
                branch._reset();
                events.map(markAsMasterEvent).concat(alt).forEach(branch.dispatch);
            };

            if (autoRebase) {
                this._eventLog(rebase);
            }

            return {
                store: () => branch,
                rebase,
                merge: () => {
                    bSubs.unsubscribe();
                    _altEvents.filter(not(isMasterEvent)).forEach(this.dispatch);
                    _altEvents.length = 0;
                },
                delete: () => {
                    bSubs.unsubscribe();
                    _altEvents.length = 0;
                }
            };
        },
        dispatch(event) {
            events.push(event);
            notifyAll(replicas, event);
            [events, initial] = flush(events, initial);
        },
        createCommand(fn) {
            return (...args) => {
                return new Promise(res => {
                    const subscription = this.subscribe(state => {
                        res(fn(state, ...args));
                        subscription.unsubscribe();
                    });
                });
            };
        },
        createEvent(reduce) {
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
    createEvent,
    createCommand,
    defaultProjection
};