/**
 * Created by ndyumin on 09.09.2016.
 */

const {
    store,
    createCommand,
    createEvent,
    defaultProjection
} = require('./store');

const addStore = require('./devtools');

const flushStrategies = require('./flushStrategies');

module.exports = {
    store,
    createCommand,
    createEvent,
    defaultProjection,
    devtools: {
        addStore
    },
    flushStrategies
};