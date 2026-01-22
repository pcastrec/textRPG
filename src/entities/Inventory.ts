import type { Item } from "./Item.js";

export class Inventory {
    constructor(private _items: Item[] = []) { }

    get items(): Item[] { return this._items }

    add(item: Item): void {
        const existingItem = this._items.find(i => i.name === item.name);
        existingItem ? existingItem.quantity++ : this._items.push(item);
    }

    remove(item: Item): void {
        const existingItem = this._items.find(i => i.name === item.name);

        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            this._items = this._items.filter(i => i.name != item.name);
        }
    }

    getWeigth(): number {
        return this._items.reduce((acc, i) => acc += i.quantity * i.weigth, 0)
    }
}