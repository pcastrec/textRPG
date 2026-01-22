import { Character } from "./Character.js";
import { Campfire, FirePotion, HealthPotion } from "./ConcreteConsumable.js";
import { Direction, Location } from "./Location.js";
import { Path } from "./Path.js";

export class Player extends Character {

    private _location: Location = new Location({ x: 0, y: 0 });

    constructor(name: string) {
        super(name);
        this.inventory.add(new Campfire());
        this.inventory.add(new HealthPotion());
    }

    move(direction: Direction): Path {
        const nextLocation = this._location.direction(direction);
        return new Path(this._location, nextLocation);
    }
}