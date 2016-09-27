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

t.store().subscribe(log('transaction'));

const stateEvent = state.eventCreatorFactory(add);
const transactionEvent = t.store().eventCreatorFactory(mult);

stateEvent(2);
transactionEvent(3) ;
stateEvent(2);
transactionEvent(3) ;
t.commit();
stateEvent(1);
