const {store, createEvent, createCommand} = require('../src/');

const sum = (x, y) => x + y;
const compose = (f, d) => (...args) => f(d(...args));

test('create store, subscribe and immediately get value', () => {
    const clb = jest.fn();
    const testStore = store(10);
    testStore.subscribe(clb);

    expect(clb.mock.calls.length).toBe(1);
    expect(clb.mock.calls[0]).toEqual([10]);

});


test('event creators (unbound)', () => {
    const clb = jest.fn();

    const testStore = store(0);
    const numberEvent = createEvent(sum);
    testStore.subscribe(clb);

    testStore.dispatch(numberEvent(1));
    testStore.dispatch(numberEvent(2));
    testStore.dispatch(numberEvent(3));
    testStore.dispatch(numberEvent(4));

    expect(clb.mock.calls.length).toBe(5);
    expect(clb.mock.calls[4]).toEqual([10]);
});

test('event creators (bound)', () => {
    const clb = jest.fn();
    const testStore = store(0);
    const dispatchNumberEvent = testStore.createEvent(sum);
    testStore.subscribe(clb);

    dispatchNumberEvent(1);
    dispatchNumberEvent(2);
    dispatchNumberEvent(3);
    dispatchNumberEvent(4);

    expect(clb.mock.calls.length).toBe(5);
    expect(clb.mock.calls[4]).toEqual([10]);
});

test('create command (sync)', () => {
    const clb = jest.fn();
    const testStore = store(1);
    const sumCommand = testStore.createCommand(sum);

    const check = () => {
        expect(clb.mock.calls.length).toBe(1);
        expect(clb.mock.calls[0]).toEqual([5]);
    };

    sumCommand(4).then(compose(check, clb));
});

test('create command (async)', () => {
    const clb = jest.fn();
    const testStore = store(1);
    const sumCommand = testStore.createCommand(compose(Promise.resolve.bind(Promise), sum));

    const check = () => {
        expect(clb.mock.calls.length).toBe(1);
        expect(clb.mock.calls[0]).toEqual([5]);
    };

    sumCommand(4).then(compose(check, clb));
});
