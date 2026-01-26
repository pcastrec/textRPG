import type { Character } from "./Character.js";
import type { GameState } from "./GameState.js";
import { type UsageRestriction } from "./Restriction.js";

export abstract class Item {

    constructor(
        protected _name: string,
        private _quantity: number = 1,
        private _weigth: number = 1,
        private _restriction: UsageRestriction
    ) { }

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
        private _owner: Character,
        name: string, quantity: number, weight: number, restriction: UsageRestriction
    ) {
        super(name, quantity, weight, restriction);
    }

    get owner(): Character { return this._owner }

    abstract use(state: GameState): void;

    canUse(state: GameState): boolean {
        if (this.quantity <= 0) {
            return false;
        }
        return this.restriction.canUse(state.context);
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
            if (!this.restriction.canUse(state.context)) {
                console.log(this.restriction.getErrorMessage());
            }
        }
    }
}

export abstract class Equipable extends Item { }