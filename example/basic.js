/**
 * Created by ndyumin on 13.09.2016.
 */
const stk = require('../src/');
const most = require('most');

const state = stk.data(1);
const sum = (x, y) => x + y;

state.reduce(most.from([2,3,4]), sum);
state.subscribe({
    next(v) {
        console.log(v);
    },
    error(e) {
        console.log('error', e);
    },
    complete() {
        console.log('finished');
    }
});

state.subscribe(
    function next(v) {
        console.log(v);
    },
    function error(e) {
        console.log('error', e);
    },
    function complete() {
        console.log('finished');
    }
);