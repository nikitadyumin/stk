/**
 * Created by ndyumin on 05.06.2017.
 */
import {store} from '../src/index';
const sum = (x,y) => x + y;
const reset = (_,x) => x;

describe('regression testing', () => {
    it('unsubscribes from views correctly', () => {
        const s = store(0);

        function defaultProjection(events, initial) {
            return events.reduce(function (state, event) {
                return event.reduce(state, event.update);
            }, initial);
        }

        const view = s.view(defaultProjection);
        const add = s.createEvent(sum);
        let acc1 = 0;
        let acc2 = 0;
        const v1 = view.subscribe(value => {
            acc1 += value;
        });
        const v2 = view.subscribe(value => {
            acc2 += value;
        });
        add(1);
        add(2);
        add(3);
        v1.unsubscribe();
        v2.unsubscribe();
        add(4);
        // 1 + 3 + 6
        expect(acc1).toBe(10);
        expect(acc2).toBe(10);
    });
    it('unsubscribes correctly', done => {
        const s = store(0);

        let acc1 = 0;
        let acc2 = 0;
        const v1 = s.subscribe(value => {
            acc1 += value;
        });
        const v2 = s.subscribe(value => {
            acc2 += value;
        });
        const add = s.createEvent(sum);
        add(1);
        add(2);
        add(3);
        v1.unsubscribe();
        v2.unsubscribe();
        add(4);
        // 1 + 3 + 6
        expect(acc1).toBe(10);
        expect(acc2).toBe(10);
        const run = s.createCommand((state, update) => {
            expect(state).toBe(10);
            expect(update).toBe(123);
            done();
        });
        run(123);
    });
    it('shows initial value', () => {
        const s = store(0);
        const add = s.createEvent(sum);
        const s1 = s.subscribe(value => {
            expect(value).toBe(0);
        });
        s1.unsubscribe();
        add(10);
        const s2 = s.subscribe(value => {
            expect(value).toBe(10);
        });
        s2.unsubscribe();
    });

    it('does not loop in command executor', done => {
        const s = store(1);

        const event = s.createEvent(reset);
        const cmd = s.createCommand((state, update) => {
            expect(state).toBe(1);
            event(10);
            return 10 + update;
        });

        cmd(123).then(result => {
            expect(result).toBe(133);
            done();
        });
    })

});