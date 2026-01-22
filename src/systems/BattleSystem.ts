import { Health, Strength } from "../entities/Ability.js";
import type { Character } from "../entities/Character.js";
import type { Enemy } from "../entities/Enemy.js";
import type { Player } from "../entities/Player.js";
import { coupPoingt, Skill } from "../entities/Skill.js";

export class BattleSystem {

    constructor(private _player: Player, private _enemy: Enemy) {
        while (_player.isAlive() && _enemy.isAlive()) {
            /**
             * Imaginons
             * Actions : [Attaques, Magies?, Objet, Fuir]
             * player.use(competence, enemy);
             * enemy.use(competence, player);
             * resolve
             */
            // _player.use(_player.skills[0]!, _enemy);
            // _enemy.use(_enemy.skills[0]!, _player);
            _player.skills[0]?.execute(_enemy);
            _enemy.skills[0]?.execute(_player);
        }
        if (!_enemy.isAlive()) {
            
        }
    }
}