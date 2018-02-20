import {MonsterType} from '../config/game.config';

export class MobData {
    constructor(
        public type: MonsterType,
        public level: number,
        public hp: number,
        public speed: number,
        public jump: number // % chance to switch lane
    ) {}
}