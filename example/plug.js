/**
 * Created by ndyumin on 21.09.2016.
 */
const stk = require('../src/');
const Rx = require('rxjs');

const add = (x, y) => x + y;

const state = stk.store(0);
const log = v => console.log(v);

state.subscribe(log);
state.plug(Rx.Observable.from([1,2,3,4]), add);
const event = state.eventCreatorFactory(add);
event(20);
event(30);
event(40);
