import type { Character } from "../entities/Character.js";
import type { GameState } from "../entities/GameState.js";
import type { Consumable } from "../entities/Item.js";

export class BattleSystem {

    private _turn = 0;

    constructor(private state: GameState) { }

    async battle() {
        while (this.state.player.isAlive() && this.state.enemy!.isAlive()) {
            /**
             * Imaginons
             * Actions : [Attaques, Utils, Objet, Fuir]
             * player.use(competence, enemy);
             * enemy.use(competence, player);
             * resolve
            */
            this._turn++

            const pChoice = await this.state.iosystem.ask(this.state.player.battleActions, "Player > Choose an actions");
            await this.actions(this.state.player, pChoice);

            const eChoice = await this.state.iosystem.ask(this.state.enemy!.battleActions, "Enemy > Choose an actions");
            await this.actions(this.state.enemy!, eChoice);

            // this.state.enemy!.skills[0]?.execute(this.state.player);
            console.log(this._turn, this.state.player.characteristic.health.value, this.state.enemy?.characteristic.health.value)
        }
        if (!this.state.enemy!.isAlive()) {
            if (this.state.enemy!.inventory.items.length > 0) {
                this.state.enemy!.inventory.items.map(i => {
                    console.log(`You got an ${i.name}!`)
                    this.state.player.addToInventory(i)
                })
            } else {
                console.log("Nothing to be droped");
            }
        } else {
            console.log("Game Over");
            process.exit(0);
        }
    }

    async actions(char: Character, choice: number) {
        let choice2;
        switch (choice) {
            case 1:
                choice2 = await this.state!.iosystem.ask(char.skills.map(s => s.name), "Choose a skill");
                char.skills[choice2 - 1]?.execute(char === this.state.player ? this.state.enemy! : this.state.player)
                break;
            case 2:
                const items = char.inventory.items.filter(i => (i as Consumable).canUse(this.state))
                choice2 = await this.state!.iosystem.ask(items.map(i => i.name), "Choose an item");
                (items[choice2 - 1] as Consumable).use(this.state);
                break;
            default:
                break;
        }
    }
}