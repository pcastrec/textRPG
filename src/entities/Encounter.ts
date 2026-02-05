import { BattleSystem } from "../systems/BattleSystem.js";
import { ExplorationSystem } from "../systems/ExplorationSystem.js";
import type { Direction } from "./Area.js";
import { Enemy } from "./Enemy.js";
import type { GameState } from "./GameState.js";
import { PlayerCondition } from "./Restriction.js";

// Machine a état ?
export interface IEncounter {
    name: string;
    execute(state: GameState): Promise<void>
}

export class ExploreEncounter implements IEncounter {

    name: string;

    constructor(private _direction: Direction) {
        this.name = `${ExploreEncounter.name}(${_direction})}`
    }

    async execute(state: GameState): Promise<void> {
        await ExplorationSystem.explore(state, this._direction);
    }
}

export class BattleEncounter implements IEncounter {

    name: string;
    constructor(private _enemy: Enemy) {
        this.name = `${BattleEncounter.name}(${_enemy.name})`;
    }

    async execute(state: GameState): Promise<void> {
        console.log(this._enemy);

        const initialCondition = state.condition;
        state.condition = PlayerCondition.BATTLE;
        state.enemy = this._enemy;

        await new BattleSystem(state).battle();

        if (initialCondition === PlayerCondition.VILLAGE) {
            state.player.area.encounters = state.player.area.encounters.filter(e => e !== this);
        }
        state.condition = initialCondition;
        state.enemy = null;
    }
} 