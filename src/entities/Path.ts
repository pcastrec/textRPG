import type { Area } from "./Area.js";
import { Goblin, Ogre } from "./Enemy.js";
import { BattleEncounter, type IEncounter } from "./Encounter.js";

export class Path {

    private _encounters: IEncounter[] = [
        new BattleEncounter(new Goblin('gobgob')),
        new BattleEncounter(new Ogre('Ogri'))
    ];
    constructor(private _from: Area, private _to: Area) {
        const random = Math.floor((Math.random() * 3)) + 1;
    }

    get to(): Area { return this._to }
    get from(): Area { return this._from }
    get encounters(): IEncounter[] { return this._encounters }
}