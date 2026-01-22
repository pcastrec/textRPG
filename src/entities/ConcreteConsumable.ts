import type { Abilities } from "./Character.js";
import { Regen, type IEffect } from "./Effect.js";
import type { GameState } from "./GameState.js";
import { Consumable } from "./Item.js";
import { BattleUsage, ExplorationUsage, NoRestriction } from "./Restriction.js";

export class HealthPotion extends Consumable {

    private _effect: IEffect = new Regen();
    constructor(private _health: number = 10) {
        super(`${HealthPotion.name}(${_health})`, 1, 1, new NoRestriction());
    }

    get name(): string {
        return `${HealthPotion.name}(${this._health})`;
    }

    use(state: GameState): void {
        const target = this._effect.self ? state.player : state.enemy;
        const mul = this._effect.self ? 1 : -1;
        const ability = target!.abilities[this._effect.ability.name.toLowerCase() as keyof Abilities]
        ability.value += (mul * this._effect.value)
        console.log(`${target?.name} used ${this.name}!`);
        target!.inventory.remove(this);
    }
}

export class Campfire extends Consumable {

    constructor() {
        super(Campfire.name, 1, 1, new ExplorationUsage());
    }

    get name(): string {
        return Campfire.name;
    }

    use(state: GameState): void {
        console.log(`You used ${this.name}!`);
        state.player.inventory.remove(this);
    }
}

export class FirePotion extends Consumable {

    constructor() {
        super(FirePotion.name, 1, 1, new BattleUsage())
    }

    get name(): string {
        return FirePotion.name;
    }

    use(state: GameState): void {
        console.log(`You used ${this.name}`);
        state.player.inventory.remove(this);
    }
}