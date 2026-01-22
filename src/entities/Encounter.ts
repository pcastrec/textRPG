import { BattleSystem } from "../systems/BattleSystem.js";
import { Enemy } from "./Enemy.js";
import type { GameState } from "./GameState.js";
import { GameContext } from "./Restriction.js";

// Machine a état ?
export interface IEncounter {
    before(state: GameState): void
    execute(state: GameState): void
    after(state: GameState): void
}

export class BattleEncounter implements IEncounter {

    constructor(private _enemy: Enemy) { }

    before(state: GameState): void {
        console.log(`You fight a ${this._enemy.name}`);
        state.context = GameContext.BATTLE;
    }

    execute(state: GameState): void {
        new BattleSystem(state.player, this._enemy);
        console.log(`You take down ${this._enemy.name}`);
    }

    after(state: GameState) {
        console.log(`A dead ${this._enemy.name} is at your foot`);
        state.context = GameContext.EXPLORATION
    }
} 