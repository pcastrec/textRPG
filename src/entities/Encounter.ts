import { BattleSystem } from "../systems/BattleSystem.js";
import { ExplorationSystem } from "../systems/ExplorationSystem.js";
import type { Direction } from "./Area.js";
import { Enemy } from "./Enemy.js";
import type { GameState } from "./GameState.js";
import { PlayerCondition } from "./Restriction.js";

// Machine a état ?
export interface IEncounter {
    name: string;
    execute(state: GameState): void
}

export class ExploreEncounter implements IEncounter {

    name: string;

    constructor(private _direction: Direction) {
        this.name = `${ExploreEncounter.name}(${_direction})}`
    }

    execute(state: GameState): void {
        ExplorationSystem.explore(state, this._direction);
    }
}

export class BattleEncounter implements IEncounter {

    name: string;
    constructor(private _enemy: Enemy) {
        this.name = `${BattleEncounter.name}(${_enemy.name})`;
    }

    execute(state: GameState): void {
        console.log(`You meet ${this._enemy.name}!`)

        state.condition = PlayerCondition.BATTLE;
        state.enemy = this._enemy;

        new BattleSystem(state);

        state.condition = PlayerCondition.EXPLORATION
        state.enemy = null;
    }
} 