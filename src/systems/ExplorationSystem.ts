import type { GameState } from "../entities/GameState.js";
import type { Location } from "../entities/Location.js";
import type { Path } from "../entities/Path.js";

export class ExplorationSystem {

    private static before(state: GameState, path: Path) {
        console.log(`You leave ${path.from.getStringPosition()} to ${path.to.getStringPosition()}`)
    }

    private static after(state: GameState, path: Path) {
        console.log(`You arrived to ${path.to.getStringPosition()}`)
    }

    static explore(state: GameState, path: Path): Location {
        this.before(state, path);
        path.encounters.map(e => {
            e.before(state);
            e.execute(state);
            e.after(state);
            // QQChose pour fouiller le cadavre
        })
        this.after(state, path);
        // En fonction des actions précédentes
        // _path.from si fuite combat
        return path.to;
    }
}