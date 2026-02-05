import type { Area, Direction } from "../entities/Area.js";
import type { GameState } from "../entities/GameState.js";
import type { Path } from "../entities/Path.js";
import { PlayerCondition } from "../entities/Restriction.js";

export class ExplorationSystem {

    private static before(state: GameState, path: Path) {
        console.log(`You leave ${path.from.getStringPosition()} to ${path.to.getStringPosition()}`)
        state.condition = PlayerCondition.EXPLORATION;
    }

    private static after(state: GameState, area: Area) {
        console.log(`You arrived to ${area.getStringPosition()}`)
        state.condition = PlayerCondition.VILLAGE;
        state.player.distance += 1
        state.player.area = area;
    }

    static async explore(state: GameState, direction: Direction): Promise<Area> {
        const path = state.player.move(direction);
        this.before(state, path);
        for (let e of path.encounters) {
            await e.execute(state);
        }
        if (state.player.isAlive()) {
            this.after(state, path.to);
        }
        // En fonction des actions précédentes
        // _path.from si fuite combat
        return path.to;
    }
}