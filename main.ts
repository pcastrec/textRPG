import { GameState } from "./src/entities/GameState.js";
import { Area } from "./src/entities/Area.js";
import { Player } from "./src/entities/Player.js";
import { MapSystem } from "./src/systems/MapSystem.js";
import readline from 'readline'


// #################################### NOTE #######################################################
//
// Run(random ou readline) part du principe qu'on a choisi encounter , 
// hors il devrais y avoir un menu charctere avant en ensuite si le choix est bien encounter les encounters
// run readline prend actuellement un sequence de choix 
// (les turn sont adapté pour les combat mais pas necessairement pour les menu d'actions.(nb choice peut etre interessant ici...))

// Louis : tester via log ! 
//
// #################################################################################################


// const initArea = new Area({ x: 0, y: 0 });
// const player = new Player("Peter", initArea);
// const state = new GameState(player);

// // const usableItems = enemies[0]?.inventory.items.filter(i => (i as Consumable).canUse(state));
// // console.log(usableItems);
// // enemies[0]?.inventory.items.map(i => (i as Consumable).tryUse(state))
// // console.log('player', player.characteristic.health);
// // console.log('enemy', enemies[0]?.characteristic.health);



// // console.log(player.area);
// // ExplorationSystem.explore(state, player.move(Direction.WEST));
// console.log(player.area);
// console.log(player.area.encounters);
// player.area.encounters[1]?.execute(state);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export class Launcher {
    player: Player
    state: GameState
    initArea: Area
    mapSystem: MapSystem
    nbChoices: number
    turn: number


    constructor(
        private sequence: number[] = [4,4],
        private run_value: number = 0,
        // private f:Function|null = null,
        // private args: any[] = []
    ) {

        // if (f == null){
        this.initArea = new Area({ x: 0, y: 0 })
        this.player = new Player("Peter", this.initArea)
        this.player.characteristic.health.value = 20

        this.state = new GameState(this.player)
        this.mapSystem = new MapSystem([this.initArea])

        this.turn = 0
        this.nbChoices = 0

        // here pass a condition sigterm = condition => if the condition is verfied , sigterm is launched ... So you can test it and terminate it


        //console.log(this.player.area);
        //console.log(this.player.area.encounters);

        this.run()
        // }else{
        //     f(args)
        // }
    }

    run() {
        switch (this.run_value) {
            case 0:
                // console.log("should run Readline")
                this.runReadline(this.sequence)
                // this.runReadline2()
                break;
            case 1:
                // console.log("should run Random")
                this.runRandom(this.sequence)
                // this.runRandom2()
                break;
            default:
                break;
        }
    }
    

    // step(choice?:number){
    //     const choices = this.sequence

    //     if (this.turn < choices.length) {
    //             const value: number = choices[this.turn]!
    //             console.log("turn#", this.turn, " You choosed", value, ' it is : ', this.player.area.encounters[value]);
    //             this.player.area.encounters[value]?.execute(this.state)

    //         }else{


    //         const idx = Math.floor(Math.random() * this.player.area.encounters.length)

    //         console.log("you are choosing : ", String(idx), " that is", this.player.area.encounters[idx]?.name)
    //         // history = {cpt:idx} 
    //         this.player.area.encounters[idx]?.execute(this.state)
    //         // console.log(JSON.stringify(this.player.area.encounters,null,2))
    //         this.turn += 1
    //     }
    // }
    encounter_step(choice?: number) {
        if (this.player.characteristic.health.value <= 0) {
            return false; // stop loop
        }

        let idx: number;

        if (choice !== undefined) {
            idx = choice;
        } else {
            idx = Math.floor(Math.random() * this.player.area.encounters.length);
        }

        console.log("chosen:", idx);
        // could have in arg a table of encounter ! 
        this.player.area.encounters[idx]?.execute(this.state);

        return true; // continue loop
    }


    runRandom(choices: number[] = []) {
        // let turn = 0
        // let history = {}
        // this.player.characteristics!!!!

        while (this.player.characteristic.health.value > 0) {
            if (this.turn < choices.length) {
                const value: number = choices[this.turn]!
                console.log("turn#", this.turn, " You choosed", value, ' it is : ', this.player.area.encounters[value]);
                this.player.area.encounters[value]?.execute(this.state)

            } else {


                const idx = Math.floor(Math.random() * this.player.area.encounters.length)

                console.log("you are choosing : ", String(idx), " that is", this.player.area.encounters[idx]?.name)
                // history = {cpt:idx} 
                this.player.area.encounters[idx]?.execute(this.state)
                // console.log(JSON.stringify(this.player.area.encounters,null,2))
                
            }
            this.turn += 1
            // console.log("history : ", history)
        }
        // this.player.area.encounters[1]?.execute(this.state)

    }

    runRandom2(){
        const choices = this.sequence
        while (true) {
             const choice = this.turn < choices.length ? choices[this.turn] : undefined;
        const keepRunning = this.encounter_step(choice);

        if (!keepRunning) break;

        this.turn+=1;
        }
    }

    async runReadline2(){
        const choices = this.sequence
        let keepRunning = true

        while(keepRunning){
            const choice = this.turn < choices.length ? choices[this.turn] : undefined
            if (choice == undefined){
                // not necessarly encounters !! player.choices ?
                const to_display = this.player.area.encounters.map((e, i) => `${i} : ${e.name}`).join("\n")
                const question = (q: string): Promise<string> =>
                new Promise((resolve) => rl.question(q, resolve));
                const answer = await question(`${to_display}: `);
                console.log("You choosed", answer, ' it is : ', this.player.area.encounters[Number(answer)]);
                // this.player.area.encounters[Number(answer)]?.execute(this.state)
                 keepRunning = this.encounter_step(Number(answer))

            }else{
                keepRunning = this.encounter_step(choice)
                console.log("You choosed", choice, ' it is : ', this.player.area.encounters[Number(choice)]);
            }
            this.turn+=1
            if (!keepRunning) break;
        }
    }

    async runReadline(choices: number[] = []) {

        // boucle sur les choix d'encounter de la map

        let turn = 0
        let nb_choice = 0
        while (this.player.characteristic.health.value > 0) {

            if (turn < choices.length) {
                const value: number = choices[turn]!
                console.log("turn#", turn, " You choosed", value, ' it is : ', this.player.area.encounters[value]);
                this.player.area.encounters[value]?.execute(this.state)
                nb_choice += 1

                // await setTimeout(() => { }, 5000)

            } else {
                const to_display = this.player.area.encounters.map((e, i) => `${i} : ${e.name}`).join("\n")

                const question = (q: string): Promise<string> =>
                    new Promise((resolve) => rl.question(q, resolve));
                const answer = await question(`${to_display}: `);
                console.log("You choosed", answer, ' it is : ', this.player.area.encounters[Number(answer)]);
                this.player.area.encounters[Number(answer)]?.execute(this.state)
            }
            turn += 1

        }
    }
    //runApi ?
}

new Launcher()