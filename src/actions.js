/**
 * Created by ndyumin on 15.09.2016.
 */

const {removeItem} = require('./arrays');
const {fromCallbacks, notifyAll} = require('./observers');
const symbolObservable = require('symbol-observable');

function actions(initial) {
    const events = [];
    let subscribers = [];
    let snapshots = [];

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

module.exports = actions;