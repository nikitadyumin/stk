/**
 * Created by ndyumin on 09.09.2016.
 */

const symbolObservable = require('symbol-observable');

function extract(arr, obj) {
    return arr.filter(item => Object.keys(obj).every(key => item[key] === obj[key]));
}

function removeItem(arr, item) {
    const result = arr.slice(0);
    const index = result.indexOf(item);
    result.splice(index, 1);
    return result;
}

function notifyAll(observers, state) {
    observers.forEach(o => o.next(state));
}

function fromCallbacks(next, error, complete) {
    return {
        next,
        error,
        complete
    };
}

function data(initial) {
    let state = initial;
    let subscriptions = [];
    let observers = [];

    function _unsubscribeAndRemove(observable, reducer) {
        const toBeRemoved = extract(subscriptions, {observable, reducer});
        toBeRemoved.forEach(subscription => subscription.unsubscribe());
        subscriptions = toBeRemoved.reduce(removeItem, subscriptions);
    }

    return {
        [symbolObservable]: function() {
            return this;
        },

        reduce (observable, reducer) {
            const subscription = observable.subscribe({
                next(v) {
                    state = reducer(state, v);
                    notifyAll(observers, state);
                },
                error(e) {

                },
                complete() {
                    _unsubscribeAndRemove(observable, reducer);
                }
            });

            subscriptions.push({
                observable,
                reducer,
                subscription
            });

            return this;
        },

        remove(observable, reducer) {
            _unsubscribeAndRemove(observable, reducer);
        },

        subscribe(observer) {
            if (typeof observer === 'function') {
                observer = fromCallbacks(...arguments);
            }

            observers.push(observer);
            observer.next(state);
            return {
                unsubscribe() {
                    observers = removeItem(observers, observer);
                }
            };
        }
    };
}

function actions(initial) {
    const events = [];
    let subscribers = [];

    function project() {
        return events.reduce(function(state, event) {
            return event.reduce(state, event.update);
        }, initial);
    }

    return {
        subscribe(observer) {
            if (typeof observer === 'function') {
                observer = fromCallbacks(...arguments);
            }
            subscribers.push(observer);
            return {
                unsubscribe() {
                    subscribers = removeItem(subscribers, observer);
                }
            };
        },
        dispatch(event) {
            events.push(event);
            notifyAll(subscribers, project())
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

actions.createEvent = function(reduce) {
    return function(update) {
        return {
            reduce,
            update
        };
    }
};

module.exports = {
    data,
    actions
};