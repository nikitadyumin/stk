/**
 * Created by ndyumin on 04.10.2016.
 */

function immediateFlushStrategy(project) {
    return function (events, initial) {
        const projection = project(events, initial);
        return [[], projection];
    }
}

function neverFlushStrategy(project) {
    return function (events, initial) {
        return [events, initial];
    }
}

function count100kFlushStrategy(project) {
    return function (events, initial) {
        return events.length >= 100000
            ? [[], project(events, initial)]
            : [events, initial];
    };
}

module.exports = {
    count100kFlushStrategy,
    neverFlushStrategy,
    immediateFlushStrategy
};