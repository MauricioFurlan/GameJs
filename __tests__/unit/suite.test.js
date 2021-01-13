const {
  somar1
} = require('../../src/suite');

describe('canvas rules', () => {
  it('should exist a canvas ', () => {
    const canvas = document.getElementById('screen');
    console.log(canvas);
      expect(somar1(1,2)).toEqual(3);
  });
});
