import type { GameState } from "../entities/GameState.js";
import type { Consumable } from "../entities/Item.js";

export class BattleSystem {

    private _turn = 0;

    constructor(state: GameState) {
        while (state.player.isAlive() && state.enemy!.isAlive()) {
            this._turn++
            // CECI EST UN TEST
            if (this._turn === 2) {
                state.player.inventory.items.map(i => (i as Consumable).tryUse(state))
            }

            /**
             * Imaginons
             * Actions : [Attaques, Magies?, Objet, Fuir]
             * player.use(competence, enemy);
             * enemy.use(competence, player);
             * resolve
             */
            // _player.use(_player.skills[0]!, _enemy);
            // _enemy.use(_enemy.skills[0]!, _player);
            state.player.skills[0]?.execute(state.enemy!);
            state.enemy!.skills[0]?.execute(state.player);
            console.log(this._turn, state.player.characteristic.health.value, state.enemy?.characteristic.health.value)
        }
        if (!state.enemy!.isAlive()) {
            if (state.enemy!.inventory.items.length > 0) {
                state.enemy!.inventory.items.map(i => {
                    console.log(`You got an ${i.name}!`)
                    state.player.addToInventory(i)
                })
            } else {
                console.log("Nothing to be droped");
            }
        } else {
            console.log("Game Over");
            process.exit(0);
        }
    }
}