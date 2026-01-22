import { Health, type Ability } from "./Ability.js";

export interface IEffect {
    self: boolean;
    ability: Ability;
    value: number;
}

export class Regen implements IEffect {
    self = true;
    ability = new Health();
    value = 10;
}