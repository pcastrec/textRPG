import { Health, type Ability } from "./Ability.js";
import { Character, type Abilities } from "./Character.js";
import type { IEffect } from "./Effect.js";

export class Skill {
    constructor(
        private _owner: Character,
        private _name: string,
        private _effects: IEffect[]
    ) { }

    execute(enemy: Character) {
        this._effects.map(e => {
            const target = e.self ? this._owner : enemy;
            const mul = e.self ? 1 : -1;
            const ability = target.abilities[e.ability.name.toLowerCase() as keyof Abilities]
            ability.value += (mul * e.value)
        })
    }

    get effects(): { self: boolean, ability: Ability, value: number }[] {
        return this._effects
    }
}

export class coupPoingt extends Skill {
    constructor(character: Character) {
        super(character, "Coup de Poingt", [
            { self: false, ability: new Health(), value: 10 },
            // { self: true, ability: new Health(), value: 10 },
        ])
    }
}