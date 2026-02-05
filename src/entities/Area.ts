import { BattleEncounter, ExploreEncounter, type IEncounter } from "./Encounter.js";
import { Goblin } from "./Enemy.js";

export type Position = {
    x: number;
    y: number;
}

export enum Direction {
    NORTH = "North",
    SOUTH = "South",
    EAST = "East",
    WEST = "West"
}

export class Area {
    visited: boolean = false;

    constructor(private _position: Position, private _encounters: IEncounter[] = [
        new ExploreEncounter(Direction.NORTH),
        new ExploreEncounter(Direction.SOUTH),
        new ExploreEncounter(Direction.EAST),
        new ExploreEncounter(Direction.WEST),
        new BattleEncounter(new Goblin("AreaGoblin")),
    ]) { }

    direction(dir: Direction): Area {
        let x = 0;
        let y = 0;
        switch (dir) {
            case Direction.NORTH:
                x = 0;
                y = 1;
                break;
            case Direction.SOUTH:
                x = 0;
                y = -1;
                break;
            case Direction.EAST:
                x = 1;
                y = 0;
                break;
            case Direction.WEST:
                x = -1;
                y = 0;
                break;
            default:
                break;
        }
        return new Area({
            x: this._position.x + x,
            y: this._position.y + y
        });
    }

    get position(): Position { return this._position }
    get encounters(): IEncounter[] { return this._encounters }

    getStringPosition(): string { return `[${this.position.x}, ${this.position.y}]` }
}