import { Area } from "../entities/Area.js"
import { GameState } from "../entities/GameState.js"
import { Player } from "../entities/Player.js"
import { MapSystem } from "./MapSystem.js"
import { TerminalSystem } from "./TerminalSystem.js"

export class Launcher {

    player: Player
    state: GameState
    initArea: Area
    mapSystem: MapSystem
    nbChoices: number
    turn: number
    running: boolean = true

    constructor(private sequence: number[] = [1, 1, 1, 4]) {
        this.initArea = new Area({ x: 0, y: 0 })
        this.player = new Player("Peter", this.initArea)
        this.player.characteristic.health.value = 30

        this.state = new GameState(this.player, new TerminalSystem());
        this.mapSystem = new MapSystem([this.initArea])

        this.turn = 0
        this.nbChoices = 0
    }

    async runSequence() {
        for (let action of this.sequence) {
            console.log(`turn: ${this.turn}\taction: ${action}`);
            // const result = await this.iosystem.ask(this.player.actions);
            await this.action(action)
        }
        this.state.iosystem.close();
    }

    async run() {
        while (this.player.characteristic.health.value > 0 && this.running) {
            const choice = await this.state.iosystem.ask(this.player.exploreActions, "Choose an action");
            await this.action(choice);
        }
        // Evite de rester bloqué dans un whileLoop
        this.state.iosystem.close();
    }

    async action(choice: number) {
        this.turn += 1;
        switch (choice) {
            case 1:
                const result = await this.state.iosystem.ask(this.player.area.encounters.map(e => e.name), "Where do you wanna go ?");
                console.log(`turn: ${this.turn}\taction: ${result}`);
                await this.player.area.encounters[result - 1]?.execute(this.state);
                break;
            case 2:
                this.running = false;
                break;
            default:
                break;
        }
        this.turn += 1;
    }
}