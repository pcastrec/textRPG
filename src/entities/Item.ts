import type { Character } from "./Character.js";
import type { GameState } from "./GameState.js";
import { type UsageRestriction } from "./Restriction.js";

export abstract class Item {

    constructor(
        protected _owner: Character,
        protected _name: string,
        private _quantity: number = 1,
        private _weigth: number = 1,
        private _restriction: UsageRestriction
    ) { }

    set owner(char: Character) { this._owner = char }
    get owner(): Character { return this._owner }

    get restriction(): UsageRestriction { return this._restriction }

    get name(): string { return this._name }
    get weigth(): number { return this._weigth }
    get quantity(): number { return this._quantity }
    set quantity(q: number) {
        if (q > 0) this._quantity = q
    }
}

export abstract class Consumable extends Item {

    constructor(
        owner: Character, name: string, quantity: number, weight: number, restriction: UsageRestriction
    ) {
        super(owner, name, quantity, weight, restriction);
    }

    abstract use(state: GameState): void;

    canUse(state: GameState): boolean {
        if (this.quantity <= 0) {
            return false;
        }
        return this.restriction.canUse(state.condition);
    }

    tryUse(state: GameState): boolean {
        if (!this.canUse(state)) {
            this.onUseFailed(state);
            return false;
        }

        this.use(state);
        return true;
    }

    protected onUseFailed(state: GameState): void {
        if (this.quantity <= 0) {
            console.log(`Plus de ${this.name} disponible`);
        } else {
            if (!this.restriction.canUse(state.condition)) {
                console.log(this.restriction.getErrorMessage());
            }
        }
    }
}

export abstract class Equipable extends Item { }