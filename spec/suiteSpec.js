const {
    somar1,
    sub
    } = require('../src/suite.js');

describe('Operação de adicição', () => {
    it('should behave...', () => {
        expect(somar1(1, 2)).toEqual(3);
    });
    it('should behav2e...', () => {
        expect(sub(1)).toEqual(1);
    });

});