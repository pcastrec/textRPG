export interface IOSystem {
    ask(choices: string[], prompt: string): Promise<number>
    close(): void
}