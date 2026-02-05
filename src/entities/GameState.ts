import type { IOSystem } from "../systems/IOSystem.js";
import type { Enemy } from "./Enemy.js";
import type { Player } from "./Player.js";
import { PlayerCondition } from "./Restriction.js";

export class GameState {
    private _condition: PlayerCondition = PlayerCondition.EXPLORATION;
    private _enemy: Enemy | null = null;

    constructor(public player: Player) { }

    get condition(): PlayerCondition { return this._condition }
    set condition(c: PlayerCondition) { this._condition = c }

    get enemy(): Enemy | null { return this._enemy }
    set enemy(e: Enemy | null) { this._enemy = e }
}