/**
 * Created by ndyumin on 15.09.2016.
 */

const {removeItem} = require('./arrays');
const {fromCallbacks, notifyAll} = require('./observers');
const symbolObservable = require('symbol-observable');

function actions(initial) {
    const events = [];
    let snapshots = [];
    let replicas =[];

    function projectFrom(initial, sequence) {
        return sequence.reduce(function(state, event) {
            return event.reduce(state, event.update);
        }, initial);
    }

    function project() {
        const latestSnapshot = snapshots[snapshots.length - 1];
        if (events.length === snapshots.length) {
            return latestSnapshot;
        } else {
            const sequence = events.slice(snapshots.length);
            return snapshots[events.length - 1] = projectFrom(latestSnapshot || initial, sequence);
        }
    }

    return {
        [symbolObservable]: function() {
            return this;
        },
        _project: project,
        _eventLog: function(observer) {
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
            return this._eventLog(function (_value) {
                observer.next(project());
            });
        },
        dispatch(event) {
            events.push(event);
            notifyAll(replicas, event);
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

module.exports = actions;