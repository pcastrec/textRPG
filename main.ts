import { GameState } from "./src/entities/GameState.js";
import { Area } from "./src/entities/Area.js";
import { Player } from "./src/entities/Player.js";

const initArea = new Area({ x: 0, y: 0 });
const player = new Player("Peter", initArea);
const state = new GameState(player);

// const usableItems = enemies[0]?.inventory.items.filter(i => (i as Consumable).canUse(state));
// console.log(usableItems);
// enemies[0]?.inventory.items.map(i => (i as Consumable).tryUse(state))
// console.log('player', player.characteristic.health);
// console.log('enemy', enemies[0]?.characteristic.health);

// console.log(player.area);
// ExplorationSystem.explore(state, player.move(Direction.WEST));
console.log(player.area);
console.log(player.area.encounters);
player.area.encounters[1]?.execute(state);
