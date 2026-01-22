import type { Player } from "./Player.js";
import { GameContext } from "./Restriction.js";

export class GameState {
    private _context: GameContext = GameContext.BATTLE;
    constructor(public player: Player) { }

    get context(): GameContext { return this._context }
}