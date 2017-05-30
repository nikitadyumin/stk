/**
 * Created by ndyumin on 20.03.2017.
 */

const {store} = require('../src/');

const sum = (x, y) => x + y;
const mult = (x, y) => x * y;
const compose = (f, d) => (...args) => f(d(...args));

xtest('basic transaction', () => {
    /**

     0 (init)
     |
     0      >>(branch)>>    0
     +2 (2)     ->          +2 (2)
     |                      *3 (6)
     +2 (4)     ->          +2 (8)
     |                      *3 (24)
     24     <<(merge)<<
     +1 (25)

     */

    const mainState = jest.fn();
    const transaction = jest.fn();

    const state = store(0);

    state.subscribe(mainState);
    const t = state.branch(true);

    t.store().subscribe(transaction);

    const stateEvent = state.createEvent(sum);
    const transactionEvent = t.store().createEvent(mult);

    stateEvent(2);
    transactionEvent(3);
    stateEvent(2);
    transactionEvent(3);
    t.merge();
    stateEvent(1);

    expect(mainState.mock.calls.length).toBe(6);
    expect(mainState.mock.calls).toEqual([ [ 0 ], [ 2 ], [ 4 ], [ 24 ], [ 25 ] ]);

    expect(transaction.mock.calls.length).toBe(5);
    expect(transaction.mock.calls).toEqual([ [ 0 ], [ 2 ], [ 6 ], [ 8 ], [ 24 ] ]);
});


xtest('test 2 transactions', () => {

    /**

     0          0           0
     +2(2) ->  +2(2)  ->   +2(2)
     |         *3(6)        |
     +2(4) ->  +2(8)  ->   +2(4)
     |          |          *4(16)
     8    <<<               |

     16              <<<
     */

    const clb0 = jest.fn();
    const clb1 = jest.fn();
    const clb2 = jest.fn();


    const state = store(0);

    state.subscribe(clb0);
    const t = state.branch();
    const t2 = state.branch();

    t.store().subscribe(clb1);
    t2.store().subscribe(clb2);

    const stateEvent = state.createEvent(sum);
    const transactionEvent = t.store().createEvent(mult);
    const transaction2Event = t2.store().createEvent(mult);

    stateEvent(2);
    transactionEvent(3) ;
    stateEvent(2);
    transaction2Event(4) ;
    t.merge();
    t2.merge();

    // console.log(clb1.mock.calls);
    // console.log(clb2.mock.calls);

    expect(clb0.mock.calls.length).toBe(5);
    expect(clb0.mock.calls).toEqual([ [ 0 ], [ 2 ], [ 4 ], [ 8 ], [ 16 ] ]);

    expect(clb1.mock.calls.length).toBe(4);
    expect(clb1.mock.calls).toEqual([ [ 0 ], [ 2 ], [ 6 ], [ 8 ] ]);

    expect(clb2.mock.calls.length).toBe(5);
    expect(clb2.mock.calls).toEqual([ [ 0 ], [ 2 ], [ 4 ], [ 16 ], [ 16 ] ]);

});