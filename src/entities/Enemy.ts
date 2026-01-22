import { Character } from "./Character.js";
import { HealthPotion } from "./ConcreteConsumable.js";

export abstract class Enemy extends Character {
    constructor(name: string) { super(name) }
}

export class Goblin extends Enemy {
    constructor(name: string) {
        super(name);
        this.money = Math.floor(Math.random() * 5);
    }
}

export class Ogre extends Enemy {
    constructor(name: string) {
        super(name);
        this.inventory.add(new HealthPotion());
    }
}