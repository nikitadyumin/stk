/**
 * Created by ndyumin on 13.09.2016.
 */
const stk = require('../src/');


const sum = (x, y) => x + y;

const store = stk.store(0);
const numberEvent = stk.createEvent((x, y) => x + y);
store.subscribe(v=> console.log(v));
store.dispatch(numberEvent(1));
store.dispatch(numberEvent(2));
store.dispatch(numberEvent(3));
store.dispatch(numberEvent(4));

const _store = stk.store(0);
const dispatchNumberEvent = _store.createEvent((x, y) => x + y);
_store.subscribe(v=> console.log(v));
dispatchNumberEvent(1);
dispatchNumberEvent(2);
dispatchNumberEvent(3);
dispatchNumberEvent(4);
