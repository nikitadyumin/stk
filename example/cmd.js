/**
 * Created by ndyumin on 13.09.2016.
 */
const stk = require('../src/');

const store = stk.store(10);

const log = v => console.log(v);
const mult = (x, y) => x * y;

const consoleCommand = store.createCommand((state, label) => log(`${label}: ${state}`));
const asyncMultCommand = store.createCommand((x, y) => Promise.resolve(x * y));
const syncMultCommand = store.createCommand(mult);
const dispatchAdd = store.createEvent((x, y) => x + y);

consoleCommand('test');

dispatchAdd(123);

consoleCommand('test2');

asyncMultCommand(100).then(log);

dispatchAdd(3);
dispatchAdd(2);

syncMultCommand(10000).then(log);
