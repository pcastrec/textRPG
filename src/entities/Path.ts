import { BattleEncounter, type IEncounter } from "./Encounter.js";
import { Goblin, Ogre } from "./Enemy.js";
import type { Location } from "./Location.js";

export class Path {

    private _encounters: IEncounter[] = [
        new BattleEncounter(new Goblin('gobgob')),
        new BattleEncounter(new Goblin('gony')),
        new BattleEncounter(new Ogre('Ogri'))
    ];
    constructor(private _from: Location, private _to: Location) {
        const random = Math.floor((Math.random() * 3)) + 1;
    }

    get to(): Location { return this._to }
    get from(): Location { return this._from }
    get encounters(): IEncounter[] { return this._encounters }
}