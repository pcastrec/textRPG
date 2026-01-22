import type { Enemy } from "./Enemy.js";
import type { Player } from "./Player.js";
import { GameContext } from "./Restriction.js";

export class GameState {
    private _context: GameContext = GameContext.EXPLORATION;
    private _enemy: Enemy | null = null;

    constructor(public player: Player) { }

    get context(): GameContext { return this._context }
    set context(c: GameContext) { this._context = c }

    get enemy(): Enemy | null { return this._enemy }
    set enemy(e: Enemy | null) { this._enemy = e }
}