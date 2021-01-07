describe('SpyOBJ', () => {
    const calculadora = {
        somar:(n1, n2) => n1+n2,
        subtrair:(n1,n2) => n1-n2,
        mult: (n1,n2) => n1*n2,
        div: (n1,n2) => n1/n2
    };
    beforeEach(() => {
        spyOn(calculadora, 'somar');
        spyOn(calculadora, 'subtrair').and.callThrough();
        spyOn(calculadora, 'mult').and.returnValue(10);
        spyOn(calculadora, 'div').and.callFake((n1, n2)=>n1 + n2)

    });
    it('should be undefined', () => {
        expect(calculadora.somar(1,1)).toBeUndefined();
    });
    it('should be called once', () => {
        calculadora.somar(1,1);
        expect(calculadora.somar).toHaveBeenCalled();
    });
    it('should be called many times', () => {
        calculadora.somar(1,1);
        calculadora.somar(1,2);
        expect(calculadora.somar).toHaveBeenCalledTimes(2);
    });
    it('should be called with', () => {
        calculadora.somar(1,2);
        calculadora.somar(2,4)
        expect(calculadora.somar).toHaveBeenCalledWith(1,2);
        expect(calculadora.somar).not.toHaveBeenCalledWith(2,3);
        expect(calculadora.somar).toEqual(jasmine.anything());

    });
    it('should be through', () => {
        expect(calculadora.subtrair(4, 2)).toEqual(2);
        expect(calculadora.somar(1,2)).toBeUndefined();
    });
    it('should return value...', () => {
        expect(calculadora.mult(3,6)).toEqual(10);
    });
    it('should return fakespy', () => {
        expect(calculadora.div(4,2)).toEqual(6);
    });
    it('should return all', () => {
        calculadora.somar(1,2);
        const result = calculadora.somar.calls.all();
        expect(result[0].object).toEqual(calculadora)
        expect(result[0].args).toEqual([1,2]);
        expect(result[0].returnValue).toBeUndefined();
    });
    it('should be jasmine.any', () => {
        dobro = jasmine.createSpy("dobro");
        dobro(10);
        expect(dobro).toHaveBeenCalledWith(jasmine.any(Number));
        expect({}).toEqual(jasmine.anything());
    });
    

})