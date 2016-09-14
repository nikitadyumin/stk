/**
 * Created by ndyumin on 13.09.2016.
 */
const stk = require('../src/');

const actions = stk.actions(0);
const sum = (x, y) => x + y;

const addEvent = stk.actions.createEvent(sum);

actions.subscribe({
    next(v) {
        console.log(v);
    }
});

actions.dispatch(addEvent(1));
actions.dispatch(addEvent(2));
actions.dispatch(addEvent(3));
actions.dispatch(addEvent(4));