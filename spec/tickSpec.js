describe('Tick do jasmine clock', () => {
    beforeEach(() => {
        jasmine.clock().install();
    })

    afterEach(() => {
        jasmine.clock().uninstall();
    })
    let dobro;
    beforeAll(() => {
        dobro = jasmine.createSpy('dobro');
    })

    it('should show setTimeout...', () => {
        setTimeout(() => {
            dobro(10);
        }, 1000);
        jasmine.clock().tick(1000);
        expect(dobro).toHaveBeenCalled();
    });
    it('should show setInteraval', () => {
        setInterval(() => {
            dobro(10);
        }, 500);
        jasmine.clock().tick(1000);
        expect(dobro).toHaveBeenCalled();

    });
});