const registerItem = require('../src/game.js');


describe('should test about the game', () => {
    it('should add player in game...', () => {
        expect(registerItem(1)).toEqual(1);
    });


});