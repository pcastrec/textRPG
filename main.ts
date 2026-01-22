import { Goblin, Ogre } from "./src/entities/Enemy.js";
import { GameState } from "./src/entities/GameState.js";
import { Consumable } from "./src/entities/Item.js";
import { Player } from "./src/entities/Player.js";
import { BattleUsage, ExplorationUsage, NoRestriction } from "./src/entities/Restriction.js";

const player = new Player("Peter");
const state = new GameState(player);
// const enemies = [new Ogre('Ogre'), new Goblin('Gobgob')];
// console.log(enemies);

const usableItems = player.inventory.items.filter(i => (i as Consumable).canUse(state));
console.log(usableItems);

player.inventory.items.map(i => (i as Consumable).tryUse(state))