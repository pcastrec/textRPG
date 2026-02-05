import { Area, type Position } from "../entities/Area.js";

export class MapSystem {

    constructor(private _areas: Area[]) { }

    isFind(x: number, y: number): Area {
        const area = this._areas.find(a => a.position.x == x && a.position.y == y)
        //suroundingMap()
        return area ?? this.generateArea({ x, y })
    }

    generateArea(postion: Position): Area {
        const area = new Area(postion)
        this._areas.push(area)
        return area
    }

    //add create suroundingMap
    // if map not found create and add it to the list.(don't forget to check if visited !)
    surroundingMap(area: Area) {
        const north: Position = { x: area.position.x, y: area.position.y + 1 }
        const south: Position = { x: area.position.x, y: area.position.y - 1 }
        const east: Position = { x: area.position.x + 1, y: area.position.y }
        const west: Position = { x: area.position.x - 1, y: area.position.y }
        const surounding: Position[] = [north, south, east, west]

        surounding.map(p => this.isFind(p.x, p.y))
    }

}