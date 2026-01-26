import { Enemy, Goblin, Ogre } from "./src/entities/Enemy.js";
import { GameState } from "./src/entities/GameState.js";
import { Consumable } from "./src/entities/Item.js";
import { Direction } from "./src/entities/Location.js";
import { Player } from "./src/entities/Player.js";
import { BattleUsage, ExplorationUsage, NoRestriction } from "./src/entities/Restriction.js";
import { BattleSystem } from "./src/systems/BattleSystem.js";
import { ExplorationSystem } from "./src/systems/ExplorationSystem.js";

const player = new Player("Peter");
const state = new GameState(player);
const enemies: Enemy[] = [new Ogre('Ogre'), new Goblin('Gobgob')];
// console.log('player', player.abilities.health);
// console.log('ogre', enemies[0]?.abilities.health);
// new BattleSystem(player, enemies[0]!);
// console.log('player', player.abilities.health);
// console.log('enemy', enemies[0]?.abilities.health);
// console.log('player', player.abilities.health);
// const usableItems = enemies[0]?.inventory.items.filter(i => (i as Consumable).canUse(state));
// console.log(usableItems);

// enemies[0]?.inventory.items.map(i => (i as Consumable).tryUse(state))
// console.log('player', player.abilities.health);
// console.log('enemy', enemies[0]?.abilities.health);
ExplorationSystem.explore(state, player.move(Direction.WEST));