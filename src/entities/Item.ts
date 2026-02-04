import { type EquipRestriction, type UsageRestriction } from "./Restriction.js";
import type { Character } from "./Character.js";
import type { GameState } from "./GameState.js";
import type { Effect } from "./Effect.js";

export abstract class Item {

    constructor(
        protected _owner: Character,
        protected _name: string,
        private _quantity: number = 1,
        private _weigth: number = 1,
    ) { }

    set owner(char: Character) { this._owner = char }
    get owner(): Character { return this._owner }

    get name(): string { return this._name }
    get weigth(): number { return this._weigth }
    get quantity(): number { return this._quantity }
    set quantity(q: number) {
        if (q > 0) this._quantity = q
    }
}

export abstract class Consumable extends Item {

    constructor(
        owner: Character, name: string, quantity: number, weight: number, private _restriction: UsageRestriction
    ) {
        super(owner, name, quantity, weight);
    }

    get restriction(): UsageRestriction { return this._restriction }

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

export abstract class Equipable extends Item {

    constructor(private _effects: Effect[], _owner: Character, _name: string, _weight: number, private _restriction: EquipRestriction) {
        super(_owner, _name, 1, _weight)
    }

    get restriction(): EquipRestriction { return this._restriction }

    abstract equip(state: GameState): boolean
    abstract itemType: string

    get effects() { return this._effects }

    canEquip(state: GameState): boolean {
        if (this.quantity <= 0) {
            return false;
        }
        return this.restriction.canEquip();
    }

    tryEquip(state: GameState): boolean {
        if (!this.canEquip(state)) {
            this.onEquipFailed(state);
            return false;
        }

        this.equip(state);
        return true;
    }

    protected onEquipFailed(state: GameState): void {
        if (this.quantity <= 0) {
            console.log(`Plus de ${this.name} disponible`);
        } else {
            // if (!this.restriction.canEquip(state.condition)) {
            if (!true) {
                console.log(this.restriction.getErrorMessage());
            }
        }
    }
}


export class Helmet extends Equipable {
    itemType: string = "head"
    equip(state: GameState): boolean {
        // if isEquipable
        // state.player.stuff.addHelmet(this)
        state.player.stuff.add(this)
        return true

    }

}

