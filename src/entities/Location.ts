export type Position = {
    x: number;
    y: number;
}

export enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}

export class Location {

    constructor(private _position: Position) { }

    direction(dir: Direction): Location {
        const x = Direction.WEST === dir ? -1 : 1;
        const y = Direction.SOUTH === dir ? -1 : 1;
        return new Location({
            x: this._position.x + x,
            y: this._position.y + y
        });
    }

    get position(): Position { return this._position }

    getStringPosition(): string { return `[${this.position.x}, ${this.position.y}]` }
}