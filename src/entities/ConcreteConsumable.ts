import type { GameState } from "./GameState.js";
import { Consumable } from "./Item.js";
import { BattleUsage, ExplorationUsage, NoRestriction } from "./Restriction.js";


export class HealthPotion extends Consumable {

    constructor(private _health: number = 10) {
        super(`${HealthPotion.name}(${_health})`, 1, 1, new NoRestriction());
    }

    get name(): string {
        return `${HealthPotion.name}_${this._health}`;
    }

    use(state: GameState): void {
        console.log(`You used ${this.name}!`);
        state.player.inventory.remove(this);
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