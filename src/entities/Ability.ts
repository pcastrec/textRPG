export abstract class Ability {

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

export class Strength extends Ability {
    constructor(_value: number = 1) {
        super(Strength.name, _value);
    }
}

export class Dexterity extends Ability {
    constructor(_value: number = 1) {
        super(Dexterity.name, _value);
    }
}

export class Constitution extends Ability {
    constructor(_value: number = 1) {
        super(Constitution.name, _value);
    }
}

export class Intelligence extends Ability {
    constructor(_value: number = 1) {
        super(Intelligence.name, _value);
    }
}

export class Wisdom extends Ability {
    constructor(_value: number = 1) {
        super(Wisdom.name, _value);
    }
}

export class Charisma extends Ability {
    constructor(_value: number = 1) {
        super(Charisma.name, _value);
    }
}

export class Health extends Ability {
    constructor(_value: number = 1) {
        super(Health.name, _value);
    }
}

export class Mana extends Ability {
    constructor(_value: number = 1) {
        super(Mana.name, _value);
    }
}

export class Energy extends Ability {
    constructor(_value: number = 1) {
        super(Energy.name, _value);
    }
}