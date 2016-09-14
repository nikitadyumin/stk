/**
 * Created by ndyumin on 13.09.2016.
 */
const stk = require('../src/');

const sum = (x, y) => x + y;

const state = stk.data({amount:0});
const actions = stk.actions(1);

state.subscribe(v => console.log(v));
state.reduce(actions, (s, u) => Object.assign({}, s, {amount: u}));

const addEvent = stk.actions.createEvent(sum);
const add = actions.createEvent(sum);
actions.dispatch(addEvent(2));
actions.dispatch(addEvent(3));
actions.dispatch(addEvent(4));

add(20);
add(30);
add(40);