import { type IOSystem } from "./IOSystem.js";
import readline from "readline"

export class TerminalSystem implements IOSystem {

    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    async readString(prompt: string = ""): Promise<string> {
        return new Promise(resolve => {
            this.rl.question(`${prompt}\n> `, (answer: string) => resolve(answer.trim()))
        })
    }

    async readInt(prompt: string, min: number, max: number): Promise<number> {
        let value: number;

        do {
            const input = await this.readString(prompt);
            value = parseInt(input);
        } while (isNaN(value) || value < min || value > max);

        return value;
    }

    async ask(choices: string[], prompt: string = "Choose an action"): Promise<number> {
        const menu = choices
            .map((choice, index) => `${index + 1}. ${choice}`)
            .join("\n\t");

        return this.readInt(
            `${prompt} :\n\t${menu}`,
            1,
            choices.length
        );
    }

    close() {
        this.rl.close();
    }
}