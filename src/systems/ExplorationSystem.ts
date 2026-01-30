import type { Area, Direction } from "../entities/Area.js";
import type { GameState } from "../entities/GameState.js";
import type { Path } from "../entities/Path.js";

export class ExplorationSystem {

    private static before(state: GameState, path: Path) {
        console.log(`You leave ${path.from.getStringPosition()} to ${path.to.getStringPosition()}`)
    }

    private static after(state: GameState, area: Area) {
        console.log(`You arrived to ${area.getStringPosition()}`)
        state.player.area = area;
    }

    static explore(state: GameState, direction: Direction): Area {
        const path = state.player.move(direction);
        this.before(state, path);
        path.encounters.map(e => {
            e.execute(state);
        })
        this.after(state, path.to);
        // En fonction des actions précédentes
        // _path.from si fuite combat
        return path.to;
    }
}