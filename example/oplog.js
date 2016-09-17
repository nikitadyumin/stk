/**
 * Created by ndyumin on 17.09.2016.
 */
const stk = require('../src/');

const state = stk.actions(0);
const sum = (x, y) => x + y;

const addEvent = state.createEvent(sum);

const log = v => console.log(v);

// state.subscribe(log)
addEvent(1);
addEvent(2);
state._eventLog(log);
addEvent(3);
addEvent(4);