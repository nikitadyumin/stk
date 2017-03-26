/**
 * Created by ndyumin on 22.03.2017.
 */
const {store} = require ('../src/index');

const env0 = {
    counters: [
        'a1','a2', 'a3'
    ],
    field: 123
};

const env = {
    counters: [
        'a1','a2'
    ],
    field: 123
};

const env2 = {
    counters: [
        'a1'
    ],
    field: 123
};

const counter$ = store(env0);
const log = fn => (...args) => (console.log('log', args), fn(...args));

const reset = (env, value) => value;
const fromServer = counter$.createEvent((reset));
fromServer(env);

const t = counter$.branch(true);

const update = (env, value) => Object.assign({}, env, {field: value});
const changeField = t.store()
    .createEvent((update));

t.store().subscribe(v => console.log('transaction', v));
counter$.subscribe(v => console.log('store', v));

changeField(56);
changeField(56234);
// fromServer(env2);
// fromServer(env2);
fromServer(env2);

// t.rebase();
t.merge();
t.delete();

