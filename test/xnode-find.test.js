import { XNode } from '../src/core/xnode';
import { xnew, xthis, xfind } from '../src/core/xnew';

beforeEach(() => {
    XNode.reset();
});

describe('xnode context', () => {
    it('basic', () => {
        const xnode1 = xnew(() => {
            xthis().key = 'aaa';
        });
        const xnode2 = xnew(() => {
            xthis().key = 'bbb';
        });
        const xnode3 = xnew(() => {
            xthis().key = 'bbb ccc';
        });

        expect(xfind('aaa')[0]).toBe(xnode1);
        expect(xfind('bbb')[0]).toBe(xnode2);
        expect(xfind('bbb')[1]).toBe(xnode3);
        expect(xfind('ccc')[0]).toBe(xnode3);
        expect(xfind('aaa bbb')[0]).toBe(xnode1);
        expect(xfind('aaa bbb')[1]).toBe(xnode2);
        expect(xfind('aaa bbb')[2]).toBe(xnode3);
    });

    it('delete', () => {
        const xnode1 = xnew((xnode1) => {
            xthis().key = 'aaa';
        });
        const xnode2 = xnew((xnode2) => {
            xthis().key = 'bbb';
        });
        const xnode3 = xnew((xnode3) => {
            xthis().key = 'bbb ccc';
        });
        xnode3.finalize();

        expect(xfind('aaa')[0]).toBe(xnode1);
        expect(xfind('bbb')[0]).toBe(xnode2);
        expect(xfind('bbb')[1]).toBe(undefined);
        expect(xfind('ccc')[0]).toBe(undefined);
        expect(xfind('aaa bbb')[0]).toBe(xnode1);
        expect(xfind('aaa bbb')[1]).toBe(xnode2);
        expect(xfind('aaa bbb')[2]).toBe(undefined);
    });

    it('component', () => {
        const xnode1 = xnew(A);
        const xnode2 = xnew(B);
        const xnode3 = xnew(C);
        function A() {
        }
        function B() {
        }
        function C() {
        }

        expect(xfind(A)[0]).toBe(xnode1);
        expect(xfind(B)[0]).toBe(xnode2);
        expect(xfind(C)[0]).toBe(xnode3);
    });
});

