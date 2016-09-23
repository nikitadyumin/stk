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

function actions(initial) {
    const events = [];
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
            const event = this.createEvent(reducer);
            return observable.subscribe({
                next: event
            });
        },
        view(projectFn) {
            let _viewObservers = [];
            const eventLog = this._eventLog;

            return {
                subscribe (observer) {
                    if (typeof observer === 'function') {
                        observer = fromCallbacks(...arguments);
                    }
                    _viewObservers.push(observer);
                    const subs = eventLog(function () {
                        observer.next(projectFn(events, initial));
                    });

                    return {
                        unsubscribe() {
                            subs.unsubscribe();
                            _viewObservers = removeItem(_viewObservers, observer);
                        }
                    };
                }
            }
        },
        dispatch(event) {
            events.push(event);
            notifyAll(replicas, event);
        },
        createCommand(executor) {
            return update => executor(update);
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
actions.defaultProjection = project;

actions.createEvent = function (reduce) {
    return function (update) {
        return {
            reduce,
            update
        };
    }
};
actions.createCommand = function(executor) {
    return update => executor(update);
};

module.exports = actions;