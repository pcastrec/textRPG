import { Character, type Characteristics } from "./Character.js";
import { type Characteristic } from "./Characteristic.js";
import { Damage, type Effect } from "./Effect.js";

export class Skill {
    constructor(
        private _owner: Character,
        private _name: string,
        private _effects: Effect[]
    ) { }

    execute(enemy: Character) {
        console.log(`${this._owner.name} used ${this._name} on ${enemy.name}!`)
        this._effects.map(e => {
            const target = e.self ? this._owner : enemy;
            const mul = e.self ? 1 : -1;
            const ability = target.characteristic[e.characteristic.name.toLowerCase() as keyof Characteristics]
            ability.value += (mul * e.value)
            console.log(`${target.name} took ${(mul * e.value)} damage !`)
        })
    }

    get effects(): { self: boolean, characteristic: Characteristic, value: number }[] {
        return this._effects
    }
}

export class coupPoingt extends Skill {
    constructor(character: Character) {
        super(character, "Coup de Poingt", [
            new Damage(5),
            // { self: true, ability: new Health(), value: 10 },
        ])
    }
}