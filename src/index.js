/**
 * Created by ndyumin on 09.09.2016.
 */

const {
    store,
    eventCreatorFactory,
    commandCreatorFactory,
    defaultProjection
} = require('./store');
const addStore = require('./devtools');
const flushStrategies = require('./flushStrategies');

module.exports = {
    store,
    eventCreatorFactory,
    commandCreatorFactory,
    defaultProjection,
    devtools: {
        addStore
    },
    flushStrategies
};