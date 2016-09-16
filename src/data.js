/**
 * Created by ndyumin on 15.09.2016.
 */
const {removeItem, extract} = require('./arrays');
const {fromCallbacks, notifyAll} = require('./observers');
const symbolObservable = require('symbol-observable');

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

module.exports = data;