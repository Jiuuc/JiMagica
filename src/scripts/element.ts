export class MagicElement {
    name: string
    
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    static compareMagicElement(a: MagicElement, b: MagicElement): number {
        return a.getName().localeCompare(b.getName());
    }
}