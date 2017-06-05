/**
 * Created by ndyumin on 05.06.2017.
 */
import {store} from '../src/index';
const sum = (x,y) => x + y;
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
});