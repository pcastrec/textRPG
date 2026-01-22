import { Charisma, Constitution, Dexterity, Energy, Health, Intelligence, Mana, Strength, Wisdom } from "./Ability.js";
import type { Enemy } from "./Enemy.js";
import { Inventory } from "./Inventory.js";
import { coupPoingt, type Skill } from "./Skill.js";

export type Abilities = {
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

    private _abilities: Abilities = {
        health: new Health(),
        mana: new Mana(),
        energy: new Energy(),

        strength: new Strength(),
        dexterity: new Dexterity(),
        constitution: new Constitution(),
        intelligence: new Intelligence(),
        wisdom: new Wisdom(),
        charisma: new Charisma()
    };

    private _skills: Skill[] = [new coupPoingt(this)];
    private _inventory: Inventory = new Inventory();

    constructor(
        private _name: string
    ) {
        this._abilities.health.value = this._abilities.strength.value + this._abilities.constitution.value;
        this._abilities.mana.value = this._abilities.wisdom.value + this._abilities.intelligence.value;
        this._abilities.energy.value = this._abilities.charisma.value + this._abilities.dexterity.value;
        this._abilities.health.maxValue = this._abilities.health.value;
        this._abilities.mana.maxValue = this._abilities.mana.value;
        this._abilities.energy.maxValue = this._abilities.energy.value;
    }

    get name(): string { return this._name }

    set xp(xp: number) { this._xp = xp }
    get xp(): number { return this._xp }

    set money(m: number) { this._money = m }
    get money(): number { return this._money }

    set level(l: number) { this._level = l }
    get level(): number { return this._level }

    get inventory(): Inventory { return this._inventory }
    get abilities(): Abilities { return this._abilities }
    get skills(): Skill[] { return this._skills }

    use(skill: Skill, enemy: Character) {
        skill.effects.map(e => {
            const target = e.self ? this : enemy;
            const mul = e.self ? 1 : -1;
            const ability = target._abilities[e.ability.name.toLowerCase() as keyof Abilities]
            ability.value += (mul * e.value)
        })
    }

    isAlive(): boolean {
        return this._abilities.health.value > 0;
    }
}