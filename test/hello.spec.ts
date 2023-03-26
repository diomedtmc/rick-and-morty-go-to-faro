import handler from '../src/pages/api/hello';

describe('Hello Test', () => {
    it('Can run a test', () => {
        expect(handler).toBeDefined;
    })
});