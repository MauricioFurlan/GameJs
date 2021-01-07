describe('trow', () => {
    it('should be trow', () => {
        function somar(n1, n2) { n1+n2 };
        function multiplicar() {  mul * 10 };
        expect(multiplicar).toThrow();
        expect(somar).not.toThrow();
    });
});