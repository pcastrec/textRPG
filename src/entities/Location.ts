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

export class Location {

    constructor(private _position: Position) { }

    direction(dir: Direction): Location {
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
        return new Location({
            x: this._position.x + x,
            y: this._position.y + y
        });
    }

    get position(): Position { return this._position }

    getStringPosition(): string { return `[${this.position.x}, ${this.position.y}]` }
}