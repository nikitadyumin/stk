/**
 * Created by ndyumin on 21.09.2016.
 */
const stk = require('../src/');
const log = l => v => console.log(l, v);

const setName = (s, u) => Object.assign({}, s, {name: u});
const setData = (s, u) => Object.assign({}, s, {data: u});

const state = stk.actions({});

state.subscribe(log('state'));

const asyncNameRequest = id => id < 50
    ? Promise.resolve('Name')
    : Promise.reject('reason for name');

const asyncDataRequest = name => name === 'Name'
    ? Promise.resolve(Math.random())
    : Promise.reject('reason for data');

const nameChanged = state.createEvent(setName);
const dataChanged = state.createEvent(setData);

const requestData = state.createCommand(name =>
    asyncDataRequest(name)
        .then(dataChanged));

const requestName = state.createCommand(id =>
    asyncNameRequest(id)
        .then(name => {
            nameChanged(name);
            return requestData(name);
        })
        .catch(function(e){
            nameChanged('');
            dataChanged('');
            log('error: ')(e);
        }));

requestName(40);
requestName(400);