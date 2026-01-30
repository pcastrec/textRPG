export enum PlayerCondition {
    BATTLE,
    // VILLAGE,
    EXPLORATION
}

export interface UsageRestriction {
    canUse(condition: PlayerCondition): boolean;
    getErrorMessage(): string;
}

export class BattleUsage implements UsageRestriction {
    canUse(condition: PlayerCondition): boolean {
        return condition === PlayerCondition.BATTLE;
    }
    getErrorMessage(): string {
        return "Cet item ne peut être utilisé qu'en combat";
    }
}

export class ExplorationUsage implements UsageRestriction {
    canUse(condition: PlayerCondition): boolean {
        return condition === PlayerCondition.EXPLORATION;
    }
    getErrorMessage(): string {
        return "Cet item ne peut être utilisé qu'en exploration";
    }
}

export class NoRestriction implements UsageRestriction {
    canUse(condition: PlayerCondition): boolean {
        return true;
    }
    getErrorMessage(): string {
        return '';
    }
}