import { Charisma, Constitution, Dexterity, Energy, Health, Intelligence, Mana, Strength, Wisdom } from "./Characteristic.js";
import { Inventory } from "./Inventory.js";
import type { Item } from "./Item.js";
import { coupPoingt, type Skill } from "./Skill.js";
import { Stuff } from "./Stuff.js";

export type Characteristics = {
    health: Health,
    mana: Mana,
    energy: Energy

    strength: Strength,
    dexterity: Dexterity,
    constitution: Constitution,
    intelligence: Intelligence,
    wisdom: Wisdom,
    charisma: Charisma
}

export abstract class Character {

    private _money: number = 0;
    private _level: number = 0;
    private _xp: number = 0

    private _characteritics: Characteristics = {
        health: new Health(),
        mana: new Mana(),
        energy: new Energy(),

        strength: new Strength(),
        dexterity: new Dexterity(),
        constitution: new Constitution(10),
        intelligence: new Intelligence(),
        wisdom: new Wisdom(),
        charisma: new Charisma()
    };

    private _skills: Skill[] = [new coupPoingt(this)];
    private _inventory: Inventory = new Inventory();
    private _stuff: Stuff = new Stuff();

    constructor(
        private _name: string
    ) {
        this._characteritics.health.value = this._characteritics.strength.value + this._characteritics.constitution.value;
        this._characteritics.mana.value = this._characteritics.wisdom.value + this._characteritics.intelligence.value;
        this._characteritics.energy.value = this._characteritics.charisma.value + this._characteritics.dexterity.value;
        this._characteritics.health.maxValue = this._characteritics.health.value;
        this._characteritics.mana.maxValue = this._characteritics.mana.value;
        this._characteritics.energy.maxValue = this._characteritics.energy.value;
    }

    get name(): string { return this._name }

    set xp(xp: number) { this._xp = xp }
    get xp(): number { return this._xp }

    set money(m: number) { this._money = m }
    get money(): number { return this._money }

    set level(l: number) { this._level = l }
    get level(): number { return this._level }

    get skills(): Skill[] { return this._skills }
    get inventory(): Inventory { return this._inventory }
    get stuff(): Stuff { return this._stuff }
    get characteristic(): Characteristics { return this._characteritics }

    // use(skill: Skill, enemy: Character) {
    //     skill.effects.map(e => {
    //         const target = e.self ? this : enemy;
    //         const mul = e.self ? 1 : -1;
    //         const characteristic = target._characteritics[e.characteristic.name.toLowerCase() as keyof Characteristics]
    //         characteristic.value += (mul * e.value)
    //     })
    // }

    addToInventory(item: Item) {
        item.owner = this;
        this._inventory.add(item);
    }

    isAlive(): boolean {
        return this._characteritics.health.value > 0;
    }
}