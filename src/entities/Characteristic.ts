export abstract class Characteristic {

    private _maxValue: number;

    constructor(
        private _name: string,
        private _value: number
    ) {
        this._maxValue = this._value
    }

    get name(): string { return this._name }
    get value(): number { return this._value }
    set value(v: number) { this._value = v }
    set maxValue(v: number) { this._maxValue = v }
}

export class Strength extends Characteristic {
    constructor(_value: number = 1) {
        super(Strength.name, _value);
    }
}

export class Dexterity extends Characteristic {
    constructor(_value: number = 1) {
        super(Dexterity.name, _value);
    }
}

export class Constitution extends Characteristic {
    constructor(_value: number = 1) {
        super(Constitution.name, _value);
    }
}

export class Intelligence extends Characteristic {
    constructor(_value: number = 1) {
        super(Intelligence.name, _value);
    }
}

export class Wisdom extends Characteristic {
    constructor(_value: number = 1) {
        super(Wisdom.name, _value);
    }
}

export class Charisma extends Characteristic {
    constructor(_value: number = 1) {
        super(Charisma.name, _value);
    }
}

export class Health extends Characteristic {
    constructor(_value: number = 1) {
        super(Health.name, _value);
    }
}

export class Mana extends Characteristic {
    constructor(_value: number = 1) {
        super(Mana.name, _value);
    }
}

export class Energy extends Characteristic {
    constructor(_value: number = 1) {
        super(Energy.name, _value);
    }
}