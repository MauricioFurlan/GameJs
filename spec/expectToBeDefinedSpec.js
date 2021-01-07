describe('test to be defined', () => {
    it('variable should be defined', () => {
        const mauricio = 10;
        const marina = undefined;
        expect(mauricio).toBeDefined();
        expect(marina).not.toBeDefined();
    });
    it('variavel should be undefined', () => {
        const charmander = undefined;
        const mauricio = 10;
        expect(charmander).toBeUndefined();
        expect(mauricio).not.toBeUndefined();
    });
    it('variavel should be null', () => {
        const marina = null;
        const mauricio = 10;
        const blastoise = undefined;
        const charmander = NaN;
        const pikachu = "teste";
        expect(marina).toBeNull();
        expect(mauricio).not.toBeNull();
        expect(blastoise).not.toBeNull();
        expect(charmander).not.toBeNull();
        expect(pikachu).not.toBeNull();
        });
        it('should to be truthy', () => {
            const mauricio = true;
            const marina = false;
            const charmander = undefined;
            const oi = "oi";
            const eita = NaN;
            expect(mauricio).toBeTruthy();
            expect(marina).toBeFalse();
            expect(charmander).not.toBeTruthy();
            expect(oi).toBeTruthy();
            expect(eita).not.toBeTruthy();
        });
        it('should be contain', () => {
            const lista = ['marina','mauricio', 'hanna', 'bruna'];
            expect(lista).toContain('marina');
            expect(lista).not.toContain('joao');
            expect(lista[1]).toContain('mauricio');
        });
});