import { Character } from "./Character.js";
import { Campfire, FirePotion, HealthPotion } from "./ConcreteConsumable.js";


export class Player extends Character {

    constructor(name: string) {
        super(name);
        this.inventory.add(new Campfire());
        this.inventory.add(new HealthPotion());
        this.inventory.add(new FirePotion());
    }
}