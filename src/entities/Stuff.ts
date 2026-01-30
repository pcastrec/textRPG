import type { Equipable, Helmet } from "./Item.js";

export interface IStuff {
    head:Helmet|null
}


export class Stuff implements IStuff{
    constructor(private _head:Helmet|null = null){}

    get head(){return this._head}
    set head(h:Helmet|null){this._head = h}

    add(item:Equipable){
        switch (item.itemType) {
            case "head":
           //case instanceOf(Helmet) ?
                this.head = item
                break;
        
            default:
                break;
        }
    }
}

