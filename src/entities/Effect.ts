import { Characteristic, Health } from "./Characteristic.js";

export abstract class Effect {
    constructor(
        private _self: boolean,
        private _value: number,
        private _characteristic: Characteristic,
        private _duration = 1
    ) { }

    get self(): boolean { return this._self }
    get value(): number { return this._value }
    get duration(): number { return this._duration }
    get characteristic(): Characteristic { return this._characteristic }
}

export class Damage extends Effect {
    constructor(damage: number) {
        super(false, damage, new Health());
    }
}

export class Regen extends Effect {
    constructor() {
        super(true, 10, new Health());
    }
}