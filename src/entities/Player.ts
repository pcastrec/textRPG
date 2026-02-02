import { Character } from "./Character.js";
import { Campfire, HealthPotion } from "./ConcreteConsumable.js";
import { Area, Direction } from "./Area.js";
import { Path } from "./Path.js";

export class Player extends Character {

    private _distance : number = 0

    constructor(name: string, private _area: Area) {
        super(name);
        this.inventory.add(new Campfire(this));
        this.inventory.add(new HealthPotion(this));
    }

    get area(): Area { return this._area }
    set area(area: Area) { this._area = area }

    get distance(){return this._distance}
    set distance(d:number){this.distance = d}

    move(direction: Direction): Path {
        console.log(`You moved to the ${direction}`);
        const nextArea = this._area.direction(direction);

        return new Path(this._area, nextArea);
    }
    // get  player options 


    choices(){
        return ["encounter","inventory","stuff"]
    }
}