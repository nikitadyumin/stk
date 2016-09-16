/**
 * Created by ndyumin on 15.09.2016.
 */
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

module.exports = {
    notifyAll,
    fromCallbacks
};