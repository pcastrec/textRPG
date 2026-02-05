import { TerminalSystem } from "./TerminalSystem.js"
import { GameState } from "../entities/GameState.js"
import { Player } from "../entities/Player.js"
import { MapSystem } from "./MapSystem.js"
import { Area } from "../entities/Area.js"
import type { IOSystem } from "./IOSystem.js"

export class Launcher {

    // iosystem: IOSystem
    player: Player
    state: GameState
    initArea: Area
    mapSystem: MapSystem
    nbChoices: number
    turn: number
    running: boolean = true

    constructor(private sequence: number[] = [1, 1, 1, 4]) {
        // this.iosystem = new TerminalSystem();
        this.initArea = new Area({ x: 0, y: 0 })
        this.player = new Player("Peter", this.initArea)
        this.player.characteristic.health.value = 20

        this.state = new GameState(this.player)
        this.mapSystem = new MapSystem([this.initArea])

        this.turn = 0
        this.nbChoices = 0
    }

    async run() {
        while (this.player.characteristic.health.value > 0 && this.running) {
            console.log(`turn: ${this.turn}\taction: ${this.sequence[this.turn]!}`);
            // const result = await this.iosystem.ask(this.player.exploreActions, "What do you want to do ?");
            this.action(this.sequence[this.turn]!);
        }
        // Evite de rester bloqué dans un whileLoop
        // this.iosystem.close();
    }

    async runSequence() {
        while (this.player.characteristic.health.value > 0 && this.running) {
            if (this.turn < this.sequence.length - 1) {
                console.log(`turn: ${this.turn}\taction: ${this.sequence[this.turn]!}`);
                // const result = await this.iosystem.ask(this.player.actions);
                this.action(this.sequence[this.turn]!)
            } else {
                this.running = false;
            }
        }
    }

    action(choice: number) {
        this.turn += 1;
        switch (choice) {
            case 1:
                console.log(`turn: ${this.turn}\taction: ${this.sequence[this.turn]!}`);
                // const result = await this.iosystem.ask(this.player.area.encounters.map(e => e.name), "Where do you wanna go ?");
                this.player.area.encounters[this.sequence[this.turn]!]?.execute(this.state);
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