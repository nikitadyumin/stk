/**
 * Created by ndyumin on 20.09.2016.
 */
const stk = require('../src/');

const state = stk.actions(0);
const sum = (x, y) => x + y;

const addEvent = state.createEvent(sum);

const log = i => v => console.log(i, v);
const defaultView = state.view(state._project);
const multiplyView = state.view(function(events, initial) {
    return events.reduce((result, event) => result * event.update, 1);
});
defaultView.subscribe(log(1));
multiplyView.subscribe(log(2));
addEvent(1);
addEvent(2);
addEvent(3);
addEvent(4);

// state.subscribe(log)