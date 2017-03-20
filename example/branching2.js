/**
 * Created by ndyumin on 25.09.2016.
 */
const stk = require('../src/');
const log = l => v => console.log(l, v);

const add = (x,y) => x+ y;
const mult = (x,y) => x* y;

const state = stk.store(0);

state.subscribe(log('state'));
const t = state.transaction();
const t2 = state.transaction();

t.store().subscribe(log('transaction'));
t2.store().subscribe(log('transaction2'));

const stateEvent = state.createEvent(add);
const transactionEvent = t.store().createEvent(mult);
const transaction2Event = t2.store().createEvent(mult);

stateEvent(2);
transactionEvent(3) ;
stateEvent(2);
transaction2Event(4) ;
t.commit();
t2.commit();
