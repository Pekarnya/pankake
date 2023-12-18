class IdGenerator {
    public id: number;
    constructor() {
        this.id = 0;
    }

    generateId(): number {
        return this.id++;
    }

    reset() {
        this.id = 0;
    }
}

export const idGenerateFunctor = new IdGenerator();