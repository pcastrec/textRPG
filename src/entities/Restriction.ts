export enum GameContext {
    BATTLE,
    // VILLAGE,
    EXPLORATION
}

export interface UsageRestriction {
    canUse(context: GameContext): boolean;
    getErrorMessage(): string;
}

export class BattleUsage implements UsageRestriction {
    canUse(context: GameContext): boolean {
        return context === GameContext.BATTLE;
    }
    getErrorMessage(): string {
        return "Cet item ne peut être utilisé qu'en combat";
    }
}

export class ExplorationUsage implements UsageRestriction {
    canUse(context: GameContext): boolean {
        return context === GameContext.EXPLORATION;
    }
    getErrorMessage(): string {
        return "Cet item ne peut être utilisé qu'en exploration";
    }
}

export class NoRestriction implements UsageRestriction {
    canUse(context: GameContext): boolean {
        return true;
    }
    getErrorMessage(): string {
        return '';
    }
}