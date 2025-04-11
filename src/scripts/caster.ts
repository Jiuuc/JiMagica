import { MagicElement } from "./element.js";
import { Main } from "./module.js";

export class Caster {
    actor: Actor;
    elements: [MagicElement, MagicElement, MagicElement];
    castingElements: MagicElement[] = [];

    constructor(actor: Actor, element1: MagicElement, element2: MagicElement, element3: MagicElement) {
        this.actor = actor;
        this.elements = [element1, element2, element3]
    }

    getActor(): Actor {
        return this.actor;
    }

    getElements(): [MagicElement, MagicElement, MagicElement] {
        return this.elements;
    }

    castElement(index: number) {
        if (this.castingElements.push(this.elements[index]) == 3) {
            this.castingElements.sort(MagicElement.compareMagicElement)
            Main.logInChat(this.castingElements.map(element => element.getName()).join(", "))
            this.castingElements = []
        }
    }
}