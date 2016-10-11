/**
 * Created by ndyumin on 04.10.2016.
 */


const stk = require('../src/');
const sum = (x, y) => x + y;
const store = stk.store(0);
const numberEvent = store.eventCreatorFactory(sum);
const log = v => console.log(v);

function dispatch(event, count) {
    Array
        .from({length: count}, (_, i) => i + 1)
        .forEach(event);
}

function compose(...fns) {
    return function(arg) {
        return fns.reduce((res, fn) => fn(res), arg);
    }
}

const hrstart = process.hrtime();

function dispatchAndMeasure(prev) {
    dispatch(numberEvent, 1000000);
    const [s0, ns0] = process.hrtime(prev);
    console.log(`${s0}.${ns0}`);
    return process.hrtime();
}

compose(
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,

    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,

    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,

    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure,
    dispatchAndMeasure
)(hrstart);

console.log('subscribe');
const beforeLog = process.hrtime();
store.subscribe(log);
const [s0, ns0] = process.hrtime(beforeLog);
console.log(`${s0}.${ns0}`);

const [s, ns] = process.hrtime(hrstart);
console.log(`${s}.${ns}`);


