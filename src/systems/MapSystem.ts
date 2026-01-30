import { Area,type Position } from "../entities/Area.js";

export class MapSystem {

    constructor(private _areas: Area[]) { }

    isFind(x: number, y: number):Area {
        const area = this._areas.find(a=>a.position.x==x && a.position.y==y)
        //suroundingMap()
        return area ?? this.generateArea({x,y})
    }

    generateArea(postion:Position){
        return new Area(postion)
    }

    add(area:Area){
        this._areas.push(area)
    }

    //add create suroundingMap
// if map not found create and add it to the list.(don't forget to check if visited !)


    
}