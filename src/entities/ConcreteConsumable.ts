import { BattleUsage, ExplorationUsage, NoUsageRestriction } from "./Restriction.js";
import type { Characteristics, Character } from "./Character.js";
import { Regen, type Effect } from "./Effect.js";
import type { GameState } from "./GameState.js";
import { Consumable } from "./Item.js";

// Strategy Pattern on Potions replace concrete classes
// with IEffect arg
export class HealthPotion extends Consumable {

    constructor(character: Character, private _effect: Effect = new Regen()) {
        super(character, `${HealthPotion.name}(${_effect.value})`, 1, 1, new NoUsageRestriction());
    }

    get name(): string {
        return `${HealthPotion.name}(${this._effect.value})`;
    }

    use(state: GameState): void {
        const target = this.owner;
        const mul = this._effect.self ? 1 : -1;
        const characteristic = target!.characteristic[this._effect.characteristic.name.toLowerCase() as keyof Characteristics]
        characteristic.value += (mul * this._effect.value)
        console.log(`${target?.name} used ${this.name}!`);
        target!.inventory.remove(this);
    }
}

export class Campfire extends Consumable {

    constructor(character: Character) {
        super(character, Campfire.name, 1, 1, new ExplorationUsage());
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

    constructor(character: Character) {
        super(character, FirePotion.name, 1, 1, new BattleUsage())
    }

    get name(): string {
        return FirePotion.name;
    }

    use(state: GameState): void {
        console.log(`You used ${this.name}`);
        state.player.inventory.remove(this);
    }
}